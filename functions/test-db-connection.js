// Import the database module
let db;
try {
  db = require('./db/db');
} catch (error) {
  console.error('Error importing db module:', error);
}

exports.handler = async (event, context) => {
  // Add CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
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
    // Check if db module was imported successfully
    if (!db) {
      throw new Error('Database module could not be loaded');
    }
    
    // Check if NEON_DATABASE_URL is set
    if (!process.env.NEON_DATABASE_URL) {
      throw new Error('NEON_DATABASE_URL environment variable is not set');
    }
    
    // Test database connection
    const result = await db.query('SELECT NOW() as time');
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        message: 'Database connection successful!',
        timestamp: result.rows[0].time,
        database: 'Neon PostgreSQL',
        env: process.env.NODE_ENV || 'unknown'
      })
    };
  } catch (error) {
    console.error('Database connection error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Database connection failed',
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      })
    };
  }
};