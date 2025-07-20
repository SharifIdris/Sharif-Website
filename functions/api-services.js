const { query, initializeSchema } = require('./db/db');

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  // Handle OPTIONS request (preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Initialize schema if needed
    await initializeSchema();

    // GET all services or a specific service
    if (event.httpMethod === 'GET') {
      const path = event.path.replace('/.netlify/functions/api-services', '');
      
      // Get a specific service by ID
      if (path.match(/^\/\d+$/)) {
        const id = path.split('/')[1];
        const result = await query('SELECT * FROM services WHERE id = $1', [id]);
        
        if (result.rows.length === 0) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Service not found' })
          };
        }
        
        return {
          statusCode: 200,
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify(result.rows[0])
        };
      }
      
      // Get all services
      const result = await query('SELECT * FROM services ORDER BY id');
      
      return {
        statusCode: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(result.rows)
      };
    }

    // POST a new service (admin only)
    if (event.httpMethod === 'POST') {
      // Verify authentication (should be implemented with Netlify Identity)
      if (!context.clientContext || !context.clientContext.user) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Unauthorized' })
        };
      }

      const { title, description, content, icon, featured, items } = JSON.parse(event.body);
      
      const result = await query(
        'INSERT INTO services (title, description, content, icon, featured, items) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [title, description, content, icon, featured || false, items || []]
      );
      
      return {
        statusCode: 201,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(result.rows[0])
      };
    }

    // PUT/update a service (admin only)
    if (event.httpMethod === 'PUT') {
      // Verify authentication
      if (!context.clientContext || !context.clientContext.user) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Unauthorized' })
        };
      }

      const path = event.path.replace('/.netlify/functions/api-services', '');
      
      if (!path.match(/^\/\d+$/)) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid service ID' })
        };
      }
      
      const id = path.split('/')[1];
      const { title, description, content, icon, featured, items } = JSON.parse(event.body);
      
      const result = await query(
        'UPDATE services SET title = $1, description = $2, content = $3, icon = $4, featured = $5, items = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
        [title, description, content, icon, featured, items, id]
      );
      
      if (result.rows.length === 0) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Service not found' })
        };
      }
      
      return {
        statusCode: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(result.rows[0])
      };
    }

    // DELETE a service (admin only)
    if (event.httpMethod === 'DELETE') {
      // Verify authentication
      if (!context.clientContext || !context.clientContext.user) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Unauthorized' })
        };
      }

      const path = event.path.replace('/.netlify/functions/api-services', '');
      
      if (!path.match(/^\/\d+$/)) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid service ID' })
        };
      }
      
      const id = path.split('/')[1];
      const result = await query('DELETE FROM services WHERE id = $1 RETURNING *', [id]);
      
      if (result.rows.length === 0) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Service not found' })
        };
      }
      
      return {
        statusCode: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Service deleted successfully', service: result.rows[0] })
      };
    }

    // Method not allowed
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  } catch (error) {
    console.error('Error in services API:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};