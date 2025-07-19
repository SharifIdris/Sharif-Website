// CMS Content Loader
document.addEventListener('DOMContentLoaded', async function() {
  try {
    // Load services
    await loadServices();
    
    // Load projects
    await loadProjects();
    
    // Load blog posts
    await loadBlogPosts();
    
    // Load site settings
    await loadSiteSettings();
    
    console.log('CMS content loaded successfully');
  } catch (error) {
    console.error('Error loading CMS content:', error);
  }
});

// Load services from CMS
async function loadServices() {
  try {
    const response = await fetch('/content/services/index.json');
    if (!response.ok) return;
    
    const data = await response.json();
    if (!data || !data.length) return;
    
    // Process services data
    const servicesAccordion = document.querySelector('.services-accordion');
    if (!servicesAccordion) return;
    
    // Clear existing content
    servicesAccordion.innerHTML = '';
    
    // Add each service
    data.forEach(service => {
      const serviceHTML = `
        <div class="accordion-item">
          <div class="accordion-header">
            <div class="service-icon">
              <i class="${service.icon || 'fas fa-tasks'}"></i>
            </div>
            <h3>${service.title}</h3>
            <div class="accordion-toggle">
              <i class="fas fa-chevron-down"></i>
            </div>
          </div>
          <div class="accordion-content">
            <div class="service-details">
              <p>${service.description}</p>
              <h4>📋 Services Offered:</h4>
              <ul class="service-list">
                ${service.items ? service.items.map(item => `<li>${item}</li>`).join('') : ''}
              </ul>
              <a href="#contact" class="btn small-btn primary-btn">Request Service</a>
            </div>
          </div>
        </div>
      `;
      
      servicesAccordion.innerHTML += serviceHTML;
    });
    
    // Reinitialize accordion functionality
    initAccordion();
  } catch (error) {
    console.error('Error loading services:', error);
  }
}

// Load projects from CMS
async function loadProjects() {
  try {
    const response = await fetch('/content/projects/index.json');
    if (!response.ok) return;
    
    const data = await response.json();
    if (!data || !data.length) return;
    
    // Group projects by category
    const projectsByCategory = {
      'automation': [],
      'web': [],
      'data': [],
      'cybersecurity': []
    };
    
    data.forEach(project => {
      const category = project.category || 'web';
      if (projectsByCategory[category]) {
        projectsByCategory[category].push(project);
      }
    });
    
    // Update each tab content
    for (const [category, projects] of Object.entries(projectsByCategory)) {
      let tabId;
      switch(category) {
        case 'automation': tabId = 'va'; break;
        case 'web': tabId = 'web'; break;
        case 'data': tabId = 'data'; break;
        case 'cybersecurity': tabId = 'cyber'; break;
        default: tabId = 'web';
      }
      
      const tabContent = document.querySelector(`#${tabId}-tab .portfolio-accordion`);
      if (!tabContent || !projects.length) continue;
      
      // Clear existing content
      tabContent.innerHTML = '';
      
      // Add each project
      projects.forEach(project => {
        const projectHTML = `
          <div class="project-item">
            <div class="project-header">
              <div class="project-preview">
                <img src="${project.image}" alt="${project.title}">
              </div>
              <div class="project-title">
                <h3>${project.title}</h3>
                <p class="project-brief">${project.brief || ''}</p>
              </div>
              <div class="project-toggle">
                <i class="fas fa-chevron-down"></i>
              </div>
            </div>
            <div class="project-content">
              <div class="project-details">
                <p>${project.description}</p>
                <div class="project-tech">
                  ${project.tech ? project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('') : ''}
                </div>
                <a href="${project.link || '#'}" class="btn small-btn">View Project</a>
              </div>
            </div>
          </div>
        `;
        
        tabContent.innerHTML += projectHTML;
      });
    }
    
    // Reinitialize portfolio functionality
    initPortfolio();
  } catch (error) {
    console.error('Error loading projects:', error);
  }
}

