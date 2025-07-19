const { Octokit } = require('@octokit/rest');
const { createAppAuth } = require('@octokit/auth-app');
const busboy = require('busboy');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  // Parse form data
  const formData = await parseMultipartForm(event);
  
  if (!formData.file) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'No file uploaded' }),
    };
  }

  try {
    // Get GitHub token from environment variables
    const githubToken = process.env.GITHUB_TOKEN;
    const repo = 'Sharif-Website';
    const owner = 'SharifIdris';
    
    if (!githubToken) {
      throw new Error('GitHub token not configured');
    }

    // Initialize Octokit
    const octokit = new Octokit({
      auth: githubToken,
    });

    // Generate filename
    const type = formData.fields.type || 'general';
    const timestamp = Date.now();
    const filename = `${type}-${timestamp}-${formData.file.filename}`;
    const path = `images/my-photos/${filename}`;

    // Upload to GitHub
    const response = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: `Upload ${type} image: ${filename}`,
      content: formData.file.content.toString('base64'),
      committer: {
        name: 'Netlify Function',
        email: 'function@netlify.com',
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        url: `https://raw.githubusercontent.com/${owner}/${repo}/main/${path}`,
        path: path,
      }),
    };
  } catch (error) {
    console.error('Upload error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message,
      }),
    };
  }
};

// Parse multipart form data
async function parseMultipartForm(event) {
  return new Promise((resolve, reject) => {
    const result = {
      fields: {},
      file: null,
    };

    // Create busboy instance
    const bb = busboy({ headers: event.headers });

    // Handle file upload
    bb.on('file', (fieldname, file, info) => {
      const { filename, encoding, mimeType } = info;
      const chunks = [];

      file.on('data', (chunk) => {
        chunks.push(chunk);
      });

      file.on('end', () => {
        result.file = {
          filename,
          mimeType,
          encoding,
          content: Buffer.concat(chunks),
        };
      });
    });

    // Handle form fields
    bb.on('field', (fieldname, value) => {
      result.fields[fieldname] = value;
    });

    // Handle end of form
    bb.on('finish', () => {
      resolve(result);
    });

    // Handle errors
    bb.on('error', (error) => {
      reject(error);
    });

    // Parse the event body
    bb.write(event.body);
    bb.end();
  });
}