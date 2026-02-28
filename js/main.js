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

    // ── Playlist: tambah / hapus lagu di sini ──
    const playlist = [
        { title: 'But If You Go',    src: 'assets/But If You Go - Nathaniel Constantin.mp3' },
        { title: 'I Dont Love You',  src: 'assets/I Dont Love You - My Chemical Romance.mp3' },
        { title: 'Hurricane',        src: 'assets/Hurricane - I Prevail.mp3' },
        { title: 'Teardrops',        src: 'assets/Teardrops - Bring Me the Horizon.mp3' },
        { title: 'xx',               src: 'assets/xx - The Millenial Club.mp3' },
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

});
