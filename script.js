// Slider functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

// Initialize slider
function initSlider() {
    if (slides.length > 0) {
        showSlide(0);
        // Auto-play slider
        setInterval(() => {
            changeSlide(1);
        }, 5000); // Change slide every 5 seconds
    }
}

// Show specific slide
function showSlide(index) {
    if (slides.length === 0) return;
    
    // Reset all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Wrap around if index is out of bounds
    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }
    
    // Show current slide
    slides[currentSlideIndex].classList.add('active');
    if (dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.add('active');
    }
}

// Change slide by direction
function changeSlide(direction) {
    showSlide(currentSlideIndex + direction);
}

// Go to specific slide
function currentSlide(index) {
    showSlide(index - 1); // Dots are 1-indexed
}

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link, .footer-section a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Contact form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (name && email && subject && message) {
            // Here you would typically send the form data to a server
            // For now, we'll just show an alert
            alert('Thank you for your message, ' + name + '! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Modern scrolling effects - Intersection Observer setup
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Create multiple observers for different animation types
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }, index * 100); // Staggered animation
        }
    });
}, observerOptions);

const scaleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'scale(1)';
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Animate skill bars on scroll with enhanced effect
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillProgress = entry.target.querySelector('.skill-progress');
            if (skillProgress) {
                const width = skillProgress.style.width;
                skillProgress.style.width = '0%';
                setTimeout(() => {
                    skillProgress.style.width = width;
                }, 100);
            }
            // Add animation class
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
        }
    });
}, observerOptions);

// Initialize scroll animations for elements
function initScrollAnimations() {
    // Fade in animations for sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transition = 'opacity 0.8s ease-in-out';
        fadeObserver.observe(section);
    });

    // Slide up animations for about content, education items, and photos
    document.querySelectorAll('.about-text, .education-item, .about-photos, .photo-container, .photo-gallery .about-photo').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        slideObserver.observe(item);
    });

    // Scale and fade animations for skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) scale(0.9)';
        item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        skillObserver.observe(item);
    });

    // Staggered slide up animations for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        slideObserver.observe(card);
    });

    // Fade in for contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.style.opacity = '0';
        contactForm.style.transform = 'translateY(30px)';
        contactForm.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        fadeObserver.observe(contactForm);
    }

    // Scale animation for section titles
    document.querySelectorAll('.section-title').forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'scale(0.9)';
        title.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        scaleObserver.observe(title);
    });
}

// Parallax effect for slider background
function initParallaxEffect() {
    const slider = document.querySelector('.slider-container');
    if (!slider) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        
        if (scrolled < slider.offsetHeight) {
            slider.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Smooth reveal on scroll with better performance
function initSmoothReveal() {
    let ticking = false;

    function updateScrollAnimations() {
        const elements = document.querySelectorAll('.project-card, .skill-item, .education-item');
        const windowHeight = window.innerHeight;

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - 100 && !element.classList.contains('animated')) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0) scale(1)';
                element.classList.add('animated');
            }
        });

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateScrollAnimations);
            ticking = true;
        }
    });
}

// Scroll progress indicator (optional visual enhancement)
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #3498db, #2980b9);
        z-index: 9999;
        transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Enhanced navbar scroll effect - make it sticky when scrolling to other sections
function enhanceNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const homeSection = document.querySelector('#home');
    
    if (!navbar || !homeSection) return;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const homeSectionHeight = homeSection.offsetHeight;
        
        // When scrolling past the home section, make navbar fully sticky with enhanced styling
        if (currentScroll > homeSectionHeight - 100) {
            navbar.style.position = 'fixed';
            navbar.style.top = '0';
            navbar.style.width = '100%';
            navbar.style.zIndex = '1000';
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.15)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.transform = 'translateY(0)';
            navbar.classList.add('sticky-navbar');
        } else if (currentScroll > 50) {
            // When scrolling within home section but not past it
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.15)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.transform = 'translateY(0)';
        } else {
            // At the top of the page
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navbar.style.backdropFilter = 'none';
            navbar.style.transform = 'translateY(0)';
        }
    });
}

// Add smooth transitions to navbar
const navbar = document.querySelector('.navbar');
if (navbar) {
    navbar.style.transition = 'background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease, backdrop-filter 0.3s ease';
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSlider();
    initScrollAnimations();
    initParallaxEffect();
    initSmoothReveal();
    initScrollProgress();
    enhanceNavbarScroll();
});


