// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Services Accordion
    initAccordion();
    
    // Initialize Portfolio Tabs
    initTabs();
});

// Services Accordion Functionality
function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // Check if this item is already active
            const isActive = item.classList.contains('active');
            
            // Close all accordion items
            accordionItems.forEach(accordionItem => {
                accordionItem.classList.remove('active');
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Open the first accordion item by default
    if (accordionItems.length > 0) {
        accordionItems[0].classList.add('active');
    }
}

// Portfolio Tabs Functionality
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get the tab to show
            const tabId = button.getAttribute('data-tab');
            
            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show the selected tab content
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Initialize Project Accordions within tabs
    initProjectAccordions();
}

// Project Accordions within Portfolio Tabs
function initProjectAccordions() {
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        const header = item.querySelector('.project-header');
        
        header.addEventListener('click', () => {
            // Toggle active class on the clicked item
            item.classList.toggle('active');
        });
    });
}