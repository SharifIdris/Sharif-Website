const { createClient } = require('@supabase/supabase-js');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    // Parse form data
    const form = new formidable.IncomingForm();
    
    // Process the file upload
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(event, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const file = files.image;
    const destination = fields.destination || 'images/my-photos/';
    const type = fields.type || 'general';
    
    // Read file content
    const fileContent = fs.readFileSync(file.path);
    
    // Generate a unique filename
    const timestamp = Date.now();
    const filename = `${type}-${timestamp}-${file.name}`;
    const fullPath = path.join(destination, filename);
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('portfolio-images')
      .upload(fullPath, fileContent, {
        contentType: file.type,
        upsert: true,
      });
    
    if (error) {
      throw new Error(`Supabase upload error: ${error.message}`);
    }
    
    // Get public URL
    const { publicURL } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(fullPath);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        url: publicURL,
        path: fullPath,
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