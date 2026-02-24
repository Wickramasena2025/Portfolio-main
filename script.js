/**
 * TIKKA Portfolio - JavaScript
 * Theme: Dark Green & White
 * Features: Dark/Light Mode, Navigation, Scroll Effects, Portfolio Filter
 */

// ========================================
// Configuration
// ========================================

// Social Media Links - Edit these to update all links across the site
const socialLinks = {
    facebook: 'https://www.facebook.com/share/1FfwXtZyqg/?mibextid=wwXIfr',
    instagram: 'https://www.instagram.com/t_s_w_07_14_?igsh=MThrZ3d2ZndraThxbA%3D%3D&utm_source=qr',
    youtube: 'https://youtube.com/@tikka.abcd.0?si=Zgrk0-H8ZfL24qHB',
    fiverr: 'https://fiverr.com/tikka_abcd',
    github: 'https://github.com/TIKKA-AbCd',
    whatsapp: 'https://wa.me/94776496564?text=Hi%20TIKKA,%20I%20saw%20your%20portfolio%20website%20and%20want%20to%20work%20with%20you.'
};

// Contact Information - Edit these to update contact details
const contactInfo = {
    email: 'Tikka.abcd.0@gmail.com',
    phone: '+94 77 649 6564',
    location: 'Sri Lanka'
};

// ========================================
// DOM Elements
// ========================================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('themeToggle');
const backToTop = document.getElementById('backToTop');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const sections = document.querySelectorAll('section');

// ========================================
// Theme Management
// ========================================

/**
 * Initialize theme based on user preference or system preference
 */
function initTheme() {
    // Check localStorage first
    const savedTheme = localStorage.getItem('tikka-theme');
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = prefersDark ? 'dark' : 'dark'; // Default to dark as requested
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('tikka-theme', theme);
    }
}

/**
 * Toggle between dark and light themes
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('tikka-theme', newTheme);
    
    // Add animation class
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = '';
    }, 300);
}

// ========================================
// Navigation
// ========================================

/**
 * Toggle mobile navigation menu
 */
function toggleNav() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('nav-open');
}

/**
 * Close mobile navigation menu
 */
function closeNav() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('nav-open');
}

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
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

/**
 * Add scroll effect to navbar
 */
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ========================================
// Scroll Effects
// ========================================

/**
 * Show/hide back to top button
 */
function handleBackToTop() {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

/**
 * Smooth scroll to top
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * Smooth scroll to section when clicking nav links
 */
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        closeNav();
    }
}

// ========================================
// Portfolio Filter
// ========================================

/**
 * Filter portfolio items by category
 */
function filterPortfolio() {
    const filter = this.getAttribute('data-filter');
    
    // Update active button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
    
    // Filter items
    portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            item.classList.remove('hidden');
            item.style.display = 'block';
            
            // Add animation
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 50);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                item.classList.add('hidden');
                item.style.display = 'none';
            }, 300);
        }
    });
}

// ========================================
// Scroll Reveal Animation
// ========================================

/**
 * Initialize scroll reveal animations
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.skill-card, .portfolio-item, .about-text, .about-image, .contact-info, .contact-cta');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });
}

// ========================================
// Parallax Effect
// ========================================

/**
 * Add parallax effect to hero section
 */
function initParallax() {
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage && window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth - e.pageX) / 50;
            const y = (window.innerHeight - e.pageY) / 50;
            
            heroImage.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    }
}

// ========================================
// Typing Effect (Optional enhancement)
// ========================================

/**
 * Add typing effect to hero tagline
 */
function initTypingEffect() {
    const tagline = document.querySelector('.hero-tagline');
    if (!tagline) return;
    
    const text = tagline.textContent;
    tagline.textContent = '';
    tagline.style.opacity = '1';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, 50);
}

// ========================================
// Counter Animation
// ========================================

/**
 * Animate counter numbers
 */
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

/**
 * Initialize counter animations when in view
 */
function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => counterObserver.observe(stat));
}

// ========================================
// Update Social Links
// ========================================

