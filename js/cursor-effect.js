// Custom Cursor Effect
document.addEventListener('DOMContentLoaded', function() {
    // Create cursor effect element
    const cursor = document.createElement('div');
    cursor.className = 'cursor-effect';
    document.body.appendChild(cursor);
    
    // Update cursor position on mouse move
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add active class on mouse down
    document.addEventListener('mousedown', function() {
        cursor.classList.add('active');
    });
    
    // Remove active class on mouse up
    document.addEventListener('mouseup', function() {
        cursor.classList.remove('active');
    });
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .accordion-header, .project-header, .tab-btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.classList.add('active');
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.classList.remove('active');
        });
    });
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Hide cursor effect on mobile devices
    if (window.innerWidth <= 768) {
        cursor.style.display = 'none';
        document.body.style.cursor = 'auto';
    }
    
    // Update cursor visibility on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            cursor.style.display = 'none';
            document.body.style.cursor = 'auto';
        } else {
            cursor.style.display = 'block';
            document.body.style.cursor = 'none';
        }
    });
});