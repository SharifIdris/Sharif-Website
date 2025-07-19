// Content Loader for Netlify-hosted portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Load services
    loadServices();
    
    // Load portfolio items
    loadPortfolio();
    
    // Load blog posts
    loadBlog();
});

// Load services from JSON
function loadServices() {
    fetch('data/services.json')
        .then(response => response.json())
        .then(data => {
            const servicesGrid = document.querySelector('.services-grid');
            if (!servicesGrid) return;
            
            servicesGrid.innerHTML = '';
            
            // Handle both direct array and Netlify CMS format (with services property)
            const serviceItems = Array.isArray(data) ? data : (data.services || []);
            
            serviceItems.forEach(service => {
                const serviceClass = service.featured ? 'service-card featured' : 'service-card';
                
                let listItems = '';
                if (service.items && service.items.length) {
                    service.items.forEach(item => {
                        listItems += `<li>${item}</li>`;
                    });
                }
                
                servicesGrid.innerHTML += `
                    <div class="${serviceClass}">
                        <div class="service-icon">
                            <i class="${service.icon}"></i>
                        </div>
                        <h3>${service.title}</h3>
                        <ul class="service-list">
                            ${listItems}
                        </ul>
                        <a href="#contact" class="service-link">Learn More <i class="fas fa-arrow-right"></i></a>
                    </div>
                `;
            });
        })
        .catch(error => console.error('Error loading services:', error));
}

// Load portfolio items from JSON
function loadPortfolio() {
    fetch('data/portfolio.json')
        .then(response => response.json())
        .then(data => {
            const portfolioGrid = document.querySelector('.portfolio-grid');
            if (!portfolioGrid) return;
            
            portfolioGrid.innerHTML = '';
            
            // Handle both direct array and Netlify CMS format (with projects property)
            const portfolioItems = Array.isArray(data) ? data : (data.projects || []);
            
            portfolioItems.forEach(item => {
                portfolioGrid.innerHTML += `
                    <div class="portfolio-item" data-category="${item.category}">
                        <div class="portfolio-img">
                            <img src="${item.image}" alt="${item.title}">
                            <div class="portfolio-overlay">
                                <div class="portfolio-overlay-content">
                                    <h4>${item.title}</h4>
                                    <div class="portfolio-category">${item.category}</div>
                                    <a href="${item.link}" class="portfolio-link"><i class="fas fa-link"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="portfolio-info">
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                            <a href="${item.link}" class="btn small-btn">View Details</a>
                        </div>
                    </div>
                `;
            });
            
            // Re-initialize portfolio filtering
            initPortfolioFilter();
        })
        .catch(error => console.error('Error loading portfolio:', error));
}

// Load blog posts from JSON
function loadBlog() {
    fetch('data/blog.json')
        .then(response => response.json())
        .then(data => {
            const blogGrid = document.querySelector('.blog-grid');
            if (!blogGrid) return;
            
            blogGrid.innerHTML = '';
            
            // Handle both direct array and Netlify CMS format (with posts property)
            const blogPosts = Array.isArray(data) ? data : (data.posts || []);
            
            blogPosts.forEach(post => {
                const postClass = post.featured ? 'blog-card featured' : 'blog-card';
                
                blogGrid.innerHTML += `
                    <div class="${postClass}">
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
                            <a href="${post.link}" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                `;
            });
        })
        .catch(error => console.error('Error loading blog posts:', error));
}

// Re-initialize portfolio filtering
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}