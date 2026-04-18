document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Logic ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }

    // --- Intersection Observer for Fade-in Animations ---
    const faders = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // --- Sticky CTA Visibility Logic ---
    const stickyCta = document.querySelector('.sticky-cta');
    const heroSection = document.querySelector('.hero');
    
    if (stickyCta && heroSection) {
        const ctaObserverOptions = {
            threshold: 0,
            rootMargin: "-200px 0px 0px 0px"
        };
        
        const ctaObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    // Passed hero section, show sticky ctas
                    stickyCta.classList.add('visible');
                } else {
                    // Inside hero section, hide sticky ctas
                    stickyCta.classList.remove('visible');
                }
            });
        }, ctaObserverOptions);
        
        ctaObserver.observe(heroSection);
    }

    // --- Lightbox Gallery Logic ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightboxBtn = document.querySelector('.lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const mainGalleryImg = document.getElementById('main-gallery-img');
    const galleryThumbs = document.querySelectorAll('.thumb img');

    // Thumbnail swap logic
    galleryThumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            mainGalleryImg.src = this.src;
        });
    });

    // Open lightbox
    if(mainGalleryImg && lightbox) {
        mainGalleryImg.parentElement.addEventListener('click', () => {
            lightboxImg.src = mainGalleryImg.src;
            lightbox.classList.add('active');
        });
    }

    // Close lightbox
    if(closeLightboxBtn) {
        closeLightboxBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
    }
    
    if(lightbox) {
        lightbox.addEventListener('click', (e) => {
            if(e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    }

    // --- Form validation ---
    const contactForm = document.getElementById('lead-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Basic simulation of success
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-check"></i> Request Sent';
            btn.style.backgroundColor = '#25D366';
            btn.style.color = '#fff';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.backgroundColor = '';
                btn.style.color = '';
                contactForm.reset();
            }, 3000);
        });
    }

    // --- Smooth Scroll for valid hash links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetEl = document.querySelector(targetId);
            if(targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});
