// Animated Particles for Hero Section
document.addEventListener('DOMContentLoaded', function() {
    // Create particles for hero section
    createParticles();
    
    // Create animated shapes for sections
    createShapes();
});

function createParticles() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Create particles container if it doesn't exist
    let particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) {
        particlesContainer = document.createElement('div');
        particlesContainer.className = 'hero-particles';
        heroSection.appendChild(particlesContainer);
    }
    
    // Clear existing particles
    particlesContainer.innerHTML = '';
    
    // Create new particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('span');
        particle.className = 'particle';
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 5 + 2;
        
        // Random opacity
        const opacity = Math.random() * 0.5 + 0.1;
        
        // Random animation duration and delay
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        // Set styles
        particle.style.cssText = `
            position: absolute;
            top: ${posY}%;
            left: ${posX}%;
            width: ${size}px;
            height: ${size}px;
            background-color: rgba(52, 152, 219, ${opacity});
            border-radius: 50%;
            animation: float-particle ${duration}s ${delay}s infinite ease-in-out;
            z-index: 1;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

function createShapes() {
    // Add decorative shapes to various sections
    const sections = [
        document.querySelector('.about'),
        document.querySelector('.skills-section'),
        document.querySelector('.services'),
        document.querySelector('.portfolio'),
        document.querySelector('.contact')
    ];
    
    sections.forEach((section, index) => {
        if (!section) return;
        
        // Create shapes container
        const shapesContainer = document.createElement('div');
        shapesContainer.className = 'shapes-container';
        shapesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: -1;
            opacity: 0.5;
        `;
        
        // Add shapes
        for (let i = 0; i < 5; i++) {
            const shape = document.createElement('div');
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Random size
            const size = Math.random() * 100 + 50;
            
            // Random shape type
            const shapeType = Math.floor(Math.random() * 3);
            let shapeClass;
            
            switch (shapeType) {
                case 0:
                    shapeClass = 'circle-shape';
                    break;
                case 1:
                    shapeClass = 'square-shape';
                    break;
                case 2:
                    shapeClass = 'triangle-shape';
                    break;
            }
            
            shape.className = shapeClass;
            
            // Random opacity
            const opacity = Math.random() * 0.1 + 0.02;
            
            // Random animation duration and delay
            const duration = Math.random() * 30 + 20;
            const delay = Math.random() * 5;
            
            // Set styles
            shape.style.cssText = `
                position: absolute;
                top: ${posY}%;
                left: ${posX}%;
                width: ${size}px;
                height: ${size}px;
                background-color: rgba(52, 152, 219, ${opacity});
                animation: float ${duration}s ${delay}s infinite ease-in-out;
                z-index: -1;
            `;
            
            if (shapeClass === 'circle-shape') {
                shape.style.borderRadius = '50%';
            } else if (shapeClass === 'triangle-shape') {
                shape.style.width = '0';
                shape.style.height = '0';
                shape.style.backgroundColor = 'transparent';
                shape.style.borderLeft = `${size/2}px solid transparent`;
                shape.style.borderRight = `${size/2}px solid transparent`;
                shape.style.borderBottom = `${size}px solid rgba(52, 152, 219, ${opacity})`;
            }
            
            shapesContainer.appendChild(shape);
        }
        
        // Add the shapes container to the section
        section.style.position = 'relative';
        section.appendChild(shapesContainer);
    });
}

// Refresh particles on window resize
window.addEventListener('resize', function() {
    createParticles();
});