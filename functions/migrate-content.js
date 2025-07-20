const fs = require('fs');
const path = require('path');
const { query, initializeSchema } = require('./db/db');

// Helper function to read markdown front matter
function extractFrontMatter(content) {
  const frontMatterRegex = /---\r?\n([\s\S]*?)\r?\n---/;
  const match = content.match(frontMatterRegex);
  
  if (match && match[1]) {
    return match[1].split('\n').reduce((acc, line) => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length) {
        const value = valueParts.join(':').trim();
        acc[key.trim()] = value;
      }
      return acc;
    }, {});
  }
  
  return {};
}

// Helper function to extract markdown content
function extractMarkdownContent(content) {
  const frontMatterRegex = /---\r?\n[\s\S]*?\r?\n---/;
  return content.replace(frontMatterRegex, '').trim();
}

// Import projects
async function importProjects() {
  try {
    const projectsDir = path.join(__dirname, '../app/public/content/projects');
    const files = fs.readdirSync(projectsDir).filter(file => file.endsWith('.md'));
    
    for (const file of files) {
      const filePath = path.join(projectsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const frontMatter = extractFrontMatter(content);
      const markdownContent = extractMarkdownContent(content);
      
      // Convert tech array from string to array if needed
      let tech = frontMatter.tech || [];
      if (typeof tech === 'string') {
        tech = tech.split(',').map(item => item.trim());
      }
      
      // Check if project already exists
      const slug = path.basename(file, '.md');
      const existingProject = await query('SELECT id FROM projects WHERE title = $1', [frontMatter.title]);
      
      if (existingProject.rows.length === 0) {
        // Insert new project
        await query(
          'INSERT INTO projects (title, brief, description, image, category, tech, link, featured, "order") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
          [
            frontMatter.title,
            frontMatter.brief,
            frontMatter.description,
            frontMatter.image,
            frontMatter.category,
            tech,
            frontMatter.link || null,
            frontMatter.featured === 'true',
            parseInt(frontMatter.order || '1')
          ]
        );
        console.log(`Imported project: ${frontMatter.title}`);
      }
    }
  } catch (error) {
    console.error('Error importing projects:', error);
  }
}

// Import blog posts
async function importBlogPosts() {
  try {
    const blogDir = path.join(__dirname, '../app/public/content/blog');
    const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));
    
    for (const file of files) {
      const filePath = path.join(blogDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const frontMatter = extractFrontMatter(content);
      const markdownContent = extractMarkdownContent(content);
      
      // Check if blog post already exists
      const slug = path.basename(file, '.md');
      const existingPost = await query('SELECT id FROM blog_posts WHERE slug = $1', [slug]);
      
      if (existingPost.rows.length === 0) {
        // Insert new blog post
        await query(
          'INSERT INTO blog_posts (title, description, content, image, slug, date, read_time, category, featured) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
          [
            frontMatter.title,
            frontMatter.description,
            markdownContent,
            frontMatter.image,
            slug,
            frontMatter.date,
            frontMatter.readTime || '5 min read',
            frontMatter.category,
            frontMatter.featured === 'true'
          ]
        );
        console.log(`Imported blog post: ${frontMatter.title}`);
      }
    }
  } catch (error) {
    console.error('Error importing blog posts:', error);
  }
}

// Import profile
async function importProfile() {
  try {
    const profilePath = path.join(__dirname, '../app/public/content/settings/profile.json');
    if (fs.existsSync(profilePath)) {
      const profileData = JSON.parse(fs.readFileSync(profilePath, 'utf8'));
      
      // Check if profile already exists
      const existingProfile = await query('SELECT id FROM profile LIMIT 1');
      
      if (existingProfile.rows.length === 0) {
        // Insert new profile
        await query(
          'INSERT INTO profile (name, title, image, bio, location, email, linkedin, github, whatsapp, cv) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
          [
            profileData.name,
            profileData.title,
            profileData.image,
            profileData.bio,
            profileData.location,
            profileData.email,
            profileData.linkedin,
            profileData.github,
            profileData.whatsapp,
            profileData.cv
          ]
        );
        console.log('Imported profile');
      }
    }
  } catch (error) {
    console.error('Error importing profile:', error);
  }
}

// Import services
async function importServices() {
  try {
    const servicesDir = path.join(__dirname, '../app/public/content/services');
    if (!fs.existsSync(servicesDir)) return;
    
    const files = fs.readdirSync(servicesDir).filter(file => file.endsWith('.md'));
    
    for (const file of files) {
      const filePath = path.join(servicesDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const frontMatter = extractFrontMatter(content);
      const markdownContent = extractMarkdownContent(content);
      
      // Convert items array from string to array if needed
      let items = frontMatter.items || [];
      if (typeof items === 'string') {
        items = [items];
      } else if (Array.isArray(items)) {
        items = items.map(item => item.trim());
      }
      
      // Check if service already exists
      const existingService = await query('SELECT id FROM services WHERE title = $1', [frontMatter.title]);
      
      if (existingService.rows.length === 0) {
        // Insert new service
        await query(
          'INSERT INTO services (title, description, content, icon, featured, items) VALUES ($1, $2, $3, $4, $5, $6)',
          [
            frontMatter.title,
            frontMatter.description,
            markdownContent,
            frontMatter.icon,
            frontMatter.featured === 'true',
            items
          ]
        );
        console.log(`Imported service: ${frontMatter.title}`);
      }
    }
  } catch (error) {
    console.error('Error importing services:', error);
  }
}

// Import certificates
async function importCertificates() {
  try {
    const certificatesDir = path.join(__dirname, '../app/public/content/certificates');
    if (!fs.existsSync(certificatesDir)) return;
    
    const files = fs.readdirSync(certificatesDir).filter(file => file.endsWith('.md') || file.endsWith('.json'));
    
    for (const file of files) {
      const filePath = path.join(certificatesDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      let certificateData;
      if (file.endsWith('.md')) {
        const frontMatter = extractFrontMatter(content);
        certificateData = frontMatter;
      } else {
        certificateData = JSON.parse(content);
      }
      
      // Check if certificate already exists
      const existingCertificate = await query('SELECT id FROM certificates WHERE title = $1', [certificateData.title]);
      
      if (existingCertificate.rows.length === 0) {
        // Insert new certificate
        await query(
          'INSERT INTO certificates (title, issuer, date, description, image, "order") VALUES ($1, $2, $3, $4, $5, $6)',
          [
            certificateData.title,
            certificateData.issuer,
            certificateData.date,
            certificateData.description || '',
            certificateData.image,
            parseInt(certificateData.order || '1')
          ]
        );
        console.log(`Imported certificate: ${certificateData.title}`);
      }
    }
  } catch (error) {
    console.error('Error importing certificates:', error);
  }
}

// Main migration function
exports.handler = async (event, context) => {
  try {
    // Verify authentication
    if (!context.clientContext || !context.clientContext.user) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Unauthorized' })
      };
    }
    
    // Initialize schema
    await initializeSchema();
    
    // Import content
    await importProjects();
    await importBlogPosts();
    await importServices();
    await importCertificates();
    await importProfile();
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Content migration completed successfully' })
    };
  } catch (error) {
    console.error('Error during content migration:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error during migration' })
    };
  }
};