/**
 * Classic Editorial Portfolio - JavaScript
 * Minimal, purposeful interactions for a timeless design
 */

document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Toggle mobile menu function
    function toggleMobileMenu() {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle');

        // Update aria-expanded for accessibility
        const isExpanded = navLinks.classList.contains('nav-active');
        burger.setAttribute('aria-expanded', isExpanded);

        // Simple fade animation for links (only if motion is not reduced)
        if (!prefersReducedMotion) {
            navLinksItems.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.3s ease forwards ${index * 0.1}s`;
                }
            });
        }
    }

    // Mobile menu event listeners
    if (burger) {
        burger.addEventListener('click', toggleMobileMenu);

        burger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMobileMenu();
            }
        });
    }

    // Close mobile menu function
    function closeMobileMenu() {
        navLinks.classList.remove('nav-active');
        burger.classList.remove('toggle');
        burger.setAttribute('aria-expanded', 'false');
        navLinksItems.forEach(item => {
            item.style.animation = '';
        });
    }

    // Close mobile menu when clicking on a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target) || burger.contains(event.target);

        if (!isClickInsideNav && navLinks.classList.contains('nav-active')) {
            closeMobileMenu();
        }
    });

    // Close mobile menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('nav-active')) {
            closeMobileMenu();
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 100; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });
            }
        });
    });

    // Subtle navbar scroll effect
    let ticking = false;

    function updateNavbar() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });

    // Form enhancement
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simple form validation feedback
            const submitButton = contactForm.querySelector('.submit-button');
            const originalText = submitButton.textContent;

            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                submitButton.textContent = 'Message Sent';
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    contactForm.reset();
                }, 2000);
            }, 1000);
        });
    }
});