# Sharif Abubakar Portfolio Website

A modern, responsive portfolio website for Angole Sharif Abubakar, Virtual Assistant & AI Tools Expert. This project includes both a static HTML site and a React application.

## Deployment Instructions

### How to Deploy to Netlify

1. **Create a GitHub repository**
   - Create a new repository on GitHub
   - Push this entire folder to the repository

2. **Deploy on Netlify**
   - Go to [Netlify](https://www.netlify.com/) and sign up/login
   - Click "New site from Git"
   - Select GitHub and authorize Netlify
   - Select your repository
   - Keep the default settings and click "Deploy site"

3. **Enable Netlify Identity for CMS Access**
   - Once your site is deployed, go to the Netlify dashboard
   - Select your site and go to "Site settings" > "Identity"
   - Click "Enable Identity"
   - Under "Registration preferences", select "Invite only"
   - Under "External providers", you can add GitHub or Google login if desired
   - Go to "Services" > "Git Gateway" and enable it

4. **Invite Yourself as a User**
   - Go to the "Identity" tab in your Netlify dashboard
   - Click "Invite users" and enter your email
   - Check your email for the invitation and accept it
   - Set your password when prompted

### How to Update Content Without Coding

You can update your portfolio content without touching code using Netlify CMS:

1. **Access the Admin Panel**
   - Go to your website URL + `/admin` (e.g., `https://your-site.netlify.app/admin`)
   - Log in with your Netlify Identity credentials

2. **Update Portfolio Projects**
   - Click on "Portfolio Projects" in the admin sidebar
   - Edit existing projects or add new ones
   - Changes will automatically appear on your site after publishing

3. **Update Blog Posts**
   - Click on "Blog Posts" in the admin sidebar
   - Edit existing posts or add new ones

4. **Update Services**
   - Click on "Services" in the admin sidebar
   - Modify service descriptions or add new services

### How to Update Images

1. In the Netlify CMS admin panel, you can upload images directly when editing content
2. Simply click on the image field and select an image from your computer
3. The image will be automatically uploaded to your site's repository

### Alternative: Manual JSON Editing

If you prefer, you can still manually edit the JSON files:

1. Edit files in `app/public/projects`, `app/public/blog`, or `app/public/services` directories
2. Commit and push changes to GitHub
3. Netlify will automatically rebuild and deploy your site

### Project Structure

- `/` - Root directory with static HTML site
- `/admin` - Netlify CMS admin interface
- `/app` - React application
  - `/app/public` - Content files (JSON, Markdown)
  - `/app/src` - React components and code
- `/functions` - Netlify serverless functions
  - `/functions/content-proxy.js` - Function to serve content to React app

## Local Development

### Static Site
To test the static site locally, simply open `index.html` in your web browser.

### React Application
To run the React application locally:

1. Navigate to the app directory: `cd app`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser to the URL shown in the terminal (usually http://localhost:5173)

## Features

- Responsive design for all devices
- Dynamic content loading from JSON files
- Easy content management without coding
- Modern animations and interactions using Framer Motion
- Contact form (requires Netlify Forms setup)
- Social media integration
- React application with Tailwind CSS
- Serverless functions for content delivery
- Expandable/collapsible sections for projects, services, and certificates