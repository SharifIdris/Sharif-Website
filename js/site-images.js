// Function to load site images from JSON files
async function loadSiteImages() {
    try {
        // Load hero images
        const heroResponse = await fetch('/data/hero-images.json');
        const heroData = await heroResponse.json();
        
        // Update hero section images
        const heroImage = document.querySelector('.hero-image img');
        if (heroImage && heroData.profileImage) {
            heroImage.src = heroData.profileImage;
        }
        
        // Update hero background if it exists
        if (heroData.backgroundImage) {
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                heroSection.style.backgroundImage = `url(${heroData.backgroundImage})`;
            }
        }
        
        // Load about images
        const aboutResponse = await fetch('/data/about-images.json');
        const aboutData = await aboutResponse.json();
        
        // Update about section image
        const aboutImage = document.querySelector('.about-img img');
        if (aboutImage && aboutData.aboutImage) {
            aboutImage.src = aboutData.aboutImage;
        }
        
        // Load branding
        const brandingResponse = await fetch('/data/branding.json');
        const brandingData = await brandingResponse.json();
        
        // Update logo
        const logoImages = document.querySelectorAll('.logo img');
        if (logoImages.length > 0 && brandingData.logo) {
            logoImages.forEach(img => {
                img.src = brandingData.logo;
            });
        }
        
        // Update favicon
        if (brandingData.favicon) {
            const faviconLinks = document.querySelectorAll('link[rel*="icon"]');
            faviconLinks.forEach(link => {
                if (link.getAttribute('type') === 'image/svg+xml') {
                    link.href = brandingData.favicon;
                }
            });
        }
        
    } catch (error) {
        console.error('Error loading site images:', error);
    }
}

// Load site images when DOM is loaded
document.addEventListener('DOMContentLoaded', loadSiteImages);