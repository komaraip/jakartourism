/**
 * Helper functions for the Jakarta Tourism application
 * These functions handle image loading and other utility functions
 */

// Standard image path used throughout the application
function getBasePath() {
    return window.location.pathname.replace(/\/+$/, '');
}

const STANDARD_IMAGE_PATH = getBasePath() + '/static/img/example_img.jpg';

/**
 * Get the full path for an image
 * @returns {string} The complete URL for the standard image
 */
function getStandardImageUrl() {
    return STANDARD_IMAGE_PATH;
}

/**
 * Preload an image to ensure it's in the browser cache
 * @param {string} url - The URL of the image to preload
 */
function preloadImage(url) {
    const img = new Image();
    img.src = url;
}

/**
 * Mark all images in the document as loaded 
 */
function markAllImagesLoaded() {
    document.querySelectorAll('img').forEach(img => {
        if (img.complete) {
            img.classList.add('img-loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('img-loaded');
            });
        }
    });
}

/**
 * Initialize navbar scroll effects and mobile menu animations
 */
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    const navLinks = document.querySelectorAll('.navbar .nav-link');
    const sections = ['hero', 'categories', 'destinations', 'about'];
    
    // Initialize social icons hover effects
    const socialIcons = document.querySelectorAll('.social-links a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Handle navbar scroll effect and progress indicator
    window.addEventListener('scroll', () => {
        // Add scrolled class when page is scrolled
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Calculate scroll progress
        if (scrollProgress) {
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        }
        
        // Update active nav link based on scroll position
        const currentPos = window.scrollY + 100; // Offset for better transition
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (currentPos >= sectionTop && currentPos <= (sectionTop + sectionHeight)) {
                    // Remove active class from all links
                    navLinks.forEach(link => link.classList.remove('active'));
                    
                    // Add active class to the matching section link
                    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    } else if (sectionId === 'hero' || sectionId === 'destinations') {
                        // For sections like hero that might not have a direct link
                        document.querySelector('.nav-link[href="#"]')?.classList.add('active');
                    }
                }
            }
        });
    });    // Handle hamburger button click animation
    const hamburgerBtn = document.querySelector('.custom-toggler');
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', function() {
            // Toggle animation is handled by CSS using aria-expanded
        });

        // Close mobile menu when clicking a nav link
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    hamburgerBtn.click();
                }
            });
        });
    }
    
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    if (tooltipTriggerList.length > 0) {
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl, {
                delay: { show: 300, hide: 100 }
            });
        });
    }
}

// Export functions
window.AppHelpers = {
    getStandardImageUrl,
    preloadImage,
    markAllImagesLoaded,
    initNavbarEffects
};
