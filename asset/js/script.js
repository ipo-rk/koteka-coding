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

        // When any nav link is clicked, hide the navbar if it's open
        var navLinks = document.querySelectorAll('#navbarNav .nav-link');
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
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