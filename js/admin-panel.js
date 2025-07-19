/**
 * Admin Panel Functionality
 * Handles the sliding admin panel and authentication
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const adminToggleBtn = document.getElementById('adminToggleBtn');
    const adminPanel = document.getElementById('adminPanel');
    const adminPanelClose = document.getElementById('adminPanelClose');
    const adminOverlay = document.getElementById('adminOverlay');
    const adminLoginForm = document.getElementById('adminLoginForm');
    
    if (!adminToggleBtn || !adminPanel || !adminPanelClose || !adminOverlay || !adminLoginForm) {
        console.error('Admin panel elements not found');
        return;
    }
    
    // Open admin panel with smooth animation
    adminToggleBtn.addEventListener('click', function() {
        // Add active class to overlay first for a smoother transition
        adminOverlay.classList.add('active');
        
        // Slight delay before opening panel for better visual effect
        setTimeout(() => {
            adminPanel.classList.add('open');
        }, 50);
        
        // Rotate icon when panel is open
        this.querySelector('i').classList.add('fa-spin');
        setTimeout(() => {
            this.querySelector('i').classList.remove('fa-spin');
        }, 500);
    });
    
    // Close admin panel
    adminPanelClose.addEventListener('click', function() {
        closeAdminPanel();
    });
    
    // Close panel when clicking overlay
    adminOverlay.addEventListener('click', function() {
        closeAdminPanel();
    });
    
    // Close panel function with smooth animation
    function closeAdminPanel() {
        // First close the panel
        adminPanel.classList.remove('open');
        
        // Then remove the overlay with a slight delay
        setTimeout(() => {
            adminOverlay.classList.remove('active');
        }, 300);
        
        // Reset form fields
        adminLoginForm.reset();
    }
    
    // Handle admin login
    adminLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Use Netlify Identity for authentication
        const email = document.getElementById('adminEmail').value;
        const password = document.getElementById('adminPassword').value;
        
        // Open Netlify Identity widget
        if (window.netlifyIdentity) {
            netlifyIdentity.open();
            
            // Listen for successful login
            netlifyIdentity.on('login', user => {
                // Redirect to admin panel after successful login
                window.location.href = '/admin/';
            });
        } else {
            console.error('Netlify Identity widget not loaded');
            alert('Authentication service not available. Please try again later.');
        }
    });
    
    // Handle ESC key to close panel
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && adminPanel.classList.contains('open')) {
            closeAdminPanel();
        }
    });
});