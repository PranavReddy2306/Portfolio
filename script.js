/**
 * Kandi Pranav Reddy Portfolio - Interactive Features
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LIGHTWEIGHT CANVAS PARTICLES BACKGROUND ---
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    
    let particlesArray = [];
    let mouse = {
        x: null,
        y: null,
        radius: 100
    };

    // Track mouse position
    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    // Reset mouse pos on leave
    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Resize canvas dynamically
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }
    window.addEventListener('resize', resizeCanvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle Object Definition
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }

        // Draw particle
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        // Update particle physics
        update() {
            // Collision detection at boundary
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }

            // Mouse interact gravity effect
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius + this.size) {
                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                    this.x += 2;
                }
                if (mouse.x > this.x && this.x > this.size * 10) {
                    this.x -= 2;
                }
                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                    this.y += 2;
                }
                if (mouse.y > this.y && this.y > this.size * 10) {
                    this.y -= 2;
                }
            }

            // Standard movement
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    // Populate particles density adjusted
    function initParticles() {
        particlesArray = [];
        let numberOfParticles = Math.min((canvas.width * canvas.height) / 9000, 100);
        
        for (let i = 0; i < numberOfParticles; i++) {
            let size = Math.random() * 2 + 1;
            let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
            let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
            
            // Random direction values
            let directionX = (Math.random() * 0.4) - 0.2;
            let directionY = (Math.random() * 0.4) - 0.2;
            
            // Color with theme accents (semi-transparent purple/indigo/cyan)
            let colors = ['rgba(99,102,241,0.2)', 'rgba(168,85,247,0.2)', 'rgba(6,182,212,0.2)'];
            let color = colors[Math.floor(Math.random() * colors.length)];
            
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    // Particle connecting lines
    function connectParticles() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    opacityValue = 1 - (distance / 120);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${opacityValue * 0.08})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation Loop
    function animateParticles() {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connectParticles();
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();


    // --- 2. TEXT TYPING EFFECT ---
    const typedTextSpan = document.getElementById('typed-text');
    const roles = ["Full Stack Developer", "Python Developer", "Teaching Assistant", "Data Science Enthusiast"];
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const newTextDelay = 2000;
    let roleIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < roles[roleIndex].length) {
            typedTextSpan.textContent += roles[roleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = roles[roleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            roleIndex++;
            if (roleIndex >= roles.length) roleIndex = 0;
            setTimeout(type, typingSpeed + 500);
        }
    }

    // Initialize typing
    if (roles.length) setTimeout(type, 1000);


    // --- 3. RESPONSIVE MOBILE NAVIGATION DRAWER ---
    const menuBtn = document.getElementById('menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-links a');

    menuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Toggle Hamburger icon look optionally
    });

    // Close menu when links are clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });


    // --- 4. NAVIGATION ACTIVE SCAN ON SCROLL & STICKY STYLING ---
    const sections = document.querySelectorAll('section');
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        // Sticky Navbar Toggle
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Navigation Links based on Scroll Position
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

        // Floating Back-to-Top Button Toggle
        const scrollTopBtn = document.getElementById('scroll-to-top');
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Scroll to Top Smoothly
    document.getElementById('scroll-to-top').addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // --- 5. INTERSECTION OBSERVER SCROLL REVEAL ANIMATIONS ---
    const reveals = document.querySelectorAll('.reveal');
    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Specific action: Trigger skill-bar progress load
                if (entry.target.classList.contains('skill-category-card')) {
                    const skillBars = entry.target.querySelectorAll('.skill-bar');
                    skillBars.forEach(bar => {
                        const targetPercent = bar.getAttribute('data-percent');
                        bar.style.width = targetPercent;
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    reveals.forEach(element => {
        revealObserver.observe(element);
    });


    // --- 6. PROJECTS INTERACTIVE FILTERS ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active states from buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category') || '';
                const categories = cardCategory.split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    // Retrigger animation subtly
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });


    // --- 7. PROJECT DETAILS MODAL COMPONENT DATA ---
    const projectsData = {
        'sentiment-analysis': {
            title: 'Multimodal Sentiment Analysis',
            tags: ['Python', 'Data Science', 'Machine Learning', 'TensorFlow', 'Speech Processing'],
            desc: 'Developed a cutting-edge multimodal sentiment analysis system that merges text semantics, micro-expression facial maps, and speech inflections into a single emotion vector. This unified dataset produces a highly sophisticated context-aware sentiment classifier that outpaces text-only engines by a significant margin.',
            features: [
                'Engineered multimodal pipelines integrating text networks, OpenCV facial mapping, and Librosa acoustic feature managers.',
                'Boosted classification fidelity by combining speech frequencies, sentence contextual meanings, and video frames.',
                'Optimized real-time evaluation frames, resulting in context-aware emotion detection with ultra-low compute pipelines.',
                'Applicable for advanced brand sentiment tracking, automated customer assistance, and remote psychological assessments.'
            ],
            liveLink: null,
            sourceLink: 'https://github.com/PranavReddy2306',
            graphicSVG: `
                <svg class="modal-graphic" viewBox="0 0 100 100">
                    <rect x="20" y="20" width="60" height="60" rx="12" fill="none" stroke="url(#modal-grad)" stroke-width="2" />
                    <circle cx="50" cy="50" r="18" fill="rgba(168, 85, 247, 0.15)" stroke="#06b6d4" stroke-width="2" />
                    <path d="M 38 48 Q 50 60 62 48" stroke="#f8fafc" stroke-width="2.5" stroke-linecap="round" fill="none" />
                    <circle cx="42" cy="42" r="3" fill="#06b6d4" />
                    <circle cx="58" cy="42" r="3" fill="#06b6d4" />
                    <!-- Ambient tech points -->
                    <circle cx="20" cy="50" r="2" fill="#6366f1" />
                    <circle cx="80" cy="50" r="2" fill="#6366f1" />
                </svg>
            `
        },
        'canteen-website': {
            title: "Vignan's Canteen Portal",
            tags: ['Node.js', 'Express', 'JavaScript', 'HTML5', 'CSS3', 'Session Management'],
            desc: "Designed and implemented a full-stack canteen management platform tailored for university students. The platform replaces slow, manual queues with an interactive checkout funnel, dynamic product listing grids, and instant status updates, facilitating seamless orders across diverse devices.",
            features: [
                'Designed a fully responsive frontend layout using custom HTML, CSS variables, and modern Javascript utilities.',
                'Engineered a robust backend router in Node.js to manage food item states, session tokens, and cart additions.',
                'Implemented real-time order lists, allowing students to check preparation queues instantly.',
                'Configured input sanitization checks, parameter validations, and error catching for reliable runtime performance.',
                'Focused on premium UI design and layout metrics to enhance user engagement.'
            ],
            liveLink: 'http://www.vignanscanteen.com',
            sourceLink: 'https://github.com/PranavReddy2306',
            graphicSVG: `
                <svg class="modal-graphic" viewBox="0 0 100 100">
                    <rect x="15" y="25" width="70" height="50" rx="8" fill="none" stroke="url(#modal-grad)" stroke-width="2" />
                    <rect x="25" y="15" width="50" height="10" rx="3" fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" stroke-width="1.5" />
                    <line x1="25" y1="40" x2="60" y2="40" stroke="#06b6d4" stroke-width="2" stroke-linecap="round" />
                    <line x1="25" y1="50" x2="50" y2="50" stroke="#06b6d4" stroke-width="2" stroke-linecap="round" />
                    <line x1="25" y1="60" x2="40" y2="60" stroke="#a855f7" stroke-width="2" stroke-linecap="round" />
                    <!-- Shopping cart badge graphic -->
                    <circle cx="70" cy="50" r="8" fill="#06b6d4" />
                    <path d="M 67 50 L 69 52 L 73 48" stroke="#070a13" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                </svg>
            `
        },
        'crimeshield-suite': {
            title: 'CRIMEShield Suite',
            tags: ['React.js', 'Tailwind CSS', 'Leaflet Maps', 'Python Flask', 'Firebase Firestore', 'K-Means Clustering', 'Random Forest Regression'],
            desc: 'CRIMEShield Suite is a web-based crime data visualization and predictive analytics platform developed to assist law enforcement agencies in analyzing crime patterns and identifying high-risk areas. The system integrates React.js, Tailwind CSS, Leaflet Maps, Python Flask, Firebase Firestore, and Machine Learning algorithms to provide real-time crime monitoring and forecasting capabilities.',
            features: [
                'Utilized K-Means Clustering algorithms for dynamic crime hotspot detection and spatial pattern rendering.',
                'Implemented Random Forest Regression models to forecast future crime rate trends and temporal growth.',
                'Integrated Leaflet Maps with React to visualize crime incident locations and density clusters interactively.',
                'Engineered real-time data synchronization pipelines between client applications and Firebase Firestore.',
                'Supported bulk crime data uploads via CSV file parsers, which automatically initiate machine learning retraining pipelines.'
            ],
            liveLink: null,
            sourceLink: 'https://github.com/PranavReddy2306',
            graphicSVG: `
                <svg class="modal-graphic" viewBox="0 0 100 100">
                    <!-- Shield Background Grid -->
                    <path d="M 25 25 L 50 12 L 75 25 C 75 58, 50 88, 50 88 C 50 88, 25 58, 25 25 Z" fill="rgba(99, 102, 241, 0.05)" stroke="url(#modal-grad)" stroke-width="2.5" />
                    <!-- Radar Scanning Arc -->
                    <circle cx="50" cy="45" r="20" fill="none" stroke="rgba(6, 182, 212, 0.2)" stroke-width="1" />
                    <circle cx="50" cy="45" r="12" fill="none" stroke="rgba(6, 182, 212, 0.2)" stroke-width="1" />
                    <!-- Grid lines inside shield -->
                    <line x1="30" y1="35" x2="70" y2="35" stroke="rgba(255, 255, 255, 0.05)" stroke-width="1" />
                    <line x1="26" y1="50" x2="74" y2="50" stroke="rgba(255, 255, 255, 0.05)" stroke-width="1" />
                    <line x1="30" y1="65" x2="70" y2="65" stroke="rgba(255, 255, 255, 0.05)" stroke-width="1" />
                    <!-- Hotspots with glowing circles -->
                    <circle cx="50" cy="45" r="4" fill="#ef4444" />
                    <circle cx="50" cy="45" r="10" fill="none" stroke="#ef4444" stroke-width="1.5" opacity="0.6">
                        <animate attributeName="r" values="4;12;4" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="40" cy="55" r="3" fill="#f97316" />
                    <circle cx="60" cy="38" r="3.5" fill="#eab308" />
                    <!-- Connections -->
                    <path d="M 50 45 L 40 55 M 50 45 L 60 38" stroke="#06b6d4" stroke-width="1.5" stroke-dasharray="3 3" />
                    <!-- Target Reticle Corners -->
                    <path d="M 15 20 H 22 V 27" fill="none" stroke="#06b6d4" stroke-width="1.5" />
                    <path d="M 85 20 H 78 V 27" fill="none" stroke="#06b6d4" stroke-width="1.5" />
                    <path d="M 15 80 H 22 V 73" fill="none" stroke="#06b6d4" stroke-width="1.5" />
                    <path d="M 85 80 H 78 V 73" fill="none" stroke="#06b6d4" stroke-width="1.5" />
                </svg>
            `
        }
    };

    // Modal elements
    const modal = document.getElementById('project-details-modal');
    const modalOverlay = document.getElementById('modal-overlay-bg');
    const modalCloseIcon = document.getElementById('modal-close-icon');
    const modalGraphicTarget = document.getElementById('modal-graphic-target');
    const modalTagsTarget = document.getElementById('modal-tags-target');
    const modalTitleTarget = document.getElementById('modal-title-target');
    const modalDescTarget = document.getElementById('modal-desc-target');
    const modalFeaturesTarget = document.getElementById('modal-features-target');
    const modalLinkLive = document.getElementById('modal-link-live');
    const modalLinkSource = document.getElementById('modal-link-source');

    // Open Modal Function
    function openModal(projectId) {
        const data = projectsData[projectId];
        if (!data) return;

        // Inject SVG Gradient dynamic reference
        modalGraphicTarget.innerHTML = `
            <svg style="position: absolute; width: 0; height: 0;">
                <defs>
                    <linearGradient id="modal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#6366f1" />
                        <stop offset="100%" stop-color="#a855f7" />
                    </linearGradient>
                </defs>
            </svg>
            ${data.graphicSVG}
        `;

        // Inject tags
        modalTagsTarget.innerHTML = '';
        data.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'project-tag';
            span.textContent = tag;
            modalTagsTarget.appendChild(span);
        });

        // Set Texts
        modalTitleTarget.textContent = data.title;
        modalDescTarget.textContent = data.desc;

        // Ingest accomplishments
        modalFeaturesTarget.innerHTML = '';
        data.features.forEach(feat => {
            const li = document.createElement('li');
            li.textContent = feat;
            modalFeaturesTarget.appendChild(li);
        });

        // Manage Link states
        if (data.liveLink) {
            modalLinkLive.setAttribute('href', data.liveLink);
            modalLinkLive.style.display = 'inline-flex';
        } else {
            modalLinkLive.style.display = 'none';
        }

        if (data.sourceLink) {
            modalLinkSource.setAttribute('href', data.sourceLink);
            modalLinkSource.style.display = 'inline-flex';
        } else {
            modalLinkSource.style.display = 'none';
        }

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock main scroll
    }

    // Close Modal Function
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Unlock scroll
    }

    // Attach click events on project cards
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project-id');
            openModal(projectId);
        });
    });

    // Close on triggers
    modalCloseIcon.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });


    // --- 8. TRANSLUCENT FORM HANDLING & TOAST FEEDBACK ---
    const contactForm = document.getElementById('portfolio-form');
    const toaster = document.getElementById('toaster');

    function triggerToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="toast-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 8 8 12 12 16"></polyline><line x1="16" y1="12" x2="8" y2="12"></line></svg>
            </div>
            <div class="toast-message">${message}</div>
        `;
        
        // Custom checkmark svg inside toast
        toast.querySelector('.toast-icon').innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        `;

        toaster.appendChild(toast);

        // Slide in
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        // Slide out and remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 500);
        }, 4000);
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Grab inputs
        const nameVal = document.getElementById('user-name').value.trim();
        const emailVal = document.getElementById('user-email').value.trim();
        const subjectVal = document.getElementById('msg-subject').value.trim();
        const bodyVal = document.getElementById('msg-body').value.trim();

        if (nameVal && emailVal && subjectVal && bodyVal) {
            // Simulate API transmission
            const submitBtn = document.getElementById('submit-btn');
            const originalContent = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                Transmitting Message...
                <svg class="spin" style="animation: spin 1s linear infinite" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
            `;

            // Inline spinner style injection helper
            if (!document.getElementById('spin-style')) {
                const style = document.createElement('style');
                style.id = 'spin-style';
                style.textContent = '@keyframes spin { 100% { transform: rotate(360deg); } }';
                document.head.appendChild(style);
            }

            setTimeout(() => {
                triggerToast(`Thank you, ${nameVal}! Your message has been sent successfully.`);
                
                // Reset Form
                contactForm.reset();
                
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalContent;
            }, 1500);
        }
    });

});
