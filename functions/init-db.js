const { initializeSchema } = require('./db/db');

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
    // Initialize the database schema
    await initializeSchema();
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        message: 'Database schema initialized successfully!',
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    console.error('Error initializing database schema:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Database initialization failed',
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      })
    };
  }
};