# Contentful Setup Guide

## 🎯 Quick Setup Steps

### 1. Create Contentful Account
1. Go to [Contentful](https://www.contentful.com/)
2. Sign up for a free account
3. Create a new space

### 2. Get API Keys
1. Go to Settings → API keys
2. Create a new API key
3. Copy the Space ID and Content Delivery API access token

### 3. Set Environment Variables
Add these to your Netlify environment variables:
```
VITE_CONTENTFUL_SPACE_ID=your_space_id_here
VITE_CONTENTFUL_ACCESS_TOKEN=your_access_token_here
```

### 4. Create Content Models

#### Project Content Model
- **Content type ID**: `project`
- Fields:
  - `title` (Short text, required)
  - `brief` (Short text, required)
  - `description` (Long text, required)
  - `image` (Media, required)
  - `category` (Short text, required)
  - `tech_stack` (Short text, list)
  - `live_demo_url` (Short text)
  - `github_url` (Short text)
  - `featured` (Boolean)

#### Blog Post Content Model
- **Content type ID**: `blogPost`
- Fields:
  - `title` (Short text, required)
  - `summary` (Long text, required)
  - `body` (Rich text, required)
  - `featuredImage` (Media, required)
  - `publishDate` (Date & time, required)
  - `tags` (Short text, list)
  - `featured` (Boolean)
  - `embeddedVideoUrl` (Short text)

#### Service Content Model
- **Content type ID**: `serviceItem`
- Fields:
  - `title` (Short text, required)
  - `short_description` (Long text, required)
  - `icon` (Media)
  - `category` (Short text)
  - `featured` (Boolean)

#### Certificate Content Model
- **Content type ID**: `certificate`
- Fields:
  - `title` (Short text, required)
  - `issuer` (Short text, required)
  - `date` (Date & time, required)
  - `description` (Rich text)
  - `file` (Media, required)

#### Testimonial Content Model
- **Content type ID**: `testimonial`
- Fields:
  - `clientName` (Short text, required)
  - `roleOrCompany` (Short text, required)
  - `testimonialContent` (Rich text, required)
  - `profileImage` (Media)
  - `featuredStatus` (Boolean)

## 🔄 Migration Path

Your site will automatically:
1. Try to fetch from Contentful first
2. Fall back to the existing database/file system if Contentful fails
3. This ensures zero downtime during migration

## ✅ Testing

1. Deploy with Contentful credentials
2. Create a test blog post in Contentful
3. Verify it appears on your website
4. Remove Contentful credentials temporarily to test fallback

## 🎉 Benefits After Setup

- ✅ Real-time content updates
- ✅ Rich media management
- ✅ Collaborative editing
- ✅ Content preview
- ✅ API-first approach
- ✅ Automatic fallback system