# How to Update Your Website Content

This document explains how to update different parts of your website, including certificates, blog posts, and other content.

## Updating Certificates

When you obtain new certificates, you can add them to your website in two ways:

### Option 1: Using Netlify CMS (Recommended)

1. Go to your website URL + `/admin` (e.g., `https://your-site.netlify.app/admin`)
2. Log in with your Netlify Identity credentials
3. Click on "Certificates" in the admin sidebar
4. Click "Add Certificate" or edit existing ones
5. Fill in the details:
   - Title: Name of the certification
   - Issuer: Organization that issued the certificate (e.g., ALX Africa)
   - Date: When the certificate was issued (e.g., September 2023)
   - Description: Brief description of what the certification covers
   - Image: Upload an image of the certificate or a relevant image
   - Link: URL to view or verify the certificate (optional)
6. Click "Publish" to update your website

### Option 2: Editing the JSON File Directly

1. Open the `data/certificates.json` file
2. Add a new certificate object to the array with the following structure:
```json
{
  "title": "Your New Certificate",
  "issuer": "ALX Africa",
  "date": "Month Year",
  "description": "Description of the certification and skills it validates.",
  "image": "path/to/certificate-image.jpg",
  "link": "optional-link-to-certificate"
}
```
3. Save the file and deploy your website

## Updating Blog Posts

Your blog posts can be updated dynamically:

### Option 1: Using Netlify CMS (Recommended)

1. Go to your website URL + `/admin`
2. Click on "Blog Posts" in the admin sidebar
3. Click "Add Blog Post" or edit existing ones
4. Fill in the details:
   - Title: Blog post title
   - Description: Brief summary of the post
   - Image: Featured image for the blog post
   - Date: Publication date
   - Read Time: Estimated reading time
   - Category: Blog post category
   - Featured: Toggle to make it a featured post
   - Link: URL to the full blog post
5. Click "Publish" to update your website

### Option 2: Editing the JSON File Directly

1. Open the `data/blog.json` file
2. Add a new blog post object to the "posts" array:
```json
{
  "title": "Your New Blog Post",
  "description": "Brief description of your blog post.",
  "image": "path/to/blog-image.jpg",
  "date": "Month Day, Year",
  "readTime": "X min read",
  "category": "Category Name",
  "featured": false,
  "link": "url-to-full-post"
}
```
3. Save the file and deploy your website

## Connecting to an External Blog Platform

If you have a blog on platforms like WordPress, Medium, or Ghost, you can connect your website to automatically fetch the latest posts:

1. Open the `js/blog-feed.js` file
2. Uncomment the RSS feed section
3. Replace the `RSS_URL` with your blog's RSS feed URL
4. Deploy your website

## Other Content Updates

For other sections of your website:

- **Services**: Edit `data/services.json`
- **Portfolio Projects**: Edit `data/portfolio.json`

Always remember to deploy your website after making changes to see them live.