// Load blog posts from CMS
async function loadBlogPosts() {
  try {
    const response = await fetch('/content/blog/index.json');
    if (!response.ok) return;
    
    const data = await response.json();
    if (!data || !data.length) return;
    
    // Process blog data
    const blogGrid = document.querySelector('.blog-grid');
    if (!blogGrid) return;
    
    // Clear existing content
    blogGrid.innerHTML = '';
    
    // Add each blog post (limit to 3)
    data.slice(0, 3).forEach(post => {
      const isFeatured = post.featured ? 'featured' : '';
      const blogHTML = `
        <div class="blog-card ${isFeatured}">
          <div class="blog-img">
            <img src="${post.image}" alt="${post.title}">
            <div class="blog-category">${post.category}</div>
          </div>
          <div class="blog-content">
            <div class="blog-meta">
              <span class="blog-date"><i class="far fa-calendar-alt"></i> ${post.date}</span>
              <span class="blog-read-time"><i class="far fa-clock"></i> ${post.readTime}</span>
            </div>
            <h3>${post.title}</h3>
            <p>${post.description}</p>
            <a href="${post.link || '#'}" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>
      `;
      
      blogGrid.innerHTML += blogHTML;
    });
  } catch (error) {
    console.error('Error loading blog posts:', error);
  }
}

// Load site settings from CMS
async function loadSiteSettings() {
  try {
    // Load hero settings
    const heroResponse = await fetch('/content/settings/hero.yml');
    if (heroResponse.ok) {
      const heroData = await heroResponse.text();
      const heroSettings = parseYaml(heroData);
      
      if (heroSettings.profileImage) {
        const heroImage = document.querySelector('.hero-image img');
        if (heroImage) {
          heroImage.src = heroSettings.profileImage;
        }
      }
      
      if (heroSettings.backgroundImage) {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
          heroSection.style.backgroundImage = `url(${heroSettings.backgroundImage})`;
        }
      }
    }
    
    // Load about settings
    const aboutResponse = await fetch('/content/settings/about.yml');
    if (aboutResponse.ok) {
      const aboutData = await aboutResponse.text();
      const aboutSettings = parseYaml(aboutData);
      
      if (aboutSettings.aboutImage) {
        const aboutImage = document.querySelector('.about-img img');
        if (aboutImage) {
          aboutImage.src = aboutSettings.aboutImage;
        }
      }
    }
    
    // Load branding settings
    const brandingResponse = await fetch('/content/settings/branding.yml');
    if (brandingResponse.ok) {
      const brandingData = await brandingResponse.text();
      const brandingSettings = parseYaml(brandingData);
      
      if (brandingSettings.logo) {
        const logoImages = document.querySelectorAll('.logo img');
        logoImages.forEach(img => {
          img.src = brandingSettings.logo;
        });
      }
      
      if (brandingSettings.primaryColor) {
        document.documentElement.style.setProperty('--primary-color', brandingSettings.primaryColor);
      }
      
      if (brandingSettings.secondaryColor) {
        document.documentElement.style.setProperty('--secondary-color', brandingSettings.secondaryColor);
      }
    }
  } catch (error) {
    console.error('Error loading site settings:', error);
  }
}

// Simple YAML parser for basic settings
function parseYaml(yaml) {
  const result = {};
  const lines = yaml.split('\n');
  
  lines.forEach(line => {
    if (line.trim() && line.includes(':')) {
      const [key, value] = line.split(':').map(part => part.trim());
      if (key && value) {
        result[key] = value;
      }
    }
  });
  
  return result;
}

// Reinitialize accordion functionality
function initAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const isActive = this.classList.contains('active');
      
      // Close all accordions
      document.querySelectorAll('.accordion-header').forEach(h => {
        h.classList.remove('active');
        if (h.nextElementSibling) {
          h.nextElementSibling.style.maxHeight = null;
        }
      });
      
      // Open clicked accordion if it wasn't active
      if (!isActive) {
        this.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

// Reinitialize portfolio functionality
function initPortfolio() {
  const projectHeaders = document.querySelectorAll('.project-header');
  
  projectHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const isActive = this.classList.contains('active');
      
      if (isActive) {
        this.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        this.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}