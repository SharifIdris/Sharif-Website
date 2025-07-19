// Force reload content from CMS
function forceReloadContent() {
  // Add a timestamp parameter to prevent caching
  const timestamp = new Date().getTime();
  
  // Load services
  loadServices(timestamp);
  
  // Load projects
  loadProjects(timestamp);
  
  // Load blog posts
  loadBlogPosts(timestamp);
  
  // Load site settings
  loadSiteSettings(timestamp);
  
  console.log('CMS content reloaded at', new Date().toLocaleTimeString());
}

// Add a reload button to the page
document.addEventListener('DOMContentLoaded', function() {
  const footer = document.querySelector('.footer-shape');
  if (footer) {
    const reloadButton = document.createElement('button');
    reloadButton.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh Content';
    reloadButton.style.position = 'fixed';
    reloadButton.style.bottom = '20px';
    reloadButton.style.right = '20px';
    reloadButton.style.padding = '10px 15px';
    reloadButton.style.backgroundColor = '#3498db';
    reloadButton.style.color = 'white';
    reloadButton.style.border = 'none';
    reloadButton.style.borderRadius = '5px';
    reloadButton.style.cursor = 'pointer';
    reloadButton.style.zIndex = '999';
    reloadButton.style.display = 'none'; // Hidden by default
    
    // Show button when pressing Ctrl+Shift+R
    document.addEventListener('keydown', function(e) {
      if (e.ctrlKey && e.shiftKey && e.key === 'R') {
        e.preventDefault();
        reloadButton.style.display = reloadButton.style.display === 'none' ? 'block' : 'none';
      }
    });
    
    reloadButton.addEventListener('click', function() {
      forceReloadContent();
      
      // Show loading indicator
      const loadingIndicator = document.createElement('div');
      loadingIndicator.textContent = 'Reloading content...';
      loadingIndicator.style.position = 'fixed';
      loadingIndicator.style.top = '50%';
      loadingIndicator.style.left = '50%';
      loadingIndicator.style.transform = 'translate(-50%, -50%)';
      loadingIndicator.style.padding = '20px';
      loadingIndicator.style.backgroundColor = 'rgba(0,0,0,0.8)';
      loadingIndicator.style.color = 'white';
      loadingIndicator.style.borderRadius = '5px';
      loadingIndicator.style.zIndex = '1000';
      document.body.appendChild(loadingIndicator);
      
      // Remove loading indicator after 2 seconds
      setTimeout(function() {
        document.body.removeChild(loadingIndicator);
      }, 2000);
    });
    
    document.body.appendChild(reloadButton);
  }
});