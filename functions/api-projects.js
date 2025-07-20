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

    // GET all projects or a specific project
    if (event.httpMethod === 'GET') {
      const path = event.path.replace('/.netlify/functions/api-projects', '');
      
      // Get a specific project by ID
      if (path.match(/^\/\d+$/)) {
        const id = path.split('/')[1];
        const result = await query('SELECT * FROM projects WHERE id = $1', [id]);
        
        if (result.rows.length === 0) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Project not found' })
          };
        }
        
        return {
          statusCode: 200,
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify(result.rows[0])
        };
      }
      
      // Get all projects (with optional category filter)
      const { category } = event.queryStringParameters || {};
      let sql = 'SELECT * FROM projects';
      const params = [];
      
      if (category) {
        sql += ' WHERE category = $1';
        params.push(category);
      }
      
      sql += ' ORDER BY "order", id';
      
      const result = await query(sql, params);
      
      return {
        statusCode: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(result.rows)
      };
    }

    // POST a new project (admin only)
    if (event.httpMethod === 'POST') {
      // Verify authentication (should be implemented with Netlify Identity)
      if (!context.clientContext || !context.clientContext.user) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Unauthorized' })
        };
      }

      const { title, brief, description, image, category, tech, link, featured, order } = JSON.parse(event.body);
      
      const result = await query(
        'INSERT INTO projects (title, brief, description, image, category, tech, link, featured, "order") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        [title, brief, description, image, category, tech, link, featured || false, order || 1]
      );
      
      return {
        statusCode: 201,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(result.rows[0])
      };
    }

    // PUT/update a project (admin only)
    if (event.httpMethod === 'PUT') {
      // Verify authentication
      if (!context.clientContext || !context.clientContext.user) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Unauthorized' })
        };
      }

      const path = event.path.replace('/.netlify/functions/api-projects', '');
      
      if (!path.match(/^\/\d+$/)) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid project ID' })
        };
      }
      
      const id = path.split('/')[1];
      const { title, brief, description, image, category, tech, link, featured, order } = JSON.parse(event.body);
      
      const result = await query(
        'UPDATE projects SET title = $1, brief = $2, description = $3, image = $4, category = $5, tech = $6, link = $7, featured = $8, "order" = $9, updated_at = CURRENT_TIMESTAMP WHERE id = $10 RETURNING *',
        [title, brief, description, image, category, tech, link, featured, order, id]
      );
      
      if (result.rows.length === 0) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Project not found' })
        };
      }
      
      return {
        statusCode: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(result.rows[0])
      };
    }

    // DELETE a project (admin only)
    if (event.httpMethod === 'DELETE') {
      // Verify authentication
      if (!context.clientContext || !context.clientContext.user) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Unauthorized' })
        };
      }

      const path = event.path.replace('/.netlify/functions/api-projects', '');
      
      if (!path.match(/^\/\d+$/)) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid project ID' })
        };
      }
      
      const id = path.split('/')[1];
      const result = await query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);
      
      if (result.rows.length === 0) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Project not found' })
        };
      }
      
      return {
        statusCode: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Project deleted successfully', project: result.rows[0] })
      };
    }

    // Method not allowed
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  } catch (error) {
    console.error('Error in projects API:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};