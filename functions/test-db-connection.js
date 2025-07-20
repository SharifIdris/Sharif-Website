const { query } = require('./db/db');

exports.handler = async (event, context) => {
  try {
    // Test database connection
    const result = await query('SELECT NOW() as time');
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Database connection successful!',
        timestamp: result.rows[0].time,
        database: 'Neon PostgreSQL'
      })
    };
  } catch (error) {
    console.error('Database connection error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Database connection failed',
        message: error.message
      })
    };
  }
};