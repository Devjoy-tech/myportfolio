document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    const backToTop = document.querySelector('.back-to-top');
    const navItems = document.querySelectorAll('.nav-links a');
    const skillCards = document.querySelectorAll('.skill-card');
    const projectCards = document.querySelectorAll('.project-card');
    const statNumbers = document.querySelectorAll('.stat-number');
    const typedText = document.querySelector('.typed-text');
    const contactForm = document.getElementById('contactForm');
    const heroBg = document.querySelector('.hero-bg');

    if (heroBg) {
        gsap.to(heroBg, {
            opacity: 1,
            filter: "grayscale(100%) brightness(0.8)",
            duration: 2,
            ease: "power2.out",
            delay: 0.3
        });

        gsap.to(heroBg, {
            scale: 1.1,
            duration: 8,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });
    }

    gsap.from('.hero-text > *', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.5
    });

    gsap.from('.nav-links a', {
        opacity: 0,
        y: -20,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
    });

    gsap.from('.btn', {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(1.7)",
        delay: 1
    });

    gsap.from('.social-links a', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        delay: 1.2
    });

    if (window.Motion && window.Motion.animate) {
        const { animate, inView } = window.Motion;

        document.querySelectorAll('.project-card').forEach((card, index) => {
            if (inView) {
                inView(card, ({ target }) => {
                    animate(target, 
                        { opacity: [0, 1], y: [30, 0] },
                        { duration: 0.6, delay: index * 0.1, easing: "ease-out" }
                    );
                }, { margin: "-100px" });
            }
        });

        document.querySelectorAll('.skill-card').forEach((card, index) => {
            if (inView) {
                inView(card, ({ target }) => {
                    animate(target, 
                        { opacity: [0, 1], y: [30, 0] },
                        { duration: 0.6, delay: index * 0.1, easing: "ease-out" }
                    );
                }, { margin: "-100px" });
            }
        });

        const heroTextElements = document.querySelectorAll('.hero-text, .hero-btns, .social-links');
        heroTextElements.forEach(el => {
            if (inView) {
                inView(el, ({ target }) => {
                    animate(target,
                        { opacity: [0, 1], scale: [0.9, 1] },
                        { duration: 0.8, easing: "ease-out" }
                    );
                }, { margin: "-200px" });
            }
        });

        if (backToTop) {
            backToTop.addEventListener('mouseenter', () => {
                animate(backToTop, 
                    { scale: [1, 1.2], rotate: [0, 360] },
                    { duration: 0.4, easing: "spring" }
                );
            });

            backToTop.addEventListener('mouseleave', () => {
                animate(backToTop, 
                    { scale: [1.2, 1], rotate: [360, 0] },
                    { duration: 0.4, easing: "spring" }
                );
            });
        }

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('mouseenter', () => {
                animate(link,
                    { color: ["#ffffff", "#cccccc", "#ffffff"] },
                    { duration: 0.3, easing: "ease-in-out" }
                );
            });
        });

        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                animate(btn,
                    { scale: [1, 1.05], y: [0, -3] },
                    { duration: 0.3, easing: "spring" }
                );
            });

            btn.addEventListener('mouseleave', () => {
                animate(btn,
                    { scale: [1.05, 1], y: [0, 0] },
                    { duration: 0.3, easing: "spring" }
                );
            });
        });
    }

    const phrases = ['UI/UX Engineer', 'Product Designer', 'Frontend Developer'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typedText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typedText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        navItems.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            if (section) {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                const scrollPosition = window.scrollY;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navItems.forEach(item => item.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });

        animateOnScroll(skillCards);
        animateOnScroll(projectCards);
        animateStats();
    });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    function animateOnScroll(elements) {
        elements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                setTimeout(() => {
                    element.classList.add('animated');
                }, index * 100);
            }
        });
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                if (entry.target.classList.contains('skill-card')) {
                    const progressBar = entry.target.querySelector('.skill-progress');
                    const width = progressBar.getAttribute('data-width');
                    setTimeout(() => {
                        progressBar.style.width = width + '%';
                    }, 300);
                }
            }
        });
    }, observerOptions);

    skillCards.forEach(card => observer.observe(card));
    projectCards.forEach(card => observer.observe(card));

    function animateStats() {
        statNumbers.forEach(stat => {
            const rect = stat.getBoundingClientRect();
            if (rect.top < window.innerHeight && !stat.classList.contains('counted')) {
                stat.classList.add('counted');
                const target = parseInt(stat.getAttribute('data-target'));
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current);
                    }
                }, 40);
            }
        });
    }

    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavOnScroll() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
            btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
                contactForm.reset();
            }, 2000);
        }, 1500);
    });

    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const projectImages = document.querySelectorAll('.project-image img');
    
    projectImages.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transition = 'transform 0.5s ease';
        });
    });

    let scrollPosition = 0;
    
    window.addEventListener('scroll', () => {
        scrollPosition = window.scrollY;
        
        const hero = document.querySelector('.hero');
        if (hero) {
            const opacity = 1 - (scrollPosition / 600);
            hero.style.opacity = Math.max(0, opacity);
        }
    });

    console.log('Portfolio loaded successfully!');
});
