const { query, initializeSchema } = require('./db/db');

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS'
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

    // GET profile
    if (event.httpMethod === 'GET') {
      const result = await query('SELECT * FROM profile LIMIT 1');
      
      if (result.rows.length === 0) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Profile not found' })
        };
      }
      
      return {
        statusCode: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(result.rows[0])
      };
    }

    // PUT/update profile (admin only)
    if (event.httpMethod === 'PUT') {
      // Verify authentication
      if (!context.clientContext || !context.clientContext.user) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Unauthorized' })
        };
      }

      const { name, title, image, bio, location, email, linkedin, github, whatsapp, cv } = JSON.parse(event.body);
      
      // Check if profile exists
      const existingProfile = await query('SELECT id FROM profile LIMIT 1');
      
      if (existingProfile.rows.length === 0) {
        // Create new profile
        const result = await query(
          'INSERT INTO profile (name, title, image, bio, location, email, linkedin, github, whatsapp, cv) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
          [name, title, image, bio, location, email, linkedin, github, whatsapp, cv]
        );
        
        return {
          statusCode: 201,
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify(result.rows[0])
        };
      } else {
        // Update existing profile
        const result = await query(
          'UPDATE profile SET name = $1, title = $2, image = $3, bio = $4, location = $5, email = $6, linkedin = $7, github = $8, whatsapp = $9, cv = $10, updated_at = CURRENT_TIMESTAMP WHERE id = $11 RETURNING *',
          [name, title, image, bio, location, email, linkedin, github, whatsapp, cv, existingProfile.rows[0].id]
        );
        
        return {
          statusCode: 200,
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify(result.rows[0])
        };
      }
    }

    // Method not allowed
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  } catch (error) {
    console.error('Error in profile API:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};