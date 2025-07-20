const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter');

const contentDir = path.join(__dirname, 'content');
const servicesDir = path.join(contentDir, 'services');
const projectsDir = path.join(contentDir, 'projects');
const blogDir = path.join(contentDir, 'blog');

async function generateJsonFromMd(sourceDir) {
  try {
    const files = await fs.readdir(sourceDir);
    const mdFiles = files.filter(file => file.endsWith('.md'));

    const data = await Promise.all(
      mdFiles.map(async file => {
        const filePath = path.join(sourceDir, file);
        const fileContent = await fs.readFile(filePath, 'utf8');
        const { data: frontMatter } = matter(fileContent);
        return frontMatter;
      })
    );

    const outputPath = path.join(sourceDir, 'index.json');
    await fs.writeJson(outputPath, data, { spaces: 2 });
    console.log(`Successfully generated ${outputPath}`);
  } catch (error) {
    console.error(`Error processing directory ${sourceDir}:`, error);
    throw error;
  }
}

async function build() {
  try {
    console.log('Starting build process...');
    await Promise.all([
      generateJsonFromMd(servicesDir),
      generateJsonFromMd(projectsDir),
      generateJsonFromMd(blogDir)
    ]);
    console.log('Build process completed successfully.');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();
