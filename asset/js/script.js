(function () {
    // Update header/nav height CSS variable and body padding so fixed header doesn't overlap content
    function updateNavHeight() {
        var header = document.querySelector('header');
        var h = header ? header.offsetHeight : 0;
        document.documentElement.style.setProperty('--nav-height', h + 'px');
        document.body.style.paddingTop = h + 'px';
    }

    // Initial set and updates on load/resize
    updateNavHeight();
    window.addEventListener('resize', updateNavHeight);
    window.addEventListener('load', updateNavHeight);

    // Gallery modal handling
    function updateModalFromElement(element) {
        var modalImg = document.getElementById('modalImage');
        var modalLabel = document.getElementById('galleryModalLabel');
        if (!modalImg || !modalLabel || !element) return;
        var imageSrc = element.getAttribute('data-image-src');
        var imageAlt = element.getAttribute('data-image-alt');
        if (!imageSrc) {
            var childImg = element.querySelector('img');
            if (childImg) imageSrc = childImg.src;
            if (!imageAlt && childImg) imageAlt = childImg.alt;
        }
        if (imageSrc) {
            modalImg.src = imageSrc;
            modalImg.alt = imageAlt || 'Gallery Image';
            modalLabel.textContent = imageAlt || 'Gallery Image';
        }
    }

    function initGalleryHandlers() {
        var items = document.querySelectorAll('.gallery-item');
        if (!items) return;
        items.forEach(function (el) {
            // ensure focusable for keyboard users
            if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');

            // click sets modal content (Bootstrap will open modal via data attributes)
            el.addEventListener('click', function (e) {
                updateModalFromElement(el);
            });

            // keyboard: Enter or Space opens modal and sets content
            el.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    updateModalFromElement(el);
                    // show bootstrap modal programmatically for keyboard activation
                    if (window.bootstrap && bootstrap.Modal) {
                        var bsModal = new bootstrap.Modal(document.getElementById('galleryModal'));
                        bsModal.show();
                    }
                }
            });
        });

        // Provide a global fallback function in case any markup still uses inline onclick
        window.updateModal = function (el) {
            updateModalFromElement(el);
        };
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGalleryHandlers);
    } else {
        initGalleryHandlers();
    }

    // Improved focus management for modal to prevent aria-hidden warnings
    function setupModalFocusManagement() {
        var galleryModal = document.getElementById('galleryModal');
        if (!galleryModal) return;

        // Store the element that triggered the modal
        var modalTrigger = null;

        // Listen for modal show event
        galleryModal.addEventListener('show.bs.modal', function () {
            // Store the currently focused element before modal opens
            modalTrigger = document.activeElement;
            // Force focus to modal content after a brief delay
            setTimeout(function () {
                var firstFocusable = galleryModal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                if (firstFocusable) {
                    firstFocusable.focus();
                }
            }, 100);
        });

        // Listen for modal hide event
        galleryModal.addEventListener('hide.bs.modal', function () {
            // Return focus to the trigger element when modal closes
            if (modalTrigger) {
                setTimeout(function () {
                    if (modalTrigger && modalTrigger.focus) {
                        modalTrigger.focus();
                    }
                }, 100);
            }
        });

        // Trap focus within modal while it's open
        galleryModal.addEventListener('keydown', function (e) {
            if (e.key !== 'Tab') return;

            var focusableElements = Array.from(galleryModal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            ));

            if (focusableElements.length === 0) return;

            var firstElement = focusableElements[0];
            var lastElement = focusableElements[focusableElements.length - 1];
            var activeElement = document.activeElement;

            if (e.shiftKey) {
                // Shift + Tab
                if (activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab
                if (activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupModalFocusManagement);
    } else {
        setupModalFocusManagement();
    }

})();

// Intersection Observer untuk animasi scroll - dapat diulang setiap kali scroll
(function () {
    // Cek apakah browser support Intersection Observer
    if ('IntersectionObserver' in window) {
        var observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    // Tambah class 'animate-in' untuk trigger animasi
                    entry.target.classList.add('animate-in');
                } else {
                    // Hapus class 'animate-in' saat elemen keluar viewport
                    // Ini memungkinkan animasi diulang saat elemen masuk lagi
                    entry.target.classList.remove('animate-in');
                }
            });
        }, observerOptions);

        // Observe semua elemen dengan class animasi
        var animatedElements = document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-top, .slide-in-bottom');
        animatedElements.forEach(function (el) {
            observer.observe(el);
        });
    }
})();

