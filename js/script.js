document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------
       1. ANIMATED STAT COUNTERS (hero section)
    ----------------------------------------------- */
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    counters.forEach(counter => {
        const animate = () => {
            const value = +counter.getAttribute('data-target');
            const data = +counter.innerText.replace(/,/g, '');
            const time = value / speed;
            if (data < value) {
                counter.innerText = Math.ceil(data + time);
                setTimeout(animate, 20);
            } else {
                counter.innerText = value.toLocaleString();
            }
        };
        animate();
    });

    /* -----------------------------------------------
       2. SCROLL-TRIGGERED FADE-UP REVEAL
    ----------------------------------------------- */
    const fadeElements = document.querySelectorAll('.fade-up');
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger siblings in the same row
                const parent = entry.target.parentElement;
                const siblings = parent ? [...parent.querySelectorAll('.fade-up')] : [];
                const index = siblings.indexOf(entry.target);
                const delay = index >= 0 ? index * 80 : 0;

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    });

    fadeElements.forEach(element => fadeObserver.observe(element));

    /* -----------------------------------------------
       3. NAVBAR: shadow + blur on scroll
    ----------------------------------------------- */
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const toggleScrolled = () => {
            navbar.classList.toggle('is-scrolled', window.scrollY > 12);
        };
        toggleScrolled();
        window.addEventListener('scroll', toggleScrolled, { passive: true });
    }

    /* -----------------------------------------------
       4. NAVBAR: auto-close mobile menu
    ----------------------------------------------- */
    const mainNav = document.getElementById('mainNav');
    if (mainNav && window.bootstrap) {
        const navLinks = mainNav.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-item, .client-portal, .btn-primary-dark');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('show')) {
                    const collapseInstance = bootstrap.Collapse.getOrCreateInstance(mainNav);
                    collapseInstance.hide();
                }
            });
        });
    }

    /* -----------------------------------------------
       5. SCROLL-TO-TOP BUTTON
    ----------------------------------------------- */
    const scrollBtn = document.createElement('button');
    scrollBtn.classList.add('scroll-top-btn');
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        scrollBtn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* -----------------------------------------------
       6. MAGNETIC HOVER ON CTA BUTTONS
       Subtle magnetic pull for premium feel
    ----------------------------------------------- */
    const magneticBtns = document.querySelectorAll('.btn-primary-dark, .btn-teal, .btn-outline-path');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px) translateY(-2px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    /* -----------------------------------------------
       7. PATH CARD 3D TILT ON HOVER
    ----------------------------------------------- */
    const pathCards = document.querySelectorAll('.path-card');

    pathCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const rotateX = (0.5 - y) * 8;
            const rotateY = (x - 0.5) * 8;
            card.style.transform = `translateY(-8px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease, box-shadow 0.45s ease';
        });
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'border-color 0.35s ease, box-shadow 0.45s ease';
        });
    });

    /* -----------------------------------------------
       8. SERVICE CARD 3D TILT ON HOVER
    ----------------------------------------------- */
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const rotateX = (0.5 - y) * 5;
            const rotateY = (x - 0.5) * 5;
            card.style.transform = `translateY(-12px) scale(1.01) perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s ease';
        });
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'box-shadow 0.45s ease';
        });
    });

    /* -----------------------------------------------
       9. INSIGHT CARD IMAGE PARALLAX
    ----------------------------------------------- */
    const insightCards = document.querySelectorAll('.insight-card');

    insightCards.forEach(card => {
        const img = card.querySelector('img');
        if (!img) return;
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const y = (e.clientY - rect.top) / rect.height;
            const shift = (y - 0.5) * -12;
            img.style.transform = `scale(1.06) translateY(${shift}px)`;
        });
        card.addEventListener('mouseleave', () => {
            img.style.transform = '';
            img.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease';
        });
        card.addEventListener('mouseenter', () => {
            img.style.transition = 'filter 0.4s ease';
        });
    });

    /* -----------------------------------------------
       10. PROCESS STEP SEQUENTIAL GLOW
       When hovering a step, animate arrows too
    ----------------------------------------------- */
    const processSteps = document.querySelectorAll('.process-step');
    const stepArrows = document.querySelectorAll('.step-arrow');

    processSteps.forEach((step, i) => {
        step.addEventListener('mouseenter', () => {
            stepArrows.forEach((arrow, j) => {
                if (j < i) {
                    arrow.style.color = 'rgba(1, 168, 204, 0.5)';
                } else if (j === i) {
                    arrow.style.color = 'var(--accent-teal)';
                }
            });
        });
        step.addEventListener('mouseleave', () => {
            stepArrows.forEach(arrow => { arrow.style.color = ''; });
        });
    });

    /* -----------------------------------------------
       11. TRUST CARD STAR WAVE ON HOVER
    ----------------------------------------------- */
    // Already handled purely in CSS

    /* -----------------------------------------------
       12. FOOTER LINK STAGGER ON SECTION ENTER
    ----------------------------------------------- */
    const footerLists = document.querySelectorAll('.footer-links');
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('li');
                items.forEach((item, i) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(12px)';
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.25s ease, padding-left 0.25s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, i * 60 + 200);
                });
                footerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    footerLists.forEach(list => footerObserver.observe(list));

    /* -----------------------------------------------
       13. COMP SERVICE ITEMS STAGGER REVEAL
    ----------------------------------------------- */
    const compItems = document.querySelectorAll('.comp-service-item');
    const compObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const allItems = [...document.querySelectorAll('.comp-service-item')];
                const index = allItems.indexOf(entry.target);
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 80);
                compObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    compItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.35s ease, box-shadow 0.35s ease';
        compObserver.observe(item);
    });

});