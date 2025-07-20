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

    // GET all testimonials or a specific testimonial
    if (event.httpMethod === 'GET') {
      const path = event.path.replace('/.netlify/functions/api-testimonials', '');
      
      // Get a specific testimonial by ID
      if (path.match(/^\/\d+$/)) {
        const id = path.split('/')[1];
        const result = await query('SELECT * FROM testimonials WHERE id = $1', [id]);
        
        if (result.rows.length === 0) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Testimonial not found' })
          };
        }
        
        return {
          statusCode: 200,
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify(result.rows[0])
        };
      }
      
      // Get all testimonials (with optional featured filter)
      const { featured } = event.queryStringParameters || {};
      let sql = 'SELECT * FROM testimonials';
      const params = [];
      
      if (featured === 'true') {
        sql += ' WHERE featured = true';
      }
      
      sql += ' ORDER BY "order", id';
      
      const result = await query(sql, params);
      
      return {
        statusCode: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(result.rows)
      };
    }

    // POST a new testimonial (admin only)
    if (event.httpMethod === 'POST') {
      // Verify authentication (should be implemented with Netlify Identity)
      if (!context.clientContext || !context.clientContext.user) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Unauthorized' })
        };
      }

      const { name, position, company, content, image, rating, featured, order } = JSON.parse(event.body);
      
      const result = await query(
        'INSERT INTO testimonials (name, position, company, content, image, rating, featured, "order") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [name, position, company || null, content, image || null, rating || 5, featured || false, order || 1]
      );
      
      return {
        statusCode: 201,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(result.rows[0])
      };
    }

    // PUT/update a testimonial (admin only)
    if (event.httpMethod === 'PUT') {
      // Verify authentication
      if (!context.clientContext || !context.clientContext.user) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Unauthorized' })
        };
      }

      const path = event.path.replace('/.netlify/functions/api-testimonials', '');
      
      if (!path.match(/^\/\d+$/)) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid testimonial ID' })
        };
      }
      
      const id = path.split('/')[1];
      const { name, position, company, content, image, rating, featured, order } = JSON.parse(event.body);
      
      const result = await query(
        'UPDATE testimonials SET name = $1, position = $2, company = $3, content = $4, image = $5, rating = $6, featured = $7, "order" = $8, updated_at = CURRENT_TIMESTAMP WHERE id = $9 RETURNING *',
        [name, position, company || null, content, image || null, rating || 5, featured, order, id]
      );
      
      if (result.rows.length === 0) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Testimonial not found' })
        };
      }
      
      return {
        statusCode: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(result.rows[0])
      };
    }

    // DELETE a testimonial (admin only)
    if (event.httpMethod === 'DELETE') {
      // Verify authentication
      if (!context.clientContext || !context.clientContext.user) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Unauthorized' })
        };
      }

      const path = event.path.replace('/.netlify/functions/api-testimonials', '');
      
      if (!path.match(/^\/\d+$/)) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid testimonial ID' })
        };
      }
      
      const id = path.split('/')[1];
      const result = await query('DELETE FROM testimonials WHERE id = $1 RETURNING *', [id]);
      
      if (result.rows.length === 0) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Testimonial not found' })
        };
      }
      
      return {
        statusCode: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Testimonial deleted successfully', testimonial: result.rows[0] })
      };
    }

    // Method not allowed
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  } catch (error) {
    console.error('Error in testimonials API:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};