const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  const filePath = event.path.replace('/.netlify/functions/content-proxy', '');
  const fullPath = path.resolve(process.env.LAMBDA_TASK_ROOT, 'app/public', filePath);

  try {
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: fileContent,
    };
  } catch (error) {
    console.error('Error reading file:', error);
    return {
      statusCode: 404,
      body: 'Not Found',
    };
  }
};
