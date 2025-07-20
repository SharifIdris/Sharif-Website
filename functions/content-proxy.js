const fs = require('fs');
const path = require('path');
const glob = require('glob');

exports.handler = async (event, context) => {
  const filePath = event.path.replace('/.netlify/functions/content-proxy', '');
  
  // Handle index.json requests by generating them from the content directory
  if (filePath.endsWith('/index.json')) {
    const contentType = filePath.split('/')[1]; // e.g., 'projects', 'blog', etc.
    const contentDir = path.resolve(process.env.LAMBDA_TASK_ROOT, `app/public/content/${contentType}`);
    
    try {
      // Get all markdown and JSON files in the directory
      const files = glob.sync(`${contentDir}/*.{md,json}`, { ignore: `${contentDir}/index.json` });
      
      // Read each file and extract front matter or JSON content
      const items = files.map(file => {
        const content = fs.readFileSync(file, 'utf8');
        const fileName = path.basename(file, path.extname(file));
        
        if (file.endsWith('.md')) {
          // Extract front matter from markdown
          const frontMatterRegex = /---\r?\n([\s\S]*?)\r?\n---/;
          const match = content.match(frontMatterRegex);
          
          if (match && match[1]) {
            const frontMatter = match[1].split('\n').reduce((acc, line) => {
              const [key, ...valueParts] = line.split(':');
              if (key && valueParts.length) {
                const value = valueParts.join(':').trim();
                acc[key.trim()] = value;
              }
              return acc;
            }, {});
            
            return {
              ...frontMatter,
              slug: fileName
            };
          }
        } else if (file.endsWith('.json')) {
          // Parse JSON file
          try {
            const jsonData = JSON.parse(content);
            return {
              ...jsonData,
              slug: fileName
            };
          } catch (e) {
            console.error(`Error parsing JSON file ${file}:`, e);
          }
        }
        
        return null;
      }).filter(Boolean);
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=60' // Short cache for dynamic content
        },
        body: JSON.stringify(items),
      };
    } catch (error) {
      console.error(`Error generating index for ${contentType}:`, error);
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: `Failed to generate index for ${contentType}` }),
      };
    }
  } else {
    // Handle direct file requests
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
  }
};
