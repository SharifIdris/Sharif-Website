import client from '../contentful';

// Fallback API service for when Contentful is not available
const API_BASE = import.meta.env.VITE_API_BASE_URL || '/.netlify/functions';

class ContentService {
  constructor() {
    this.useContentful = !!(
      import.meta.env.VITE_CONTENTFUL_SPACE_ID && 
      import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
    );
  }

  async getProjects() {
    if (this.useContentful) {
      try {
        const response = await client.getEntries({ content_type: 'project' });
        return response.items.map(item => ({ ...item.fields, id: item.sys.id }));
      } catch (error) {
        console.warn('Contentful failed, falling back to API:', error);
      }
    }
    
    // Fallback to local API
    const response = await fetch(`${API_BASE}/api-projects`);
    return response.json();
  }

  async getBlogPosts() {
    if (this.useContentful) {
      try {
        const response = await client.getEntries({ content_type: 'blogPost' });
        return response.items.map(item => ({ ...item.fields, id: item.sys.id }));
      } catch (error) {
        console.warn('Contentful failed, falling back to API:', error);
      }
    }
    
    // Fallback to local API
    const response = await fetch(`${API_BASE}/api-blog`);
    return response.json();
  }

  async getBlogPost(id) {
    if (this.useContentful) {
      try {
        const response = await client.getEntry(id);
        return { ...response.fields, id: response.sys.id };
      } catch (error) {
        console.warn('Contentful failed, falling back to API:', error);
      }
    }
    
    // Fallback to local API
    const response = await fetch(`${API_BASE}/api-blog/${id}`);
    return response.json();
  }

  async getServices() {
    if (this.useContentful) {
      try {
        const response = await client.getEntries({ content_type: 'serviceItem' });
        return response.items.map(item => ({ ...item.fields, id: item.sys.id }));
      } catch (error) {
        console.warn('Contentful failed, falling back to API:', error);
      }
    }
    
    // Fallback to local API
    const response = await fetch(`${API_BASE}/api-services`);
    return response.json();
  }

  async getCertificates() {
    if (this.useContentful) {
      try {
        const response = await client.getEntries({ content_type: 'certificate' });
        return response.items.map(item => ({ ...item.fields, id: item.sys.id }));
      } catch (error) {
        console.warn('Contentful failed, falling back to API:', error);
      }
    }
    
    // Fallback to local API
    const response = await fetch(`${API_BASE}/api-certificates`);
    return response.json();
  }

  async getTestimonials(featured = false) {
    if (this.useContentful) {
      try {
        const params = { content_type: 'testimonial' };
        if (featured) {
          params['fields.featuredStatus'] = true;
        }
        const response = await client.getEntries(params);
        return response.items.map(item => ({ ...item.fields, id: item.sys.id }));
      } catch (error) {
        console.warn('Contentful failed, falling back to API:', error);
      }
    }
    
    // Fallback to local API
    const url = featured ? `${API_BASE}/api-testimonials?featured=true` : `${API_BASE}/api-testimonials`;
    const response = await fetch(url);
    return response.json();
  }
}

export default new ContentService();