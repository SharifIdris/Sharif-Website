# Neon PostgreSQL Database Integration

This directory contains the database schema and connection utilities for the Neon PostgreSQL database integration.

## Setup Instructions

1. **Create a Neon PostgreSQL Database**:
   - Sign up at [Neon](https://neon.tech/)
   - Create a new project and database
   - Get your connection string

2. **Set Environment Variables in Netlify**:
   - Go to your Netlify site dashboard
   - Navigate to Site settings > Environment variables
   - Add a new variable named `NEON_DATABASE_URL` with your Neon connection string

3. **Deploy Your Site**:
   - The database schema will be automatically created on first API call
   - Existing content will be migrated when you visit `/api/migrate` as an authenticated admin

## Database Schema

The database includes the following tables:
- `projects`: Portfolio projects
- `blog_posts`: Blog articles
- `services`: Service offerings
- `certificates`: Professional certifications
- `profile`: Personal information and settings

## API Endpoints

The following API endpoints are available:

- **Projects**:
  - `GET /api/projects`: Get all projects
  - `GET /api/projects/:id`: Get a specific project
  - `POST /api/projects`: Create a new project (admin only)
  - `PUT /api/projects/:id`: Update a project (admin only)
  - `DELETE /api/projects/:id`: Delete a project (admin only)

- **Blog Posts**:
  - `GET /api/blog`: Get all blog posts
  - `GET /api/blog/:slug`: Get a specific blog post
  - `POST /api/blog`: Create a new blog post (admin only)
  - `PUT /api/blog/:slug`: Update a blog post (admin only)
  - `DELETE /api/blog/:slug`: Delete a blog post (admin only)

- **Services**:
  - `GET /api/services`: Get all services
  - `GET /api/services/:id`: Get a specific service
  - `POST /api/services`: Create a new service (admin only)
  - `PUT /api/services/:id`: Update a service (admin only)
  - `DELETE /api/services/:id`: Delete a service (admin only)

- **Certificates**:
  - `GET /api/certificates`: Get all certificates
  - `GET /api/certificates/:id`: Get a specific certificate
  - `POST /api/certificates`: Create a new certificate (admin only)
  - `PUT /api/certificates/:id`: Update a certificate (admin only)
  - `DELETE /api/certificates/:id`: Delete a certificate (admin only)

- **Profile**:
  - `GET /api/profile`: Get profile information
  - `PUT /api/profile`: Update profile information (admin only)

- **Migration**:
  - `GET /api/migrate`: Migrate content from files to database (admin only)