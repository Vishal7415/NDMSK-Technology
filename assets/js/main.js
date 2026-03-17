/* ============================================================
   NDMSK Technology — main.js
   All interactive behaviors: AOS, navbar, carousel, counters,
   particles, smooth scroll, back-to-top
   ============================================================ */

(function () {
    'use strict';

    /* ── PRELOADER ──────────────────────────────────────────── */
    window.addEventListener('load', function () {
        setTimeout(function () {
            var preloader = document.getElementById('preloader');
            if (preloader) preloader.classList.add('hidden');
        }, 1500);
    });

    /* ── AOS (Animate On Scroll) ────────────────────────────── */
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: false,
            mirror: true,
            offset: 50,
            anchorPlacement: 'top-bottom'
        });
    }

    /* ── SCROLL PROGRESS BAR ────────────────────────────────── */
    var progressBar = document.getElementById('scroll-progress');
    function updateScrollProgress() {
        if (!progressBar) return;
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = pct + '%';
    }

    /* ── NAVBAR SCROLL BEHAVIOR ─────────────────────────────── */
    var navbar = document.getElementById('navbar');
    var backToTop = document.getElementById('back-to-top');

    function handleScroll() {
        var scrollY = window.scrollY;

        // Navbar glassmorphism
        if (navbar) {
            if (scrollY > 60) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Back to top
        if (backToTop) {
            if (scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }

        // Active nav link
        updateActiveNav();

        // Scroll progress
        updateScrollProgress();
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    /* ── ACTIVE NAV LINK ────────────────────────────────────── */
    function updateActiveNav() {
        var sections = document.querySelectorAll('section[id]');
        var navLinks = document.querySelectorAll('.navbar-menu a');
        var scrollPos = window.scrollY + 120;
        var currentPath = window.location.pathname.split('/').pop() || 'index.html';

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(function (link) {
                    var href = link.getAttribute('href');
                    // Only update active state if the link is an anchor on the current page
                    if (href === '#' + id || (currentPath === 'index.html' && href === 'index.html#' + id)) {
                        navLinks.forEach(function (l) { l.classList.remove('active'); });
                        link.classList.add('active');
                    }
                });
            }
        });

        // Ensure current page link is active if no section is matched (or always for sub-pages)
        if (currentPath !== 'index.html') {
            navLinks.forEach(function (link) {
                if (link.getAttribute('href') === currentPath) {
                    link.classList.add('active');
                }
            });
        }
    }

    /* ── MOBILE MENU TOGGLE ─────────────────────────────────── */
    var toggleBtn = document.getElementById('navbar-toggle');
    var navMenu = document.getElementById('navbar-menu');

    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener('click', function () {
            navMenu.classList.toggle('open');
            toggleBtn.classList.toggle('active');
        });

        // Close on nav link click
        navMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('open');
                toggleBtn.classList.remove('active');
            });
        });
    }

    /* ── SMOOTH SCROLL ──────────────────────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var href = anchor.getAttribute('href');
            if (href.length <= 1) return;
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                var offset = 80;
                var targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    });

    /* ── BACK TO TOP ────────────────────────────────────────── */
    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ── COUNTER ANIMATION ──────────────────────────────────── */
    function animateCounter(el) {
        var target = parseInt(el.getAttribute('data-target'), 10) || 0;
        var suffix = el.getAttribute('data-suffix') || '';
        var duration = 2000;
        var step = target / (duration / 16);
        var current = 0;

        var timer = setInterval(function () {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(current).toLocaleString() + suffix;
        }, 16);
    }

    // Intersection Observer for counters
    var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter').forEach(function (el) {
        counterObserver.observe(el);
    });

    /* ── TESTIMONIALS CAROUSEL ──────────────────────────────── */
    var track = document.querySelector('.testimonials-track');
    var prevBtn = document.querySelector('.carousel-prev');
    var nextBtn = document.querySelector('.carousel-next');
    var dots = document.querySelectorAll('.carousel-dot');

    if (track) {
        var cards = track.querySelectorAll('.testimonial-card');
        var totalCards = cards.length;
        var currentIndex = 0;
        var cardWidth = 0;
        var autoTimer = null;

        function getCardWidth() {
            if (cards[0]) {
                return cards[0].offsetWidth + 24; // card + gap
            }
            return 384;
        }

        function goTo(index) {
            if (index < 0) index = 0;
            if (index > totalCards - 1) index = 0;
            currentIndex = index;
            cardWidth = getCardWidth();
            var offset = currentIndex * cardWidth;
            // Clamp offset so we don't scroll past the end
            var maxOffset = (totalCards - Math.floor(track.parentElement.offsetWidth / cardWidth)) * cardWidth;
            if (maxOffset < 0) maxOffset = 0;
            if (offset > maxOffset) { offset = maxOffset; currentIndex = totalCards - 1; }
            track.style.transform = 'translateX(-' + offset + 'px)';
            dots.forEach(function (dot, i) {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        function autoPlay() {
            autoTimer = setInterval(function () {
                var next = currentIndex + 1;
                if (next >= totalCards) next = 0;
                goTo(next);
            }, 4000);
        }

        function stopAuto() { clearInterval(autoTimer); }

        if (prevBtn) prevBtn.addEventListener('click', function () { stopAuto(); goTo(currentIndex - 1); autoPlay(); });
        if (nextBtn) nextBtn.addEventListener('click', function () { stopAuto(); goTo(currentIndex + 1); autoPlay(); });

        dots.forEach(function (dot, i) {
            dot.addEventListener('click', function () { stopAuto(); goTo(i); autoPlay(); });
        });

        window.addEventListener('resize', function () { goTo(currentIndex); });
        goTo(0);
        autoPlay();

        // Touch/swipe support
        var startX = 0;
        track.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; stopAuto(); }, { passive: true });
        track.addEventListener('touchend', function (e) {
            var diff = startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                goTo(diff > 0 ? currentIndex + 1 : currentIndex - 1);
            }
            autoPlay();
        });
    }

    /* ── FLOATING PARTICLES (HERO) ───────────────────────────── */
    var particlesContainer = document.querySelector('.hero-particles');
    if (particlesContainer) {
        var colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#ec4899', '#10b981'];
        for (var i = 0; i < 40; i++) {
            (function (idx) {
                var dot = document.createElement('div');
                dot.className = 'particle';
                dot.style.left = Math.random() * 100 + '%';
                dot.style.top = Math.random() * 100 + '%';
                dot.style.background = colors[idx % colors.length];
                dot.style.width = (Math.random() * 3 + 1) + 'px';
                dot.style.height = dot.style.width;
                dot.style.animationDuration = (Math.random() * 8 + 4) + 's';
                dot.style.animationDelay = (Math.random() * 6) + 's';
                particlesContainer.appendChild(dot);
            })(i);
        }
    }

    /* ── SERVICE CARDS 3D TILT & REFLECTION ──────────────────── */
    document.querySelectorAll('.service-card, .course-card').forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;

            // 3D Tilt
            var cx = rect.width / 2;
            var cy = rect.height / 2;
            var maxTilt = 6;
            var tiltX = ((y - cy) / cy) * maxTilt;
            var tiltY = ((cx - x) / cx) * maxTilt;
            card.style.transform = 'translateY(-8px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg)';

            // Reflection position
            card.style.setProperty('--x', (x / rect.width * 100) + '%');
            card.style.setProperty('--y', (y / rect.height * 100) + '%');
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = '';
        });
    });

    /* ── CONTACT FORM ────────────────────────────────────────── */
    var contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var btn = contactForm.querySelector('.submit-btn');
            var originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            btn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';
            setTimeout(function () {
                btn.innerHTML = originalText;
                btn.style.background = '';
                contactForm.reset();
            }, 3000);
        });
    }

    /* ── ANIMATE ON SCROLL (fallback Intersection Observer) ─── */
    var scrollObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px 0px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
        scrollObserver.observe(el);
    });

    /* ── YEAR IN FOOTER ──────────────────────────────────────── */
    var yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ── TYPING EFFECT FOR HERO ──────────────────────────────── */
    var typingEl = document.getElementById('typing-text');
    if (typingEl) {
        var words = ['AI Solutions', 'Web Development', 'Mobile Apps', 'SaaS Products'];
        var wordIdx = 0;
        var charIdx = 0;
        var deleting = false;
        var speed = 120;

        function type() {
            var word = words[wordIdx];
            if (!deleting) {
                typingEl.textContent = word.substring(0, charIdx + 1);
                charIdx++;
                if (charIdx === word.length) {
                    deleting = true;
                    setTimeout(type, 1800);
                    return;
                }
            } else {
                typingEl.textContent = word.substring(0, charIdx - 1);
                charIdx--;
                if (charIdx === 0) {
                    deleting = false;
                    wordIdx = (wordIdx + 1) % words.length;
                    setTimeout(type, 400);
                    return;
                }
            }
            setTimeout(type, deleting ? 60 : speed);
        }

        type();
    }

    /* ── CUSTOM CURSOR LOGIC ─────────────────────────────────── */
    function initCustomCursor() {
        if (window.innerWidth < 1024) return;

        const cursor = document.createElement('div');
        const cursorOutline = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursorOutline.className = 'custom-cursor-outline';
        document.body.appendChild(cursor);
        document.body.appendChild(cursorOutline);

        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;
        let isSticky = false;
        let stickyElement = null;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.transform = `translate3d(${mouseX - 5}px, ${mouseY - 5}px, 0)`;
        });

        function animateCursor() {
            if (isSticky && stickyElement) {
                const rect = stickyElement.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                outlineX += (centerX - outlineX) * 0.3;
                outlineY += (centerY - outlineY) * 0.3;

                cursorOutline.style.width = `${rect.width + 10}px`;
                cursorOutline.style.height = `${rect.height + 10}px`;
                cursorOutline.style.borderRadius = getComputedStyle(stickyElement).borderRadius;
                cursorOutline.style.transform = `translate3d(${outlineX - (rect.width + 10) / 2}px, ${outlineY - (rect.height + 10) / 2}px, 0)`;
            } else {
                outlineX += (mouseX - outlineX) * 0.25;
                outlineY += (mouseY - outlineY) * 0.25;

                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.borderRadius = '50%';
                cursorOutline.style.transform = `translate3d(${outlineX - 20}px, ${outlineY - 20}px, 0)`;
            }

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover states & Sticky logic
        const interactiveElements = document.querySelectorAll('a, button, .service-card, .course-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
                if (el.classList.contains('magnetic')) {
                    isSticky = true;
                    stickyElement = el;
                }
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
                isSticky = false;
                stickyElement = null;
            });
        });
    }

    /* ── MAGNETIC EFFECT LOGIC ───────────────────────────────── */
    function initMagneticEffect() {
        const magneticElements = document.querySelectorAll('.magnetic');

        magneticElements.forEach(el => {
            el.addEventListener('mousemove', function (e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                this.style.transform = `translate3d(${x * 0.3}px, ${y * 0.3}px, 0)`;
            });

            el.addEventListener('mouseleave', function () {
                this.style.transform = 'translate3d(0, 0, 0)';
            });
        });
    }

    // Initialize premium effects
    initCustomCursor();
    initMagneticEffect();

})();
