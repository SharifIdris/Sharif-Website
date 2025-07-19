// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Hide preloader when page is loaded
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            // Remove preloader from DOM after animation completes
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }
    });
    
    // Enhanced animations for elements
    function initEnhancedAnimations() {
        // Add animation to section headers when they come into view
        const sectionHeaders = document.querySelectorAll('.section-header');
        if ('IntersectionObserver' in window && sectionHeaders.length > 0) {
            const headerObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        headerObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            sectionHeaders.forEach(header => {
                headerObserver.observe(header);
            });
        }
        
        // Add floating animation to service icons
        const serviceIcons = document.querySelectorAll('.service-icon');
        serviceIcons.forEach(icon => {
            icon.classList.add('floating');
        });
    }
    
    // Initialize enhanced animations
    initEnhancedAnimations();
    
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a nav link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Testimonial Slider
    const dots = document.querySelectorAll('.dot');
    const testimonials = document.querySelectorAll('.testimonial-item');
    const track = document.querySelector('.testimonial-track');
    const prevBtn = document.querySelector('.testimonial-arrow.prev');
    const nextBtn = document.querySelector('.testimonial-arrow.next');
    let currentSlide = 0;

    function showSlide(index) {
        if (!track) return;
        
        // Update track position
        track.style.transform = `translateX(-${index * 100}%)`;
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Add active class to current dot
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }

    // Initialize the slider
    showSlide(currentSlide);

    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Add click events to arrows
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
            showSlide(currentSlide);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % testimonials.length;
            showSlide(currentSlide);
        });
    }

    // Auto slide functionality
    function autoSlide() {
        currentSlide = (currentSlide + 1) % testimonials.length;
        showSlide(currentSlide);
    }

    // Change slide every 5 seconds
    let slideInterval = setInterval(autoSlide, 5000);

    // Pause auto slide on hover
    if (track) {
        track.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        track.addEventListener('mouseleave', () => {
            slideInterval = setInterval(autoSlide, 5000);
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get the height of the fixed header
                const headerHeight = document.querySelector('header').offsetHeight;
                
                // Calculate the position to scroll to (element position - header height)
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For now, we'll just log it and show a success message
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message
            const formHeader = document.querySelector('.form-header');
            const originalContent = formHeader.innerHTML;
            
            formHeader.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle" style="color: var(--secondary-color); font-size: 3rem; margin-bottom: 1rem;"></i>
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for reaching out. I'll get back to you soon.</p>
                </div>
            `;
            
            // Reset the form
            contactForm.reset();
            
            // Restore original form header after 5 seconds
            setTimeout(() => {
                formHeader.innerHTML = originalContent;
            }, 5000);
        });
    }

    // Add fixed header on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }
        
        // Show/hide back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        }
    });

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .blog-card, .about-img, .about-text, .about-card, .stat-item, .contact-card, .contact-form-container');
    
    const animateOnScroll = function() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('show');
            }
        });
    };

    // Add animate class to all elements that should animate
    animateElements.forEach(element => {
        element.classList.add('animate');
    });

    window.addEventListener('scroll', animateOnScroll);
    // Call once on load to check for elements already in view
    window.addEventListener('load', animateOnScroll);

    // Portfolio filtering
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

    // Typing effect for hero section
    const typingElement = document.querySelector('.typing-text');
    
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        
        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, 100);
    }

    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 16ms per frame (approx 60fps)
        let current = 0;
        
        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target;
                clearInterval(counter);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Use Intersection Observer to trigger counter animation when stats section is in view
    if ('IntersectionObserver' in window && statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statNumbers.forEach(animateCounter);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        const statsSection = document.querySelector('.stats');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Here you would typically send the email to a server
            console.log('Newsletter subscription:', email);
            
            // Show success message
            const originalButton = this.querySelector('button').innerHTML;
            this.querySelector('button').innerHTML = '<i class="fas fa-check"></i>';
            
            // Reset the form
            this.reset();
            
            // Restore original button after 2 seconds
            setTimeout(() => {
                this.querySelector('button').innerHTML = originalButton;
            }, 2000);
        });
    }
});

// Particles animation for hero section
function createParticles() {
    const heroParticles = document.querySelector('.hero-particles');
    if (!heroParticles) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('span');
        particle.classList.add('particle');
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 5 + 1;
        
        // Random opacity
        const opacity = Math.random() * 0.5 + 0.1;
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        
        // Set styles
        particle.style.cssText = `
            position: absolute;
            top: ${posY}%;
            left: ${posX}%;
            width: ${size}px;
            height: ${size}px;
            background-color: rgba(255, 255, 255, ${opacity});
            border-radius: 50%;
            animation: float ${duration}s linear infinite;
        `;
        
        heroParticles.appendChild(particle);
    }
}

// Call createParticles when the page loads
window.addEventListener('load', createParticles);

// Cookie Consent
function initCookieConsent() {
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');
    
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookieConsent');
    
    if (!cookieChoice) {
        // Show the cookie consent banner after a short delay
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 2000);
    }
    
    // Handle accept button click
    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsent.classList.remove('show');
    });
    
    // Handle decline button click
    declineBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        cookieConsent.classList.remove('show');
    });
}

// Initialize cookie consent when the page loads
window.addEventListener('load', initCookieConsent);
// Skills section animations
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Initialize skill bars animation when skills section is in view
if ('IntersectionObserver' in window) {
    const skillsSection = document.querySelector('.skills-section');
    
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(skillsSection);
    }
}