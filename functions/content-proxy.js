const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  const filePath = event.path.replace('/.netlify/functions/content-proxy', '');
  const fullPath = path.resolve(process.env.LAMBDA_TASK_ROOT, 'app/public', filePath);

  try {
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    
    // Determine content type based on file extension
    let contentType = 'application/json';
    if (fullPath.endsWith('.md')) {
      contentType = 'text/markdown';
    } else if (fullPath.endsWith('.yml') || fullPath.endsWith('.yaml')) {
      contentType = 'text/yaml';
    }
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300'
      },
      body: fileContent,
    };
  } catch (error) {
    console.error('Error reading file:', error);
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'File not found', path: filePath }),
    };
  }
};