// ============================================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// ============================================================
(function () {
    var currentSection = 'home';

    // Function to activate nav link based on section ID
    function activateNavLink() {
        var sections = document.querySelectorAll('section[id]');
        var navLinks = document.querySelectorAll('#navbarNav .nav-link');

        sections.forEach(function (section) {
            var sectionTop = section.offsetTop;
            var sectionHeight = section.clientHeight;
            var sectionBottom = sectionTop + sectionHeight;
            var scrollPosition = window.scrollY + 150;

            // Check if current scroll position is within this section
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = section.getAttribute('id');
            }
        });

        // Update active class on nav links
        navLinks.forEach(function (link) {
            link.classList.remove('active');
            var href = link.getAttribute('href');
            if (href === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    // Throttle scroll event for performance
    var scrollTimeout;
    function handleScroll() {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(activateNavLink, 50);
    }

    // Setup when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            activateNavLink();
            window.addEventListener('scroll', handleScroll, false);
        });
    } else {
        activateNavLink();
        window.addEventListener('scroll', handleScroll, false);
    }
})();

// Auto-collapse Bootstrap navbar on nav-link or button click (mobile UX)
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var navbarCollapse = document.getElementById('navbarNav');
        if (!navbarCollapse) return;

        // Create or get a Collapse instance
        var bsCollapse = null;
        if (window.bootstrap && bootstrap.Collapse) {
            if (typeof bootstrap.Collapse.getOrCreateInstance === 'function') {
                bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
            } else {
                // fallback for older builds
                bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
            }
        }

        // When any nav link is clicked, hide the navbar if it's open and set as active
        var navLinks = document.querySelectorAll('#navbarNav .nav-link');
        navLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                // Remove active class from all links
                navLinks.forEach(function (l) {
                    l.classList.remove('active');
                });
                // Add active class to clicked link
                link.classList.add('active');

                // Auto-collapse mobile menu
                if (navbarCollapse.classList.contains('show') && bsCollapse) {
                    bsCollapse.hide();
                }
            });
        });

        // Also collapse when WhatsApp button inside navbar is clicked
        var waButtons = document.querySelectorAll('.btn-whatsapp');
        waButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                if (navbarCollapse.classList.contains('show') && bsCollapse) {
                    bsCollapse.hide();
                }
            });
        });
    });
})();

// ============================================================
// PERFORMANCE OPTIMIZATION - Passive Event Listeners
// ============================================================
(function () {
    // Enable passive event listeners for touch events on maps and interactive elements
    function enablePassiveEventListeners() {
        var supportsPassive = false;
        try {
            var opts = Object.defineProperty({}, 'passive', {
                get: function () {
                    supportsPassive = true;
                }
            });
            window.addEventListener('test', null, opts);
            window.removeEventListener('test', null, opts);
        } catch (err) {
            supportsPassive = false;
        }

        if (!supportsPassive) return;

        // Apply passive listeners to map iframe and other touch-interactive elements
        var touchElements = document.querySelectorAll('iframe, .contact-map, .gallery-item');
        touchElements.forEach(function (el) {
            if (el.addEventListener) {
                ['touchstart', 'touchmove', 'touchend', 'wheel'].forEach(function (eventName) {
                    el.addEventListener(eventName, function () { }, { passive: true });
                });
            }
        });

        // Also for document-level touch events
        ['touchstart', 'touchmove', 'touchend'].forEach(function (eventName) {
            document.addEventListener(eventName, function () { }, { passive: true });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', enablePassiveEventListeners);
    } else {
        enablePassiveEventListeners();
    }
})();

// ============================================================
// LAZY LOAD OPTIMIZATION FOR MAPS
// ============================================================
(function () {
    // Defer Google Maps initialization until user interacts with it
    var mapsInitialized = false;

    function initializeMapsOnDemand() {
        if (mapsInitialized) return;
        mapsInitialized = true;

        var mapIframes = document.querySelectorAll('iframe[src*="maps.google.com"]');
        mapIframes.forEach(function (iframe) {
            // Force re-initialization if needed
            if (iframe.src) {
                iframe.style.visibility = 'visible';
            }
        });
    }

    // Initialize maps when user scrolls near them
    if ('IntersectionObserver' in window) {
        var mapObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    initializeMapsOnDemand();
                    mapObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        var contactMaps = document.querySelectorAll('.contact-map');
        contactMaps.forEach(function (el) {
            mapObserver.observe(el);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        window.addEventListener('scroll', initializeMapsOnDemand);
    }
})();