/**
 * Update all social media links from config
 */
function updateSocialLinks() {
    // Update hero socials
    const heroSocials = document.querySelectorAll('.hero-socials .social-link');
    heroSocials[0]?.setAttribute('href', socialLinks.facebook);
    heroSocials[1]?.setAttribute('href', socialLinks.instagram);
    heroSocials[2]?.setAttribute('href', socialLinks.youtube);
    heroSocials[3]?.setAttribute('href', socialLinks.fiverr);
    heroSocials[4]?.setAttribute('href', socialLinks.github);
    
    // Update contact socials
    const contactSocials = document.querySelectorAll('.contact-socials .social-link');
    contactSocials[0]?.setAttribute('href', socialLinks.facebook);
    contactSocials[1]?.setAttribute('href', socialLinks.instagram);
    contactSocials[2]?.setAttribute('href', socialLinks.youtube);
    contactSocials[3]?.setAttribute('href', socialLinks.fiverr);
    contactSocials[4]?.setAttribute('href', socialLinks.github);
    
    // Update footer socials
    const footerSocials = document.querySelectorAll('.footer-socials a');
    footerSocials[0]?.setAttribute('href', socialLinks.facebook);
    footerSocials[1]?.setAttribute('href', socialLinks.instagram);
    footerSocials[2]?.setAttribute('href', socialLinks.youtube);
    footerSocials[3]?.setAttribute('href', socialLinks.fiverr);
    footerSocials[4]?.setAttribute('href', socialLinks.github);
    
    // Update WhatsApp links
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.setAttribute('href', socialLinks.whatsapp);
    });
}

/**
 * Update contact information
 */
function updateContactInfo() {
    const emailLink = document.querySelector('a[href^="mailto:"]');
    const phoneLink = document.querySelector('a[href^="tel:"]');
    
    if (emailLink) {
        emailLink.setAttribute('href', `mailto:${contactInfo.email}`);
        emailLink.textContent = contactInfo.email;
    }
    
    if (phoneLink) {
        phoneLink.setAttribute('href', `tel:${contactInfo.phone.replace(/\s/g, '')}`);
        phoneLink.textContent = contactInfo.phone;
    }
}

// ========================================
// Performance Optimization
// ========================================

/**
 * Debounce function for scroll events
 */
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// ========================================
// Event Listeners
// ========================================

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Update links and contact info
    updateSocialLinks();
    updateContactInfo();
    
    // Initialize animations
    initScrollReveal();
    initCounterAnimation();
    
    // Initialize parallax (desktop only)
    if (window.innerWidth > 768) {
        initParallax();
    }
    
    // Typing effect (optional - uncomment if desired)
    // initTypingEffect();
});

// Theme toggle
themeToggle.addEventListener('click', toggleTheme);

// Mobile navigation
navToggle.addEventListener('click', toggleNav);

// Navigation links
navLinks.forEach(link => {
    link.addEventListener('click', smoothScroll);
});

// Scroll events
window.addEventListener('scroll', debounce(() => {
    handleNavbarScroll();
    updateActiveNavLink();
    handleBackToTop();
}));

// Back to top button
backToTop.addEventListener('click', scrollToTop);

// Portfolio filter
filterBtns.forEach(btn => {
    btn.addEventListener('click', filterPortfolio);
});

// Close mobile nav when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
        closeNav();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeNav();
    }
});

// Handle window resize
window.addEventListener('resize', debounce(() => {
    if (window.innerWidth > 768) {
        closeNav();
    }
}));

// ========================================
// Preloader (Optional)
// ========================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ========================================
// Console Welcome Message
// ========================================

console.log('%c👋 Welcome to TIKKA\'s Portfolio!', 'font-size: 24px; font-weight: bold; color: #064e3b;');
console.log('%cWeb Developer | Graphic Designer | Creative Freelancer', 'font-size: 14px; color: #10b981;');
console.log('%cLooking for a developer? Let\'s work together!', 'font-size: 12px; color: #6b7280;');
