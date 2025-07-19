# Automatic Updates for Your Portfolio Website

Your portfolio website is set up to automatically update in two ways:

## 1. GitHub Push → Netlify Deploy

When you push changes to your GitHub repository, Netlify will automatically:
- Detect the changes
- Pull the latest code
- Deploy the updated website

This happens because of the continuous deployment setup in Netlify, which is watching your GitHub repository.

### How to Use This Feature:

1. Make changes to your code locally
2. Commit and push to GitHub:
   ```
   git add .
   git commit -m "Your commit message"
   git push
   ```
3. Wait a few minutes for Netlify to deploy (typically 1-3 minutes)
4. Your site will be updated automatically

## 2. Netlify CMS Updates

When you make changes through the Netlify CMS admin panel:
1. The CMS saves the changes to your content files
2. The changes are committed to your GitHub repository
3. This triggers a new Netlify deployment
4. Your site is updated with the new content

### How to Use the CMS:

1. Go to your website URL + `/admin-login`
2. Enter your admin password
3. Make changes to your content
4. Click "Publish" or "Save"
5. Wait for the changes to be deployed

## Best Practices

- **GitHub Updates**: Use for code changes, new features, or structural changes
- **CMS Updates**: Use for content changes like text, images, or adding new projects/blog posts

Both methods will keep your site up-to-date automatically!