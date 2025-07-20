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

    // GET all certificates or a specific certificate
    if (event.httpMethod === 'GET') {
      const path = event.path.replace('/.netlify/functions/api-certificates', '');
      
      // Get a specific certificate by ID
      if (path.match(/^\/\d+$/)) {
        const id = path.split('/')[1];
        const result = await query('SELECT * FROM certificates WHERE id = $1', [id]);
        
        if (result.rows.length === 0) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Certificate not found' })
          };
        }
        
        return {
          statusCode: 200,
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify(result.rows[0])
        };
      }
      
      // Get all certificates
      const result = await query('SELECT * FROM certificates ORDER BY "order", id');
      
      return {
        statusCode: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(result.rows)
      };
    }

    // POST a new certificate (admin only)
    if (event.httpMethod === 'POST') {
      // Verify authentication (should be implemented with Netlify Identity)
      if (!context.clientContext || !context.clientContext.user) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Unauthorized' })
        };
      }

      const { title, issuer, date, description, image, order } = JSON.parse(event.body);
      
      const result = await query(
        'INSERT INTO certificates (title, issuer, date, description, image, "order") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [title, issuer, date, description, image, order || 1]
      );
      
      return {
        statusCode: 201,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(result.rows[0])
      };
    }

    // PUT/update a certificate (admin only)
    if (event.httpMethod === 'PUT') {
      // Verify authentication
      if (!context.clientContext || !context.clientContext.user) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Unauthorized' })
        };
      }

      const path = event.path.replace('/.netlify/functions/api-certificates', '');
      
      if (!path.match(/^\/\d+$/)) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid certificate ID' })
        };
      }
      
      const id = path.split('/')[1];
      const { title, issuer, date, description, image, order } = JSON.parse(event.body);
      
      const result = await query(
        'UPDATE certificates SET title = $1, issuer = $2, date = $3, description = $4, image = $5, "order" = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
        [title, issuer, date, description, image, order, id]
      );
      
      if (result.rows.length === 0) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Certificate not found' })
        };
      }
      
      return {
        statusCode: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(result.rows[0])
      };
    }

    // DELETE a certificate (admin only)
    if (event.httpMethod === 'DELETE') {
      // Verify authentication
      if (!context.clientContext || !context.clientContext.user) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Unauthorized' })
        };
      }

      const path = event.path.replace('/.netlify/functions/api-certificates', '');
      
      if (!path.match(/^\/\d+$/)) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid certificate ID' })
        };
      }
      
      const id = path.split('/')[1];
      const result = await query('DELETE FROM certificates WHERE id = $1 RETURNING *', [id]);
      
      if (result.rows.length === 0) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Certificate not found' })
        };
      }
      
      return {
        statusCode: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Certificate deleted successfully', certificate: result.rows[0] })
      };
    }

    // Method not allowed
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  } catch (error) {
    console.error('Error in certificates API:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};