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

    // GET all blog posts or a specific post
    if (event.httpMethod === 'GET') {
      const path = event.path.replace('/.netlify/functions/api-blog', '');
      
      // Get a specific blog post by slug
      if (path.match(/^\/[a-zA-Z0-9-]+$/)) {
        const slug = path.split('/')[1];
        const result = await query('SELECT * FROM blog_posts WHERE slug = $1', [slug]);
        
        if (result.rows.length === 0) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Blog post not found' })
          };
        }
        
        return {
          statusCode: 200,
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify(result.rows[0])
        };
      }
      
      // Get all blog posts (with optional category filter)
      const { category } = event.queryStringParameters || {};
      let sql = 'SELECT * FROM blog_posts';
      const params = [];
      
      if (category) {
        sql += ' WHERE category = $1';
        params.push(category);
      }
      
      sql += ' ORDER BY date DESC';
      
      const result = await query(sql, params);
      
      return {
        statusCode: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(result.rows)
      };
    }

    // POST a new blog post (admin only)
    if (event.httpMethod === 'POST') {
      // Verify authentication (should be implemented with Netlify Identity)
      if (!context.clientContext || !context.clientContext.user) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Unauthorized' })
        };
      }

      const { title, description, content, image, slug, date, readTime, category, featured } = JSON.parse(event.body);
      
      // Check if slug already exists
      const existingPost = await query('SELECT id FROM blog_posts WHERE slug = $1', [slug]);
      if (existingPost.rows.length > 0) {
        return {
          statusCode: 409,
          headers,
          body: JSON.stringify({ error: 'A blog post with this slug already exists' })
        };
      }
      
      const result = await query(
        'INSERT INTO blog_posts (title, description, content, image, slug, date, read_time, category, featured) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        [title, description, content, image, slug, date, readTime || '5 min read', category, featured || false]
      );
      
      return {
        statusCode: 201,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(result.rows[0])
      };
    }

    // PUT/update a blog post (admin only)
    if (event.httpMethod === 'PUT') {
      // Verify authentication
      if (!context.clientContext || !context.clientContext.user) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Unauthorized' })
        };
      }

      const path = event.path.replace('/.netlify/functions/api-blog', '');
      
      if (!path.match(/^\/[a-zA-Z0-9-]+$/)) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid blog post slug' })
        };
      }
      
      const slug = path.split('/')[1];
      const { title, description, content, image, date, readTime, category, featured } = JSON.parse(event.body);
      
      const result = await query(
        'UPDATE blog_posts SET title = $1, description = $2, content = $3, image = $4, date = $5, read_time = $6, category = $7, featured = $8, updated_at = CURRENT_TIMESTAMP WHERE slug = $9 RETURNING *',
        [title, description, content, image, date, readTime, category, featured, slug]
      );
      
      if (result.rows.length === 0) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Blog post not found' })
        };
      }
      
      return {
        statusCode: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(result.rows[0])
      };
    }

    // DELETE a blog post (admin only)
    if (event.httpMethod === 'DELETE') {
      // Verify authentication
      if (!context.clientContext || !context.clientContext.user) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Unauthorized' })
        };
      }

      const path = event.path.replace('/.netlify/functions/api-blog', '');
      
      if (!path.match(/^\/[a-zA-Z0-9-]+$/)) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid blog post slug' })
        };
      }
      
      const slug = path.split('/')[1];
      const result = await query('DELETE FROM blog_posts WHERE slug = $1 RETURNING *', [slug]);
      
      if (result.rows.length === 0) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Blog post not found' })
        };
      }
      
      return {
        statusCode: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Blog post deleted successfully', post: result.rows[0] })
      };
    }

    // Method not allowed
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  } catch (error) {
    console.error('Error in blog API:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};