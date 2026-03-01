/* ═══════════════════════════════════════════
   MAIN JS — Coca-Cola Portfolio
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ───────────────────────────────────────────
       1. TYPING EFFECT (Hero section)
    ─────────────────────────────────────────── */
    const typedEl = document.getElementById('typed-role');
    const roles = [
        'Frontend Developer',
        'Backend Developer',
        'UI/UX Enthusiast',
        'Creative Thinker',
        'Problem Solver',
        'Tech Explorer',
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const TYPING_SPEED = 90;
    const DELETING_SPEED = 50;
    const PAUSE_AFTER_TYPED = 2000;
    const PAUSE_AFTER_DELETED = 400;

    function typeRole() {
        const currentRole = roles[roleIndex];

        if (!isDeleting) {
            // Typing forward
            typedEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentRole.length) {
                // Finished typing — pause then start deleting
                isDeleting = true;
                setTimeout(typeRole, PAUSE_AFTER_TYPED);
                return;
            }
            setTimeout(typeRole, TYPING_SPEED);
        } else {
            // Deleting
            typedEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeRole, PAUSE_AFTER_DELETED);
                return;
            }
            setTimeout(typeRole, DELETING_SPEED);
        }
    }

    // Start typing after a small delay
    setTimeout(typeRole, 800);


    /* ───────────────────────────────────────────
       2. MOBILE MENU TOGGLE
    ─────────────────────────────────────────── */
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('.mobile-link') : [];

    function openMenu() {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (menuToggle) menuToggle.addEventListener('click', openMenu);
    if (menuClose) menuClose.addEventListener('click', closeMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });


    /* ───────────────────────────────────────────
       3. NAVBAR SCROLL BEHAVIOR
    ─────────────────────────────────────────── */
    const navbar = document.getElementById('navbar');
    let lastScrollY = 0;

    function handleNavbarScroll() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 80) {
            navbar.classList.add('shadow-md');
            navbar.classList.remove('shadow-sm');
        } else {
            navbar.classList.remove('shadow-md');
            navbar.classList.add('shadow-sm');
        }

        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });


    /* ───────────────────────────────────────────
       4. ACTIVE NAV LINK HIGHLIGHT
    ─────────────────────────────────────────── */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function setActiveLink() {
        const scrollY = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveLink, { passive: true });
    setActiveLink(); // Run on load


    /* ───────────────────────────────────────────
       5. SCROLL REVEAL — Intersection Observer
    ─────────────────────────────────────────── */
    const revealSections = document.querySelectorAll('.reveal-section');

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target); // Only reveal once
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: '0px 0px -50px 0px',
        }
    );

    revealSections.forEach(section => revealObserver.observe(section));


    /* ───────────────────────────────────────────
       6. SMOOTH SCROLL for anchor links
    ─────────────────────────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (!targetEl) return;

            e.preventDefault();

            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth',
            });
        });
    });


    /* ───────────────────────────────────────────
       7. CONTACT FORM — Minimal handler
    ─────────────────────────────────────────── */
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            // Simple feedback
            btn.innerHTML = '<i class="fa-solid fa-check mr-2"></i> Sent!';
            btn.disabled = true;
            btn.classList.add('opacity-70', 'cursor-not-allowed');

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                btn.classList.remove('opacity-70', 'cursor-not-allowed');
                this.reset();
            }, 2500);
        });
    }


    /* ───────────────────────────────────────────
       8. STAGGER ANIMATION for card grids
    ─────────────────────────────────────────── */
    const staggerItems = document.querySelectorAll('.project-card, .skill-card, .experience-card');

    const staggerObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    // Add a staggered delay
                    entry.target.style.transitionDelay = `${i * 80}ms`;
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    staggerObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.05 }
    );

    staggerItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(24px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        staggerObserver.observe(item);
    });


    /* ───────────────────────────────────────────
       9. DARK MODE TOGGLE
    ─────────────────────────────────────────── */
    const darkToggle = document.getElementById('dark-toggle');
    const htmlEl = document.documentElement;

    // Determine initial theme
    function getStoredTheme() {
        return localStorage.getItem('theme');
    }

    function applyTheme(theme) {
        if (theme === 'dark') {
            htmlEl.classList.add('dark');
        } else {
            htmlEl.classList.remove('dark');
        }
    }

    // Initialize: check localStorage → system preference → default light
    const storedTheme = getStoredTheme();
    if (storedTheme) {
        applyTheme(storedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme('dark');
    }

    // Toggle on click
    if (darkToggle) {
        darkToggle.addEventListener('click', () => {
            const isDark = htmlEl.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }


    /* ───────────────────────────────────────────
       10. FLOATING MUSIC PLAYER
       ─ Playlist menggunakan file dari folder assets/
       ─ Untuk menambah/mengganti lagu, edit array "playlist" di bawah.
    ─────────────────────────────────────────── */
    const floatingPlayer = document.getElementById('floating-music-player');
    const floatingAudio = document.getElementById('floating-audio');
    const floatingMusicToggle = document.getElementById('floating-music-toggle');
    const floatingMusicIcon = document.getElementById('floating-music-icon');
    const musicTrackName = document.getElementById('music-track-name');
    const musicExpandToggle = document.getElementById('music-expand-toggle');
    const musicExpandIcon = document.getElementById('music-expand-icon');
    const musicPrev = document.getElementById('music-prev');
    const musicNext = document.getElementById('music-next');
    const musicTrackArtist = document.getElementById('music-track-artist');

    // ── Playlist: tambah / hapus lagu di sini ──
    const playlist = [
        { title: 'But If You Go',       artist: 'Nathaniel Constantin',  src: 'assets/But If You Go - Nathaniel Constantin.mp3' },
        { title: 'I Dont Love You',     artist: 'My Chemical Romance',   src: 'assets/I Dont Love You - My Chemical Romance.mp3' },
        { title: 'Hurricane',            artist: 'I Prevail',             src: 'assets/Hurricane - I Prevail.mp3' },
        { title: 'Ruin The Friendship',  artist: 'Taylor Swift',           src: 'assets/Ruin The Friendship.mp3' },
        { title: 'Teardrops',            artist: 'Bring Me the Horizon',  src: 'assets/Teardrops - Bring Me the Horizon.mp3' },
        { title: 'Waiting Room',         artist: 'Phoebe Bridgers',       src: 'assets/Waiting Room - Phoebe Bridgers.mp3' },
        { title: 'xx',                   artist: 'The Millenial Club',    src: 'assets/xx - The Millenial Club.mp3' },
        { title: 'Enchanted',            artist: 'Taylor Swift',          src: 'assets/Taylor Swift - Enchanted.mp3' },
    ];

    let currentTrackIndex = 0;

    /* — helpers — */

    function loadTrack(index) {
        if (!floatingAudio || !playlist.length) return;
        currentTrackIndex = ((index % playlist.length) + playlist.length) % playlist.length;
        const track = playlist[currentTrackIndex];
        floatingAudio.src = track.src;
        floatingAudio.load();
        if (musicTrackName) musicTrackName.textContent = track.title;
        if (musicTrackArtist) musicTrackArtist.textContent = track.artist;
    }

    function syncFloatingPlayerUI(isPlaying) {
        if (!floatingPlayer || !floatingMusicToggle || !floatingMusicIcon) return;
        floatingPlayer.classList.toggle('is-playing', isPlaying);
        floatingMusicToggle.setAttribute('aria-pressed', String(isPlaying));
        floatingMusicToggle.setAttribute('aria-label', isPlaying ? 'Pause music' : 'Play music');
        // Switch icon class: fa-play ↔ fa-pause
        floatingMusicIcon.className = isPlaying
            ? 'fa-solid fa-pause'
            : 'fa-solid fa-play';
    }

    async function playCurrentTrack() {
        try {
            await floatingAudio.play();
            syncFloatingPlayerUI(true);
        } catch (_) {
            syncFloatingPlayerUI(false);
        }
    }

    /* — init — */

    if (floatingAudio && floatingMusicToggle) {
        loadTrack(0);

        floatingMusicToggle.addEventListener('click', async () => {
            if (floatingAudio.paused) {
                await playCurrentTrack();
            } else {
                floatingAudio.pause();
                syncFloatingPlayerUI(false);
            }
        });

        floatingAudio.addEventListener('ended', () => {
            loadTrack(currentTrackIndex + 1);
            playCurrentTrack();
        });

        floatingAudio.addEventListener('play', () => syncFloatingPlayerUI(true));
        floatingAudio.addEventListener('pause', () => syncFloatingPlayerUI(false));

        syncFloatingPlayerUI(false);
    }

    /* — Prev / Next — */

    if (musicPrev) {
        musicPrev.addEventListener('click', () => {
            const wasPlaying = floatingAudio && !floatingAudio.paused;
            loadTrack(currentTrackIndex - 1);
            if (wasPlaying) playCurrentTrack();
        });
    }

    if (musicNext) {
        musicNext.addEventListener('click', () => {
            const wasPlaying = floatingAudio && !floatingAudio.paused;
            loadTrack(currentTrackIndex + 1);
            if (wasPlaying) playCurrentTrack();
        });
    }

    /* — Progress bar — */

    const fmpProgressBar = document.getElementById('fmp-progress-bar');
    const fmpProgressFilled = document.getElementById('fmp-progress-filled');
    const fmpProgressThumb = document.getElementById('fmp-progress-thumb');
    const fmpTimeCurrent = document.getElementById('fmp-time-current');
    const fmpTimeDuration = document.getElementById('fmp-time-duration');
    let isDraggingProgress = false;

    function formatTime(seconds) {
        if (!seconds || isNaN(seconds)) return '0:00';
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return m + ':' + (s < 10 ? '0' : '') + s;
    }

    function setProgress(pct) {
        const clamped = Math.max(0, Math.min(100, pct));
        if (fmpProgressFilled) fmpProgressFilled.style.width = clamped + '%';
        if (fmpProgressThumb) fmpProgressThumb.style.left = clamped + '%';
    }

    if (floatingAudio) {
        floatingAudio.addEventListener('timeupdate', () => {
            if (isDraggingProgress) return;
            const dur = floatingAudio.duration || 0;
            const cur = floatingAudio.currentTime || 0;
            const pct = dur ? (cur / dur) * 100 : 0;
            setProgress(pct);
            if (fmpTimeCurrent) fmpTimeCurrent.textContent = formatTime(cur);
        });

        floatingAudio.addEventListener('loadedmetadata', () => {
            if (fmpTimeDuration) fmpTimeDuration.textContent = formatTime(floatingAudio.duration);
            setProgress(0);
            if (fmpTimeCurrent) fmpTimeCurrent.textContent = '0:00';
        });

        floatingAudio.addEventListener('durationchange', () => {
            if (fmpTimeDuration) fmpTimeDuration.textContent = formatTime(floatingAudio.duration);
        });
    }

    function seekToPosition(e) {
        if (!fmpProgressBar || !floatingAudio || !floatingAudio.duration) return;
        const rect = fmpProgressBar.getBoundingClientRect();
        const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        const pct = Math.max(0, Math.min(1, x / rect.width));
        floatingAudio.currentTime = pct * floatingAudio.duration;
        setProgress(pct * 100);
        if (fmpTimeCurrent) fmpTimeCurrent.textContent = formatTime(floatingAudio.currentTime);
    }

    if (fmpProgressBar) {
        // Click to seek
        fmpProgressBar.addEventListener('click', seekToPosition);

        // Drag to seek (mouse)
        fmpProgressBar.addEventListener('mousedown', (e) => {
            isDraggingProgress = true;
            fmpProgressBar.classList.add('is-dragging');
            seekToPosition(e);
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDraggingProgress) return;
            seekToPosition(e);
        });

        document.addEventListener('mouseup', () => {
            if (!isDraggingProgress) return;
            isDraggingProgress = false;
            fmpProgressBar.classList.remove('is-dragging');
        });

        // Drag to seek (touch)
        fmpProgressBar.addEventListener('touchstart', (e) => {
            isDraggingProgress = true;
            fmpProgressBar.classList.add('is-dragging');
            seekToPosition(e);
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            if (!isDraggingProgress) return;
            seekToPosition(e);
        }, { passive: true });

        document.addEventListener('touchend', () => {
            if (!isDraggingProgress) return;
            isDraggingProgress = false;
            fmpProgressBar.classList.remove('is-dragging');
        });
    }

    /* — Expand / Collapse (+/−) — */

    if (musicExpandToggle && floatingPlayer) {
        musicExpandToggle.addEventListener('click', () => {
            const isExpanded = floatingPlayer.classList.toggle('is-expanded');
            musicExpandToggle.setAttribute('aria-label', isExpanded ? 'Collapse player' : 'Expand player');
            // Toggle icon: + ↔ −
            if (musicExpandIcon) {
                musicExpandIcon.className = isExpanded
                    ? 'fa-solid fa-minus'
                    : 'fa-solid fa-plus';
            }
        });
    }


    /* ───────────────────────────────────────────
       11. CUSTOM CURSOR — Phantom Purple
       ─ Small dot follows mouse instantly.
       ─ Larger ring trails with smooth lerp.
       ─ Grows on hover over links, buttons, inputs.
       ─ Hidden on touch devices (handled by CSS).
    ─────────────────────────────────────────── */

    const cursorDot  = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');

    if (cursorDot && cursorRing) {

        let mouseX = -100, mouseY = -100;   // current mouse position
        let ringX  = -100, ringY  = -100;   // ring's lerped position
        const LERP = 0.15;                  // ring trailing speed (0–1, lower = smoother)

        // ── Update mouse position ──
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Dot follows instantly
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top  = `${mouseY}px`;

            // Show if hidden
            cursorDot.classList.remove('is-hidden');
            cursorRing.classList.remove('is-hidden');

            // ── Auto-detect background color under cursor ──
            // Temporarily hide cursor so elementFromPoint doesn't pick it
            cursorDot.style.display = 'none';
            cursorRing.style.display = 'none';
            const elUnder = document.elementFromPoint(mouseX, mouseY);
            cursorDot.style.display = '';
            cursorRing.style.display = '';

            if (elUnder) {
                const section = elUnder.closest(
                    '[data-cursor-invert], #contact, .bg-coca-red'
                );
                if (section) {
                    // Over purple/accent background → white cursor
                    cursorDot.classList.add('is-inverted');
                    cursorRing.classList.add('is-inverted');
                    cursorDot.classList.remove('is-dark-inverted');
                    cursorRing.classList.remove('is-dark-inverted');
                } else {
                    cursorDot.classList.remove('is-inverted');
                    cursorRing.classList.remove('is-inverted');
                    cursorDot.classList.remove('is-dark-inverted');
                    cursorRing.classList.remove('is-dark-inverted');
                }
            }
        });

        // ── Smooth ring animation loop ──
        function animateRing() {
            // Lerp (linear interpolation) for trailing effect
            ringX += (mouseX - ringX) * LERP;
            ringY += (mouseY - ringY) * LERP;

            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top  = `${ringY}px`;

            requestAnimationFrame(animateRing);
        }
        animateRing();

        // ── Hover detection on interactive elements ──
        const hoverTargets = document.querySelectorAll(
            'a, button, input, textarea, select, [role="button"], .btn-primary, .project-showcase, .skill-card, .social-icon, .fmp-ctrl, .fmp-play, .fmp-toggle, .fmp-logo, .nav-link, .exp-row-header'
        );

        hoverTargets.forEach((el) => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('is-hover');
                cursorRing.classList.add('is-hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('is-hover');
                cursorRing.classList.remove('is-hover');
            });
        });

        // ── Text input cursor (vertical bar) ──
        const textTargets = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
        textTargets.forEach((el) => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('is-text');
                cursorRing.classList.add('is-text');
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('is-text');
                cursorRing.classList.remove('is-text');
            });
        });

        // ── Click feedback ──
        document.addEventListener('mousedown', () => {
            cursorDot.classList.add('is-click');
            cursorRing.classList.add('is-click');
        });
        document.addEventListener('mouseup', () => {
            cursorDot.classList.remove('is-click');
            cursorRing.classList.remove('is-click');
        });

        // ── Hide when mouse leaves the window ──
        document.addEventListener('mouseleave', () => {
            cursorDot.classList.add('is-hidden');
            cursorRing.classList.add('is-hidden');
        });
    }


    /* ───────────────────────────────────────────
       12. EXPERIENCE — Premium List with Hover Preview
       ─ Click to expand/collapse details (accordion).
       ─ Hover shows floating image preview (desktop).
       ─ GSAP scroll-triggered stagger entrance.
    ─────────────────────────────────────────── */

    // ── Accordion toggle ──
    const expRows = document.querySelectorAll('.exp-row');

    expRows.forEach(row => {
        const header = row.querySelector('.exp-row-header');
        if (header) {
            header.addEventListener('click', () => {
                const isOpen = row.classList.contains('is-open');
                // Close all other rows first
                expRows.forEach(r => r.classList.remove('is-open'));
                // Toggle current
                if (!isOpen) row.classList.add('is-open');
            });
        }
    });

    // ── Floating image preview (desktop only) ──
    const expPreview = document.getElementById('expImgPreview');
    const expPreviewImg = document.getElementById('expPreviewImg');

    if (expPreview && expPreviewImg && window.matchMedia('(pointer: fine)').matches) {
        let prevTargetX = 0, prevTargetY = 0;
        let prevCurrentX = 0, prevCurrentY = 0;

        function lerpPreview() {
            prevCurrentX += (prevTargetX - prevCurrentX) * 0.12;
            prevCurrentY += (prevTargetY - prevCurrentY) * 0.12;
            expPreview.style.left = prevCurrentX + 'px';
            expPreview.style.top  = prevCurrentY + 'px';
            requestAnimationFrame(lerpPreview);
        }
        lerpPreview();

        expRows.forEach(row => {
            row.addEventListener('mouseenter', () => {
                const img = row.dataset.img;
                if (img) {
                    expPreviewImg.src = img;
                    expPreview.classList.add('is-visible');
                }
            });

            row.addEventListener('mouseleave', () => {
                expPreview.classList.remove('is-visible');
            });

            row.addEventListener('mousemove', (e) => {
                prevTargetX = e.clientX + 24;
                prevTargetY = e.clientY - 100;
            });
        });
    }

    // ── GSAP Scroll-triggered stagger entrance ──
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {

        gsap.registerPlugin(ScrollTrigger);

        // Animate each row on scroll
        expRows.forEach((row, i) => {
            gsap.fromTo(row, {
                opacity: 0,
                y: 40,
            }, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: row,
                    start: 'top 88%',
                    toggleActions: 'play none none none',
                },
                delay: i * 0.05,
            });
        });

        // Animate separator lines (draw from left)
        document.querySelectorAll('.exp-separator').forEach((sep) => {
            gsap.fromTo(sep, {
                scaleX: 0,
                transformOrigin: 'left center',
            }, {
                scaleX: 1,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sep,
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                },
            });
        });

        // Animate section header
        const expHeader = document.querySelector('#experience .flex.flex-col');
        if (expHeader) {
            gsap.fromTo(expHeader, {
                opacity: 0,
                y: 60,
            }, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: expHeader,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });
        }

    } // end GSAP check

});
