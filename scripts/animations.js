/* SCROLL ANIMATIONS ENGINE - The Original Tavern */

// Polyfill for NodeList.prototype.forEach in older mobile browsers
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Scroll Reveals
    const revealElements = document.querySelectorAll('.reveal');
    
    if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers: show everything immediately so they don't stay invisible
        revealElements.forEach(el => {
            el.classList.add('active');
        });
    } else {
        const revealOptions = {
            root: null, // Viewport
            threshold: 0.15, // Trigger when 15% of the element is visible
            rootMargin: "0px 0px -50px 0px" // Offset the trigger point slightly upwards for a better feel
        };
        
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Once animated, we can stop observing it to save resources
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);
        
        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }

    // Backup safety timer: Force show all elements after 1.5 seconds if scroll animations are throttled or frozen (e.g. low power mode)
    setTimeout(function() {
        revealElements.forEach(el => {
            if (!el.classList.contains('active')) {
                el.classList.add('active');
            }
        });
    }, 1500);

    // 2. Active Section Navigation Link Updater on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 120; // Add offset for header height
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Trigger initially on page load
    
    // 3. Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                const mobileToggle = document.getElementById('mobile-toggle');
                if (navMenu && navMenu.classList.contains('open')) {
                    navMenu.classList.remove('open');
                    mobileToggle.classList.remove('open');
                }
                
                // Scroll smoothly to target
                const headerHeight = document.getElementById('header').offsetHeight;
                const offsetPosition = targetSection.offsetTop - (headerHeight - 10);
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
