// Blog Feed - Dynamically loads latest blog posts
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a page with a blog section
    const blogSection = document.querySelector('#blog .blog-grid');
    if (!blogSection) return;

    // Function to load blog posts from RSS feed or API
    loadLatestBlogPosts();
});

// Function to load latest blog posts
function loadLatestBlogPosts() {
    // This function can be connected to:
    // 1. An RSS feed from your blog platform (WordPress, Medium, etc.)
    // 2. A headless CMS like Contentful, Strapi, etc.
    // 3. Your own API endpoint
    
    // For now, we'll use a sample implementation that loads from the JSON file
    // but can be easily replaced with an actual RSS feed or API call
    
    fetch('data/blog.json')
        .then(response => response.json())
        .then(data => {
            if (data && data.posts && data.posts.length > 0) {
                updateBlogPosts(data.posts);
            }
        })
        .catch(error => {
            console.error('Error loading blog posts:', error);
        });
    
    // Example of how to fetch from an RSS feed (uncomment and modify when ready)
    /*
    // Using a CORS proxy to fetch RSS feed
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
    const RSS_URL = 'https://yourblog.com/feed/';
    
    fetch(CORS_PROXY + RSS_URL)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const items = data.querySelectorAll("item");
            const posts = [];
            
            items.forEach(item => {
                posts.push({
                    title: item.querySelector("title").textContent,
                    description: item.querySelector("description").textContent.substring(0, 150) + "...",
                    date: new Date(item.querySelector("pubDate").textContent).toLocaleDateString(),
                    link: item.querySelector("link").textContent,
                    // Extract image from content if available
                    image: extractImageFromContent(item.querySelector("content\\:encoded").textContent)
                });
            });
            
            updateBlogPosts(posts);
        })
        .catch(error => {
            console.error('Error fetching RSS feed:', error);
        });
    */
}

// Function to update blog posts in the DOM
function updateBlogPosts(posts) {
    const blogGrid = document.querySelector('#blog .blog-grid');
    if (!blogGrid) return;
    
    // Clear existing posts
    blogGrid.innerHTML = '';
    
    // Add new posts
    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.className = 'blog-card' + (index === 1 ? ' featured' : '');
        
        postElement.innerHTML = `
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
        `;
        
        blogGrid.appendChild(postElement);
    });
}

// Helper function to extract image from content (for RSS feeds)
function extractImageFromContent(content) {
    const div = document.createElement('div');
    div.innerHTML = content;
    const img = div.querySelector('img');
    return img ? img.src : 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';
}