/**
 * PrintVerse Main Application
 * ==========================
 * Handles navigation, product display, search, and forms
 */

// ==================== CONFIGURATION ====================
// Leave token/repo empty ('') to disable GitHub Issue creation.
// Orders will then fall back to localStorage silently (no errors).
var GITHUB_CONFIG = {
    token: '',
    repo: ''
};

var STATIC_FORMS_CONFIG = {
    accessKey: 'sf_54855f7c6f2b87cf90df06ab'
};

function handleImageError(img) {
    if (!img) return;
    img.onerror = null;
    img.src = 'images/categories/canva.jpg';
}

function formatOptions(options) {
    if (!options) return '';
    var keys = Object.keys(options);
    if (keys.length === 0) return '';
    var parts = [];
    for (var i = 0; i < keys.length; i++) {
        parts.push(keys[i] + ': ' + options[keys[i]]);
    }
    return parts.join(' | ');
}

var app = {
    currentPage: 'home',
    currentCategory: null,
    currentProduct: null,
    currentImageIndex: 0,
    searchResults: [],

    init: function() {
        this.setFormAccessKeys();
        this.hideLoader();
        this.setupEventListeners();
        this.handleInitialRoute();
        this.setupStickyHeader();
        this.updatePinnedCount();
        this.setupRevealAnimations();
        this.setupCounterAnimation();
        this.createHeroParticles();
        this.setupHeroBubbles();
        this.initGSAPAnimations();
    },

    setFormAccessKeys: function() {
        var keys = document.querySelectorAll('input[name="accessKey"]');
        for (var i = 0; i < keys.length; i++) {
            keys[i].value = STATIC_FORMS_CONFIG.accessKey;
        }
    },

    hideLoader: function() {
        var loader = document.getElementById('pageLoader');
        if (loader) {
            setTimeout(function() {
                loader.classList.add('fade-out');
                setTimeout(function() {
                    loader.style.display = 'none';
                }, 800);
            }, 500);
        }
    },

    setupRevealAnimations: function() {
        var revealEls = document.querySelectorAll('.reveal:not(.revealed)');
        if (!('IntersectionObserver' in window)) {
            for (var i = 0; i < revealEls.length; i++) {
                revealEls[i].classList.add('revealed');
            }
            return;
        }
        if (this.revealObserver) {
            this.revealObserver.disconnect();
        }
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        this.revealObserver = observer;
        for (var j = 0; j < revealEls.length; j++) {
            observer.observe(revealEls[j]);
        }
    },

    setupCounterAnimation: function() {
        var self = this;
        var statItems = document.querySelectorAll('.stat-item[data-count]');
        
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    self.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statItems.forEach(function(item) {
            observer.observe(item);
        });
    },

    animateCounter: function(element) {
        var target = parseInt(element.getAttribute('data-count'));
        var numberEl = element.querySelector('.stat-number');
        var plusEl = element.querySelector('.stat-plus');
        var duration = 2000;
        var start = 0;
        var startTime = null;
        
        function update(currentTime) {
            if (!startTime) startTime = currentTime;
            var progress = Math.min((currentTime - startTime) / duration, 1);
            var easeOut = 1 - Math.pow(1 - progress, 3);
            var current = Math.floor(easeOut * target);
            
            if (target >= 1000) {
                var displayValue = Math.floor(current / 1000);
                numberEl.textContent = displayValue.toString();
                if (progress >= 1) {
                    plusEl.textContent = 'K+';
                }
            } else {
                numberEl.textContent = current.toString();
            }
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    },

    createHeroParticles: function() {
        var container = document.getElementById('heroParticles');
        if (!container) return;
        var count = 100;
        for (var i = 0; i < count; i++) {
            var particle = document.createElement('div');
            particle.className = 'hero-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (6 + Math.random() * 10) + 's';
            particle.style.animationDelay = (Math.random() * 8) + 's';
            particle.style.width = (2 + Math.random() * 4) + 'px';
            particle.style.height = particle.style.width;
            container.appendChild(particle);
        }
    },

    setupHeroBubbles: function() {
        var self = this;
        var hero = document.querySelector('.hero');
        if (!hero) return;

        var lastBubbleTime = 0;
        var throttleDelay = 50;

        hero.addEventListener('mousemove', function(e) {
            var now = Date.now();
            if (now - lastBubbleTime < throttleDelay) return;
            lastBubbleTime = now;

            var rect = hero.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;

            self.createBubble(hero, x, y);
        });
    },

    createBubble: function(container, x, y) {
        var bubble = document.createElement('div');
        bubble.className = 'hero-bubble';

        var size = 5 + Math.random() * 10;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = (x - size / 2) + 'px';
        bubble.style.top = (y - size / 2) + 'px';

        container.appendChild(bubble);

        setTimeout(function() {
            if (bubble.parentNode) {
                bubble.parentNode.removeChild(bubble);
            }
        }, 2000);
    },

    initGSAPAnimations: function() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        
        gsap.registerPlugin(ScrollTrigger);
        
        var self = this;
        setTimeout(function() {
            self.animateStats();
            self.animateFeatures();
            self.animateProductTypes();
            self.animateCategories();
            ScrollTrigger.refresh();
        }, 300);
    },

    animateStats: function() {
        var statItems = document.querySelectorAll('.stat-item');
        if (statItems.length === 0) return;
        
        statItems.forEach(function(item, index) {
            gsap.fromTo(item, 
                { y: 60, opacity: 0, scale: 0.8 },
                {
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    },
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: 'back.out(1.7)'
                }
            );
        });
        
        var icons = document.querySelectorAll('.stat-icon');
        icons.forEach(function(icon, index) {
            gsap.fromTo(icon, 
                { scale: 0, rotation: -180 },
                {
                    scrollTrigger: {
                        trigger: icon,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    },
                    scale: 1,
                    rotation: 0,
                    duration: 0.6,
                    delay: index * 0.2 + 0.3,
                    ease: 'back.out(2)'
                }
            );
        });
    },

    animateFeatures: function() {
        var features = document.querySelectorAll('.feature');
        if (features.length === 0) return;
        
        features.forEach(function(feature, index) {
            gsap.fromTo(feature, 
                { y: 80, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: feature,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: 'power3.out'
                }
            );
        });
        
        var featureIcons = document.querySelectorAll('.feature i');
        featureIcons.forEach(function(icon, index) {
            gsap.fromTo(icon, 
                { scale: 0 },
                {
                    scrollTrigger: {
                        trigger: icon,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    },
                    scale: 1,
                    duration: 0.5,
                    delay: index * 0.15 + 0.2,
                    ease: 'elastic.out(1, 0.5)'
                }
            );
        });
    },

    animateProductTypes: function() {
        var cards = document.querySelectorAll('.product-type-card');
        if (cards.length === 0) return;
        
        cards.forEach(function(card, index) {
            var xStart = index === 0 ? -100 : 100;
            gsap.fromTo(card, 
                { x: xStart, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    },
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out'
                }
            );
        });
        
        var divider = document.querySelector('.divider-or');
        if (divider) {
            gsap.fromTo(divider, 
                { scale: 0, rotation: -360 },
                {
                    scrollTrigger: {
                        trigger: divider,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    },
                    scale: 1,
                    rotation: 0,
                    duration: 0.8,
                    delay: 0.3,
                    ease: 'back.out(2)'
                }
            );
        }
    },

    animateCategories: function() {
        var categories = document.querySelectorAll('.category-card');
        if (categories.length === 0) return;
        
        categories.forEach(function(category, index) {
            gsap.fromTo(category, 
                { y: 50, opacity: 0, scale: 0.9 },
                {
                    scrollTrigger: {
                        trigger: category,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    },
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: 'power2.out'
                }
            );
        });
    },

    setupEventListeners: function() {
        var self = this;

        // Home button
        var homeBtn = document.getElementById('homeBtn');
        if (homeBtn) {
            homeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                self.navigateTo('home');
            });
        }

        // Shop Now button
        var shopNowBtn = document.getElementById('shopNowBtn');
        if (shopNowBtn) {
            shopNowBtn.addEventListener('click', function(e) {
                e.preventDefault();
                var target = document.getElementById('categoriesSection');
                if (target) {
                    var header = document.getElementById('header');
                    var headerHeight = header ? header.offsetHeight : 0;
                    var ledLine = document.querySelector('.header-led-line');
                    var ledLineHeight = ledLine ? ledLine.offsetHeight : 0;
                    var rect = target.getBoundingClientRect();
                    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    var offset = rect.top + scrollTop - headerHeight - ledLineHeight + 10;
                    window.scrollTo({ top: offset, behavior: 'smooth' });
                }
            });
        }

        // What We Offer button
        var whatWeOfferBtn = document.getElementById('whatWeOfferBtn');
        if (whatWeOfferBtn) {
            whatWeOfferBtn.addEventListener('click', function(e) {
                e.preventDefault();
                var target = document.getElementById('freeDownloadsSection');
                if (target) {
                    var header = document.getElementById('header');
                    var headerHeight = header ? header.offsetHeight : 0;
                    var ledLine = document.querySelector('.header-led-line');
                    var ledLineHeight = ledLine ? ledLine.offsetHeight : 0;
                    var rect = target.getBoundingClientRect();
                    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    var offset = rect.top + scrollTop - headerHeight - ledLineHeight + 10;
                    window.scrollTo({ top: offset, behavior: 'smooth' });
                }
            });
            whatWeOfferBtn.addEventListener('mouseenter', function() {
                self.partyBurst(whatWeOfferBtn);
            });
        }

        // About Us button
        var aboutUsBtn = document.getElementById('aboutUsBtn');
        if (aboutUsBtn) {
            aboutUsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                var target = document.getElementById('aboutSection');
                if (target) {
                    var header = document.getElementById('header');
                    var headerHeight = header ? header.offsetHeight : 0;
                    var ledLine = document.querySelector('.header-led-line');
                    var ledLineHeight = ledLine ? ledLine.offsetHeight : 0;
                    var rect = target.getBoundingClientRect();
                    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    var offset = rect.top + scrollTop - headerHeight - ledLineHeight + 10;
                    window.scrollTo({ top: offset, behavior: 'smooth' });
                }
            });
        }

        // Contact modal (hero Contact Us)
        this.setupContactModal();

        // Search
        this.setupSearch();

        // Mobile menu
        this.setupMobileMenu();

        // Pinned products button
        var pinnedBtn = document.getElementById('pinnedBtn');
        if (pinnedBtn) {
            pinnedBtn.addEventListener('click', function(e) {
                e.preventDefault();
                self.navigateTo('pinned');
            });
        }

        // Mobile pinned button
        var mobilePinnedBtn = document.getElementById('mobilePinnedBtn');
        if (mobilePinnedBtn) {
            mobilePinnedBtn.addEventListener('click', function(e) {
                e.preventDefault();
                self.navigateTo('pinned');
                self.closeMobileMenu();
            });
        }

        // Feedback button
        var feedbackBtn = document.getElementById('feedbackBtn');
        if (feedbackBtn) {
            feedbackBtn.addEventListener('click', function(e) {
                e.preventDefault();
                self.navigateTo('feedback');
            });
        }

        // Mobile feedback button
        var mobileFeedbackBtn = document.getElementById('mobileFeedbackBtn');
        if (mobileFeedbackBtn) {
            mobileFeedbackBtn.addEventListener('click', function(e) {
                e.preventDefault();
                self.navigateTo('feedback');
                self.closeMobileMenu();
            });
        }

        // Categories grid click
        var categoriesGrid = document.getElementById('categoriesGrid');
        if (categoriesGrid) {
            categoriesGrid.addEventListener('click', function(e) {
                var card = e.target.closest('.category-card');
                if (card) {
                    var slug = card.getAttribute('data-slug');
                    self.navigateTo('category', { category: slug });
                }
            });
        }

        // Categories navigation grid click
        var categoriesNavGrid = document.getElementById('categoriesNavGrid');
        if (categoriesNavGrid) {
            categoriesNavGrid.addEventListener('click', function(e) {
                var card = e.target.closest('.category-nav-card');
                if (card) {
                    e.preventDefault();
                    var slug = card.getAttribute('data-slug');
                    self.navigateTo('category', { category: slug });
                }
            });
        }

        // Products grid click
        var productsGrid = document.getElementById('productsGrid');
        if (productsGrid) {
            productsGrid.addEventListener('click', function(e) {
                if (e.target.closest('.btn')) return;
                var card = e.target.closest('.product-card');
                if (card) {
                    var id = parseInt(card.getAttribute('data-id'));
                    self.navigateTo('product', { productId: id });
                }
            });
        }

        // Product page
        this.setupProductPage();

        // Checkout form
        this.setupCheckoutForm();
    },

    setupSearch: function() {
        var self = this;
        var searchInput = document.getElementById('searchInput');
        var searchBtn = document.getElementById('searchBtn');
        var mobileSearchInput = document.getElementById('mobileSearchInput');
        var mobileSearchBtn = document.getElementById('mobileSearchBtn');
        var heroMobileSearchInput = document.getElementById('heroMobileSearchInput');
        var heroMobileSearchBtn = document.getElementById('heroMobileSearchBtn');

        function doSearch(input) {
            var query = input.value.trim().toLowerCase();
            if (query.length >= 2) {
                self.performSearch(query);
            } else if (query.length === 0) {
                self.navigateTo('home');
            }
        }

        if (searchInput) {
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') doSearch(searchInput);
            });
        }
        if (searchBtn) {
            searchBtn.addEventListener('click', function() { doSearch(searchInput); });
        }
        if (mobileSearchInput) {
            mobileSearchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') doSearch(mobileSearchInput);
            });
        }
        if (mobileSearchBtn) {
            mobileSearchBtn.addEventListener('click', function() { doSearch(mobileSearchInput); });
        }
        if (heroMobileSearchInput) {
            heroMobileSearchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') doSearch(heroMobileSearchInput);
            });
        }
        if (heroMobileSearchBtn) {
            heroMobileSearchBtn.addEventListener('click', function() { doSearch(heroMobileSearchInput); });
        }
    },

    setupMobileMenu: function() {
        var toggle = document.getElementById('mobileMenuToggle');
        var menu = document.getElementById('mobileMenu');
        var backdrop = document.querySelector('.mobile-menu-backdrop');
        var closeBtn = document.querySelector('.mobile-menu-close');

        function openMenu() {
            if (toggle) toggle.classList.add('active');
            if (menu) menu.classList.add('active');
            if (backdrop) backdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            if (toggle) toggle.classList.remove('active');
            if (menu) menu.classList.remove('active');
            if (backdrop) backdrop.classList.remove('active');
            document.body.style.overflow = '';
        }

        if (toggle && menu) {
            toggle.addEventListener('click', function() {
                if (menu.classList.contains('active')) {
                    closeMenu();
                } else {
                    openMenu();
                }
            });

            if (closeBtn) {
                closeBtn.addEventListener('click', closeMenu);
            }

            if (backdrop) {
                backdrop.addEventListener('click', closeMenu);
            }

            // Close on Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && menu.classList.contains('active')) {
                    closeMenu();
                }
            });

            // Close when clicking menu links (except dropdown toggles)
            menu.addEventListener('click', function(e) {
                var link = e.target.closest('.mobile-nav-link, .mobile-user-btn, .mobile-guest-btn');
                if (link && !link.classList.contains('has-submenu')) {
                    closeMenu();
                }
            });
        }
    },

    setupContactModal: function() {
        var overlay = document.getElementById('contactModalOverlay');
        var openBtn = document.getElementById('heroContactBtn');
        var closeBtn = document.getElementById('contactModalClose');

        function openModal(e) {
            if (e) e.preventDefault();
            if (overlay) {
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }

        function closeModal() {
            if (overlay) {
                var modal = document.getElementById('contactModal');
                if (modal) {
                    modal.style.animation = 'glitchOut 0.3s ease forwards';
                }
                setTimeout(function() {
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                    if (modal) {
                        modal.style.animation = '';
                    }
                }, 280);
            }
        }

        if (openBtn) openBtn.addEventListener('click', openModal);
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) closeModal();
            });
        }
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && overlay && overlay.classList.contains('active')) {
                closeModal();
            }
        });
    },

    setupProductPage: function() {
        var self = this;
        var prevImage = document.getElementById('prevImage');
        var nextImage = document.getElementById('nextImage');
        var thumbGallery = document.getElementById('thumbnailGallery');
        var qtyMinus = document.getElementById('qtyMinus');
        var qtyPlus = document.getElementById('qtyPlus');
        var qtyInput = document.getElementById('quantity');
        var pinBtn = document.getElementById('pinProductBtn');
        var buyBtn = document.getElementById('buyNowBtn');
        var relatedGrid = document.getElementById('relatedProducts');

        if (prevImage) prevImage.addEventListener('click', function() { self.navigateGallery(-1); });
        if (nextImage) nextImage.addEventListener('click', function() { self.navigateGallery(1); });

        if (thumbGallery) {
            thumbGallery.addEventListener('click', function(e) {
                var thumb = e.target.closest('.thumbnail');
                if (thumb) {
                    var idx = parseInt(thumb.getAttribute('data-index'));
                    self.goToImage(idx);
                }
            });
        }

        if (qtyMinus) {
            qtyMinus.addEventListener('click', function() {
                if (qtyInput && parseInt(qtyInput.value) > 1) {
                    qtyInput.value = parseInt(qtyInput.value) - 1;
                }
            });
        }

        if (qtyPlus) {
            qtyPlus.addEventListener('click', function() {
                if (qtyInput && parseInt(qtyInput.value) < 100) {
                    qtyInput.value = parseInt(qtyInput.value) + 1;
                }
            });
        }

        if (qtyInput) {
            qtyInput.addEventListener('change', function() {
                var val = parseInt(qtyInput.value);
                if (isNaN(val) || val < 1) qtyInput.value = 1;
                else if (val > 100) qtyInput.value = 100;
            });
        }

        if (pinBtn) {
            pinBtn.addEventListener('click', function() {
                var productId = self.currentProduct ? self.currentProduct.id : null;
                if (productId) {
                    self.togglePin(productId);
                }
            });
        }
        
        if (buyBtn) {
            buyBtn.addEventListener('click', function() {
                var productId = self.currentProduct ? self.currentProduct.id : null;
                if (productId) {
                    self.buyNow(productId);
                }
            });
        }
        
        if (relatedGrid) {
            relatedGrid.addEventListener('click', function(e) {
                var card = e.target.closest('.product-card');
                if (card) {
                    var id = parseInt(card.getAttribute('data-id'));
                    self.navigateTo('product', { productId: id });
                }
            });
        }
    },

    setupCheckoutForm: function() {
        var self = this;
        
        // Digital checkout form
        var digitalForm = document.getElementById('digitalCheckoutForm');
        if (digitalForm) {
            digitalForm.addEventListener('submit', function(e) {
                e.preventDefault();
                self.submitOrder('digital');
            });
        }
        
        // Physical checkout form
        var physicalForm = document.getElementById('physicalCheckoutForm');
        if (physicalForm) {
            physicalForm.addEventListener('submit', function(e) {
                e.preventDefault();
                self.submitOrder('physical');
            });
        }
    },

    setupStickyHeader: function() {
        var header = document.getElementById('header');
        if (header) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }
    },

    handleInitialRoute: function() {
        var hash = window.location.hash.slice(1);
        var params = new URLSearchParams(window.location.search);

        if (hash) {
            var parts = hash.split('?');
            var page = parts[0];
            var pageParams = {};
            if (parts[1]) {
                var sp = new URLSearchParams(parts[1]);
                sp.forEach(function(value, key) { pageParams[key] = value; });
            }
            if (pageParams.productId) pageParams.productId = parseInt(pageParams.productId);
            this.navigateTo(page, pageParams, false);
        } else if (params.has('category')) {
            this.navigateTo('category', { category: params.get('category') }, false);
        } else if (params.has('product')) {
            this.navigateTo('product', { productId: parseInt(params.get('product')) }, false);
        } else {
            this.showPage('home');
            this.renderCategories();
            this.renderFreeDownloads();
            this.setupRevealAnimations();
        }
    },

    navigateTo: function(page, params, updateUrl, skipScroll) {
        params = params || {};
        if (updateUrl === undefined) updateUrl = true;

        this.currentPage = page;

        document.body.classList.remove('page-home', 'page-category', 'page-product', 'page-pinned', 'page-checkout', 'page-payment', 'page-feedback');
        document.body.classList.add('page-' + page);

        // Close mobile menu
        var mobileMenu = document.getElementById('mobileMenu');
        var mobileToggle = document.getElementById('mobileMenuToggle');
        var mobileBackdrop = document.querySelector('.mobile-menu-backdrop');
        if (mobileMenu) mobileMenu.classList.remove('active');
        if (mobileToggle) mobileToggle.classList.remove('active');
        if (mobileBackdrop) mobileBackdrop.classList.remove('active');
        document.body.style.overflow = '';

        if (!skipScroll) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        switch (page) {
            case 'home':
                this.showPage('home');
                this.renderCategories();
                this.renderFreeDownloads();
                this.setupRevealAnimations();
                this.updateLedSeparator(true);
                break;
            case 'category':
                this.currentCategory = params.category;
                this.showPage('category');
                this.renderCategoryPage(params.category);
                this.updateLedSeparator(false);
                break;
            case 'product':
                this.showPage('product');
                this.renderProductPage(params.productId);
                this.updateLedSeparator(false);
                break;
            case 'pinned':
                this.showPage('pinned');
                this.renderPinnedPage();
                this.updateLedSeparator(false);
                break;
            case 'feedback':
                this.showPage('feedback');
                this.renderFeedbackPage();
                this.updateLedSeparator(false);
                break;
            case 'checkout':
                this.showPage('checkout');
                this.renderCheckoutPage();
                this.updateLedSeparator(false);
                break;
            case 'payment':
                this.showPage('payment');
                this.updateLedSeparator(false);
                break;
            default:
                this.showPage('home');
                this.renderCategories();
                this.updateLedSeparator(true);
        }

        if (updateUrl) {
            this.updateUrl(page, params);
        }
    },

    updateUrl: function(page, params) {
        var hash = page;
        var queryParts = [];
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                queryParts.push(key + '=' + params[key]);
            }
        }
        if (queryParts.length > 0) hash += '?' + queryParts.join('&');

        if (page === 'home') {
            history.pushState(null, '', window.location.pathname);
        } else {
            history.pushState(null, '', '#' + hash);
        }
    },

    showPage: function(pageId) {
        var pages = document.querySelectorAll('.page');
        for (var i = 0; i < pages.length; i++) {
            pages[i].classList.remove('active');
        }
        var target = document.getElementById(pageId + 'Page');
        if (target) target.classList.add('active');
    },

    closeMobileMenu: function() {
        var menu = document.getElementById('mobileMenu');
        var toggle = document.getElementById('mobileMenuToggle');
        var backdrop = document.querySelector('.mobile-menu-backdrop');
        if (menu) menu.classList.remove('active');
        if (toggle) toggle.classList.remove('active');
        if (backdrop) backdrop.classList.remove('active');
        document.body.style.overflow = '';
    },

    renderFeedbackPage: function() {
        var form = document.getElementById('feedbackForm');
        var success = document.getElementById('feedbackSuccess');
        if (form) form.style.display = 'block';
        if (success) success.style.display = 'none';
    },

    renderCategories: function() {
        var grid = document.getElementById('categoriesGrid');
        if (!grid) return;

        var html = '';
        for (var i = 0; i < categories.length; i++) {
            var cat = categories[i];
            var isDigital = cat.products.length > 0 && cat.products[0].type === 'digital';
            html += '<div class="category-card" data-slug="' + cat.slug + '">';
            html += '<img src="' + cat.image + '" alt="' + cat.name + '" class="category-card-image">';
            html += '<div class="category-card-content">';
            html += '<h3>' + cat.name + '</h3>';
            html += '<p>' + cat.description + '</p>';
            html += '<div class="category-meta">';
            html += '<span class="product-count">' + cat.products.length + ' products</span>';
            html += '<span class="category-type-badge ' + (isDigital ? 'digital' : 'physical') + '">' + (isDigital ? 'Digital' : 'Physical') + '</span>';
            html += '</div>';
            html += '</div></div>';
        }

        grid.innerHTML = html;
    },

    renderFreeDownloads: function() {
        var grid = document.getElementById('freeDownloadsGrid');
        if (!grid || typeof window.freeDownloads === 'undefined') return;

        var html = '';
        for (var i = 0; i < window.freeDownloads.length; i++) {
            var fd = window.freeDownloads[i];
            html += '<div class="free-download-card">';
            html += '<div class="free-download-image">';
            html += '<img src="' + fd.image + '" alt="' + fd.name + '" onerror="handleImageError(this)">';
            html += '<span class="free-download-tag">' + fd.tag + '</span>';
            html += '<span class="free-download-badge"><i class="fas fa-gift"></i> FREE</span>';
            html += '</div>';
            html += '<div class="free-download-body">';
            html += '<h3 class="free-download-title">' + fd.name + '</h3>';
            html += '<p class="free-download-desc">' + fd.description + '</p>';
            html += '<div class="free-download-footer">';
            html += '<span class="free-download-size"><i class="fas fa-file-archive"></i> ' + fd.fileSize + '</span>';
            html += '<button class="btn btn-primary btn-sm" onclick="app.downloadFree(\'' + fd.id + '\')"><i class="fas fa-download"></i> Download</button>';
            html += '</div></div></div>';
        }

        grid.innerHTML = html;
    },

    downloadFree: function(id) {
        if (typeof window.freeDownloads === 'undefined') return;
        for (var i = 0; i < window.freeDownloads.length; i++) {
            if (window.freeDownloads[i].id === id) {
                var fd = window.freeDownloads[i];
                var link = document.createElement('a');
                link.href = fd.fileUrl;
                link.download = fd.fileUrl.split('/').pop();
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                this.showNotification('Downloading "' + fd.name + '"', 'success');
                return;
            }
        }
    },

    goToCategories: function() {
        this.navigateTo('home', {}, true, true);
        var self = this;
        setTimeout(function() {
            var sec = document.getElementById('categoriesSection');
            if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 350);
    },

    goToProductCategory: function() {
        if (this.currentProductCategory) {
            this.navigateTo('category', { category: this.currentProductCategory.slug });
        } else {
            this.navigateTo('home');
        }
    },

    partyBurst: function(btn) {
        if (!btn) return;
        var rect = btn.getBoundingClientRect();
        var cx = rect.left + rect.width / 2;
        var cy = rect.top + rect.height / 2;
        var count = 30;
        for (var i = 0; i < count; i++) {
            var p = document.createElement('span');
            p.className = 'party-confetti';
            var angle = Math.random() * Math.PI * 2;
            var dist = 40 + Math.random() * 70;
            var tx = Math.cos(angle) * dist;
            var ty = Math.sin(angle) * dist - 25;
            p.style.left = cx + 'px';
            p.style.top = cy + 'px';
            var hue = Math.floor(Math.random() * 360);
            p.style.background = 'hsl(' + hue + ', 90%, 55%)';
            var size = 6 + Math.random() * 7;
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            p.style.setProperty('--tx', tx + 'px');
            p.style.setProperty('--ty', ty + 'px');
            p.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
            document.body.appendChild(p);
            (function(node) {
                setTimeout(function() {
                    if (node.parentNode) node.parentNode.removeChild(node);
                }, 1000);
            })(p);
        }
    },

    renderCategoryPage: function(categorySlug) {
        var category = null;
        for (var i = 0; i < categories.length; i++) {
            if (categories[i].slug === categorySlug) {
                category = categories[i];
                break;
            }
        }

        if (!category) {
            this.navigateTo('home');
            return;
        }

        document.getElementById('categoryName').textContent = category.name;
        document.getElementById('categoryTitle').textContent = category.name;
        document.getElementById('categoryDescription').textContent = category.description;

        var grid = document.getElementById('productsGrid');
        if (!grid) return;

        var html = '';
        for (var j = 0; j < category.products.length; j++) {
            var p = category.products[j];
            html += '<div class="product-card" data-id="' + p.id + '">';
            html += '<div class="product-card-image">';
            html += '<img src="' + p.images[0] + '" alt="' + p.name + '">';
            html += '<span class="product-badge ' + (p.type === 'digital' ? 'digital' : '') + '">' + (p.type === 'digital' ? 'Digital' : 'Physical') + '</span>';
            html += '</div>';
            html += '<div class="product-card-content">';
            html += '<h3 class="product-card-title">' + p.name + '</h3>';
            html += '<p class="product-card-description">' + p.shortDescription + '</p>';
            html += '<div class="product-card-price">';
            html += '<span class="current-price">₱' + p.price.toFixed(2) + '</span>';
            if (p.originalPrice) html += '<span class="original-price">₱' + p.originalPrice.toFixed(2) + '</span>';
            html += '</div>';
            html += '<div class="product-card-actions">';
            var isPinned = pinned.isPinned(p.id);
            html += '<button class="btn ' + (isPinned ? 'btn-pinned' : 'btn-primary') + ' btn-sm" onclick="app.togglePin(' + p.id + ')"><i class="fas fa-thumbtack"></i> ' + (isPinned ? 'Pinned' : 'Pin') + '</button>';
            html += '<button class="btn btn-secondary btn-sm" onclick="app.buyNow(' + p.id + ')"><i class="fas fa-bolt"></i> Buy Now</button>';
            html += '</div></div></div>';
        }

        grid.innerHTML = html;
        
        // Render categories navigation
        this.renderCategoriesNavigation(categorySlug);
    },

    renderCategoriesNavigation: function(currentCategorySlug) {
        var navGrid = document.getElementById('categoriesNavGrid');
        if (!navGrid) return;

        var html = '';
        for (var i = 0; i < categories.length; i++) {
            var cat = categories[i];
            var isActive = cat.slug === currentCategorySlug;
            var iconClass = this.getCategoryIcon(cat.slug);
            
            html += '<a href="#" class="category-nav-card' + (isActive ? ' active' : '') + '" data-slug="' + cat.slug + '">';
            html += '<i class="' + iconClass + '"></i>';
            html += '<span>' + cat.name + '</span>';
            html += '</a>';
        }

        navGrid.innerHTML = html;
    },

    getCategoryIcon: function(slug) {
        var icons = {
            't-shirts': 'fas fa-tshirt',
            'digital-movies': 'fas fa-film',
            'picture-frames': 'fas fa-image',
            'ebooks': 'fas fa-book',
            'website-templates': 'fas fa-code',
            'stickers': 'fas fa-sticky-note',
            'game-servers': 'fas fa-server',
            'canva-templates': 'fas fa-palette'
        };
        return icons[slug] || 'fas fa-box';
    },

    renderProductPage: function(productId) {
        var product = null;
        var productCategory = null;

        for (var i = 0; i < categories.length; i++) {
            for (var j = 0; j < categories[i].products.length; j++) {
                if (categories[i].products[j].id === productId) {
                    product = categories[i].products[j];
                    productCategory = categories[i];
                    break;
                }
            }
            if (product) break;
        }

        if (!product || !productCategory) {
            this.navigateTo('home');
            return;
        }

        this.currentProduct = product;
        this.currentProductCategory = productCategory;
        this.currentImageIndex = 0;

        // Reset quantity to 1
        var qtyInput = document.getElementById('quantity');
        if (qtyInput) qtyInput.value = 1;

        // Breadcrumb
        var catLink = document.getElementById('productCategoryLink');
        catLink.textContent = productCategory.name;
        catLink.onclick = function(e) {
            if (e) e.preventDefault();
            app.navigateTo('category', { category: productCategory.slug });
        };
        document.getElementById('productNameBreadcrumb').textContent = product.name;

        // Title and description
        document.getElementById('productTitle').textContent = product.name;
        document.getElementById('productDescription').textContent = product.description;

        // Product type badge
        var typeBadge = document.getElementById('productTypeBadge');
        if (typeBadge) {
            typeBadge.className = 'product-type-badge ' + (product.type === 'digital' ? 'badge-digital' : 'badge-physical');
            typeBadge.textContent = product.type === 'digital' ? 'Digital' : 'Physical';
        }

        // Rating
        document.getElementById('productRating').innerHTML = this.renderRating(product.rating, product.reviews);

        // Price
        var priceHtml = '<span class="current-price">₱' + product.price.toFixed(2) + '</span>';
        if (product.originalPrice) priceHtml += '<span class="original-price">₱' + product.originalPrice.toFixed(2) + '</span>';
        document.getElementById('productPrice').innerHTML = priceHtml;

        // Images
        this.renderProductImages(product.images);

        // Options
        var optionsDiv = document.getElementById('productOptions');
        var qtyDiv = document.querySelector('.quantity-selector');

        if (product.type === 'physical') {
            this.renderProductOptions(product);
            if (optionsDiv) optionsDiv.style.display = 'block';
            if (qtyDiv) qtyDiv.style.display = 'flex';
        } else {
            if (optionsDiv) { optionsDiv.innerHTML = ''; optionsDiv.style.display = 'none'; }
            if (qtyDiv) qtyDiv.style.display = 'none';
        }

        // Features
        this.renderProductFeatures(product);

        // Update pin button state
        var pinBtn = document.getElementById('pinProductBtn');
        if (pinBtn) {
            var isPinned = pinned.isPinned(productId);
            pinBtn.innerHTML = '<i class="fas fa-thumbtack"></i> ' + (isPinned ? 'Pinned' : 'Pin Product');
            pinBtn.className = 'btn btn-lg ' + (isPinned ? 'btn-pinned' : 'btn-primary');
        }

        // Related products
        this.renderRelatedProducts(productCategory, product.id);
    },

    renderProductImages: function(images) {
        var mainImage = document.getElementById('mainProductImage');
        var thumbGallery = document.getElementById('thumbnailGallery');

        if (mainImage) {
            mainImage.src = images[0];
            mainImage.alt = this.currentProduct.name;
        }

        if (thumbGallery) {
            var html = '';
            for (var i = 0; i < images.length; i++) {
                html += '<div class="thumbnail ' + (i === 0 ? 'active' : '') + '" data-index="' + i + '">';
                html += '<img src="' + images[i] + '" alt="' + this.currentProduct.name + ' Image ' + (i + 1) + '">';
                html += '</div>';
            }
            thumbGallery.innerHTML = html;
        }
    },

    renderProductOptions: function(product) {
        var container = document.getElementById('productOptions');
        if (!container) return;

        var html = '';

        if (product.sizes && product.sizes.length > 0) {
            html += '<div class="option-group"><label class="option-label">Size</label><div class="option-buttons" id="sizeOptions">';
            for (var i = 0; i < product.sizes.length; i++) {
                html += '<button type="button" class="option-btn ' + (i === 0 ? 'active' : '') + '" data-value="' + product.sizes[i] + '">' + product.sizes[i] + '</button>';
            }
            html += '</div></div>';
        }

        if (product.colors && product.colors.length > 0) {
            html += '<div class="option-group"><label class="option-label">Color</label><div class="option-buttons" id="colorOptions">';
            for (var j = 0; j < product.colors.length; j++) {
                html += '<button type="button" class="option-btn ' + (j === 0 ? 'active' : '') + '" data-value="' + product.colors[j] + '">' + product.colors[j] + '</button>';
            }
            html += '</div></div>';
        }

        if (product.compatibility && product.compatibility.length > 0) {
            html += '<div class="option-group"><label class="option-label">Compatibility</label><div class="option-buttons" id="compatibilityOptions">';
            for (var k = 0; k < product.compatibility.length; k++) {
                html += '<button type="button" class="option-btn ' + (k === 0 ? 'active' : '') + '" data-value="' + product.compatibility[k] + '">' + product.compatibility[k] + '</button>';
            }
            html += '</div></div>';
        }

        container.innerHTML = html;
        this.setupOptionButtons();
    },

    setupOptionButtons: function() {
        var groups = document.querySelectorAll('.option-buttons');
        for (var i = 0; i < groups.length; i++) {
            groups[i].addEventListener('click', function(e) {
                var btn = e.target.closest('.option-btn');
                if (btn) {
                    var siblings = btn.parentElement.querySelectorAll('.option-btn');
                    for (var j = 0; j < siblings.length; j++) {
                        siblings[j].classList.remove('active');
                    }
                    btn.classList.add('active');
                }
            });
        }
    },

    renderProductFeatures: function(product) {
        var container = document.getElementById('productFeatures');
        if (!container || !product.features) return;

        var html = '<h3>Features</h3><div class="features-list">';
        for (var i = 0; i < product.features.length; i++) {
            html += '<div class="feature-item"><i class="fas fa-check-circle"></i><span>' + product.features[i] + '</span></div>';
        }
        html += '</div>';
        container.innerHTML = html;
    },

    renderRelatedProducts: function(category, currentProductId) {
        var container = document.getElementById('relatedProducts');
        if (!container) return;

        var related = [];
        for (var i = 0; i < category.products.length; i++) {
            if (category.products[i].id !== currentProductId && related.length < 4) {
                related.push(category.products[i]);
            }
        }

        if (related.length === 0) {
            container.innerHTML = '<p>No related products found.</p>';
            return;
        }

        var html = '';
        for (var j = 0; j < related.length; j++) {
            var p = related[j];
            html += '<div class="product-card" data-id="' + p.id + '">';
            html += '<div class="product-card-image">';
            html += '<img src="' + p.images[0] + '" alt="' + p.name + '">';
            html += '<span class="product-badge ' + (p.type === 'digital' ? 'digital' : '') + '">' + (p.type === 'digital' ? 'Digital' : 'Physical') + '</span>';
            html += '</div>';
            html += '<div class="product-card-content">';
            html += '<h3 class="product-card-title">' + p.name + '</h3>';
            html += '<div class="product-card-price">';
            html += '<span class="current-price">₱' + p.price.toFixed(2) + '</span>';
            if (p.originalPrice) html += '<span class="original-price">₱' + p.originalPrice.toFixed(2) + '</span>';
            html += '</div></div></div>';
        }

        container.innerHTML = html;
    },

    renderRating: function(rating, reviews) {
        var html = '<span class="stars">';
        for (var i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                html += '<i class="fas fa-star"></i>';
            } else if (i - 0.5 <= rating) {
                html += '<i class="fas fa-star-half-alt"></i>';
            } else {
                html += '<i class="far fa-star"></i>';
            }
        }
        html += '</span>';
        html += '<span class="rating-count">(' + reviews + ' reviews)</span>';
        return html;
    },

    navigateGallery: function(direction) {
        if (!this.currentProduct) return;
        var total = this.currentProduct.images.length;
        this.currentImageIndex = (this.currentImageIndex + direction + total) % total;
        this.updateGallery();
    },

    goToImage: function(index) {
        if (!this.currentProduct) return;
        this.currentImageIndex = index;
        this.updateGallery();
    },

    updateGallery: function() {
        if (!this.currentProduct) return;
        var mainImage = document.getElementById('mainProductImage');
        var thumbnails = document.querySelectorAll('.thumbnail');

        if (mainImage) {
            mainImage.src = this.currentProduct.images[this.currentImageIndex];
        }

        for (var i = 0; i < thumbnails.length; i++) {
            if (i === this.currentImageIndex) {
                thumbnails[i].classList.add('active');
            } else {
                thumbnails[i].classList.remove('active');
            }
        }
    },

    getSelectedOptions: function() {
        var options = {};
        var sizeEl = document.querySelector('#sizeOptions .option-btn.active');
        if (sizeEl) options.size = sizeEl.getAttribute('data-value');

        var colorEl = document.querySelector('#colorOptions .option-btn.active');
        if (colorEl) options.color = colorEl.getAttribute('data-value');

        var compatEl = document.querySelector('#compatibilityOptions .option-btn.active');
        if (compatEl) options.compatibility = compatEl.getAttribute('data-value');

        return options;
    },

    togglePin: function(productId) {
        var self = this;
        var product = null;
        for (var i = 0; i < categories.length; i++) {
            for (var j = 0; j < categories[i].products.length; j++) {
                if (categories[i].products[j].id === productId) {
                    product = categories[i].products[j];
                    product.categoryName = categories[i].name;
                    break;
                }
            }
            if (product) break;
        }

        if (product) {
            var wasPinned = pinned.isPinned(productId);
            if (wasPinned) {
                pinned.unpinProduct(productId);
                this.showNotification('Product unpinned!', 'warning');
            } else {
                pinned.pinProduct(product);
                this.showNotification('Product pinned!', 'success');
            }
            var isPinned = pinned.isPinned(productId);

            // If on pinned page, re-render to remove/add card
            if (this.currentPage === 'pinned') {
                this.renderPinnedPage();
            } else {
                // Update ALL pin buttons for this product across the page
                this.updatePinButtonState(productId, isPinned);
            }
            this.updatePinnedCount();
        }
    },

    updatePinButtonState: function(productId, isPinned) {
        // Find all elements with onclick containing this productId
        var allBtns = document.querySelectorAll('[onclick*="togglePin(' + productId + ')"]');
        for (var k = 0; k < allBtns.length; k++) {
            var btn = allBtns[k];
            var isProductPage = btn.closest('.product-page');
            var isPinnedPage = btn.closest('.pinned-page');

            if (isProductPage) {
                btn.innerHTML = '<i class="fas fa-thumbtack"></i> ' + (isPinned ? 'Pinned' : 'Pin Product');
                btn.className = 'btn btn-lg ' + (isPinned ? 'btn-pinned' : 'btn-primary');
            } else if (isPinnedPage) {
                continue;
            } else {
                btn.innerHTML = '<i class="fas fa-thumbtack"></i> ' + (isPinned ? 'Pinned' : 'Pin');
                btn.className = 'btn ' + (isPinned ? 'btn-pinned' : 'btn-primary') + ' btn-sm';
            }

            // Add pulse animation
            btn.style.transform = 'scale(1.15)';
            setTimeout(function(b) {
                return function() { b.style.transform = ''; };
            }(btn), 200);
        }

        // Also update the product page pin button by ID (uses event listener, not onclick)
        var pinBtn = document.getElementById('pinProductBtn');
        if (pinBtn && this.currentProduct && this.currentProduct.id === productId) {
            pinBtn.innerHTML = '<i class="fas fa-thumbtack"></i> ' + (isPinned ? 'Pinned' : 'Pin Product');
            pinBtn.className = 'btn btn-lg ' + (isPinned ? 'btn-pinned' : 'btn-primary');
            pinBtn.style.transform = 'scale(1.15)';
            setTimeout(function() { pinBtn.style.transform = ''; }, 200);
        }
    },

    buyNow: function(productId) {
        var product = null;
        for (var i = 0; i < categories.length; i++) {
            for (var j = 0; j < categories[i].products.length; j++) {
                if (categories[i].products[j].id === productId) {
                    product = categories[i].products[j];
                    break;
                }
            }
            if (product) break;
        }

        if (product) {
            // Capture quantity and selected options when buying from the product detail page
            var qty = 1;
            var options = {};
            if (this.currentProduct && this.currentProduct.id === productId) {
                var qtyInput = document.getElementById('quantity');
                if (qtyInput) {
                    qty = parseInt(qtyInput.value, 10);
                    if (isNaN(qty) || qty < 1) qty = 1;
                }
                options = this.getSelectedOptions();
            }
            product.quantity = qty;
            product.options = options;

            // Store single product for checkout
            localStorage.removeItem('buyAllProducts');
            localStorage.setItem('buyNowProduct', JSON.stringify(product));
            this.navigateTo('checkout');
        }
    },

    renderPinnedPage: function() {
        var self = this;
        var pinnedContent = document.getElementById('pinnedContent');
        if (!pinnedContent) return;

        var pinnedProducts = pinned.getPinnedProducts();
        var summaryBar = document.getElementById('pinnedSummaryBar');
        var typeTabs = document.getElementById('pinnedTypeTabs');

        if (pinnedProducts.length === 0) {
            if (summaryBar) summaryBar.style.display = 'none';
            if (typeTabs) typeTabs.style.display = 'none';
            pinnedContent.innerHTML = '<div class="empty-pinned">' +
                '<div class="empty-pinned-icon"><div class="empty-pinned-icon-ring"><div class="empty-pinned-icon-inner"><i class="fas fa-thumbtack"></i></div></div></div>' +
                '<h3>No pinned products yet</h3>' +
                '<p>Browse the catalog and tap the pin icon on any product to save the ones you love. Your pins are kept right here for quick access and express checkout.</p>' +
                '<div class="empty-pinned-tips">' +
                        '<div class="empty-pin-tip">' +
                            '<div class="empty-pin-tip-icon favorites"><i class="fas fa-bookmark"></i></div>' +
                            '<div class="empty-pin-tip-content">' +
                                '<h4>Save favorites</h4>' +
                                '<p>Quickly access products you love</p>' +
                            '</div>' +
                        '</div>' +
                        '<div class="empty-pin-tip">' +
                            '<div class="empty-pin-tip-icon checkout"><i class="fas fa-bolt"></i></div>' +
                            '<div class="empty-pin-tip-content">' +
                                '<h4>Express checkout</h4>' +
                                '<p>Skip straight to purchase</p>' +
                            '</div>' +
                        '</div>' +
                        '<div class="empty-pin-tip">' +
                            '<div class="empty-pin-tip-icon organized"><i class="fas fa-layer-group"></i></div>' +
                            '<div class="empty-pin-tip-content">' +
                                '<h4>Organized by type</h4>' +
                                '<p>Digital and physical separated</p>' +
                            '</div>' +
                        '</div>' +
                '</div>' +
                '<button class="btn btn-primary" onclick="app.navigateTo(\'home\')"><i class="fas fa-compass"></i> Explore Products</button>' +
                '</div>';
            return;
        }

        if (summaryBar) summaryBar.style.display = 'flex';
        if (typeTabs) typeTabs.style.display = '';

        // Count by type
        var digitalCount = 0;
        var physicalCount = 0;
        for (var t = 0; t < pinnedProducts.length; t++) {
            if (pinnedProducts[t].type === 'digital') digitalCount++;
            else physicalCount++;
        }

        // Auto-switch to a type that actually has pinned items
        if (digitalCount === 0 && physicalCount > 0) self.currentPinnedType = 'physical';
        else if (physicalCount === 0 && digitalCount > 0) self.currentPinnedType = 'digital';

        // Update type tabs with counts
        if (typeTabs) {
            var tabsHtml = '<button class="type-tab' + (self.currentPinnedType === 'digital' ? ' active' : '') + '" data-type="digital" onclick="app.filterPinnedByType(\'digital\')"><i class="fas fa-download"></i> Digital <span class="type-count">' + digitalCount + '</span></button>';
            tabsHtml += '<button class="type-tab' + (self.currentPinnedType === 'physical' ? ' active' : '') + '" data-type="physical" onclick="app.filterPinnedByType(\'physical\')"><i class="fas fa-truck"></i> Physical <span class="type-count">' + physicalCount + '</span></button>';
            typeTabs.innerHTML = tabsHtml;
        }

        // Show/hide Buy All and Select All based on current type
        var buyAllDigitalBtn = document.getElementById('buyAllDigitalBtn');
        var buyAllPhysicalBtn = document.getElementById('buyAllPhysicalBtn');
        var selectAllContainer = document.getElementById('selectAllContainer');
        if (buyAllDigitalBtn) buyAllDigitalBtn.style.display = self.currentPinnedType === 'digital' ? '' : 'none';
        if (buyAllPhysicalBtn) buyAllPhysicalBtn.style.display = self.currentPinnedType === 'physical' ? '' : 'none';
        if (selectAllContainer) selectAllContainer.style.display = '';

        // Filter products by current type
        var filteredProducts = pinnedProducts.filter(function(p) { return p.type === self.currentPinnedType; });

        if (filteredProducts.length === 0) {
            pinnedContent.innerHTML = '<div class="empty-pinned">' +
                '<div class="empty-pinned-icon"><i class="fas fa-' + (self.currentPinnedType === 'digital' ? 'download' : 'truck') + '"></i></div>' +
                '<h3>No ' + self.currentPinnedType + ' products pinned</h3>' +
                '<p>You have pinned products in the other category. Switch tabs or browse more products.</p>' +
                '<button class="btn btn-primary" onclick="app.filterPinnedByType(\'' + (self.currentPinnedType === 'digital' ? 'physical' : 'digital') + '\')"><i class="fas fa-exchange-alt"></i> Switch to ' + (self.currentPinnedType === 'digital' ? 'Physical' : 'Digital') + '</button>' +
                '</div>';
            return;
        }

        // Update summary based on currently selected items only
        this.updatePinnedTotal();

        // Update type breakdown
        var typeBreakdown = document.getElementById('pinnedTypeBreakdown');
        if (typeBreakdown) {
            var dPrice = 0;
            var pPrice = 0;
            for (var tb = 0; tb < pinnedProducts.length; tb++) {
                if (pinnedProducts[tb].type === 'digital') dPrice += pinnedProducts[tb].price;
                else pPrice += pinnedProducts[tb].price;
            }
            typeBreakdown.innerHTML = '<span class="type-breakdown-digital"><i class="fas fa-download"></i> Digital ' + digitalCount + ' <span class="bd-price">₱' + dPrice.toFixed(2) + '</span></span>' +
                '<span class="type-breakdown-physical"><i class="fas fa-truck"></i> Physical ' + physicalCount + ' <span class="bd-price">₱' + pPrice.toFixed(2) + '</span></span>';
        }

        // Build product grid
        var html = '<div class="pinned-grid" id="pinnedGrid">';
        for (var i = 0; i < filteredProducts.length; i++) {
            var p = filteredProducts[i];
            var savings = p.originalPrice ? (p.originalPrice - p.price) : 0;
            html += '<div class="pinned-card" data-id="' + p.productId + '" data-type="' + p.type + '">';
            html += '<div class="pinned-card-image">';
            html += '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy">';
            html += '<span class="pinned-card-badge ' + (p.type === 'digital' ? 'badge-digital' : 'badge-physical') + '">' + (p.type === 'digital' ? '<i class="fas fa-download"></i> Digital' : '<i class="fas fa-truck"></i> Physical') + '</span>';
            html += '<button class="pinned-card-remove" onclick="app.togglePin(' + p.productId + ')" title="Remove"><i class="fas fa-times"></i></button>';
            if (savings > 0) {
                html += '<span class="pinned-card-savings">Save ₱' + savings.toFixed(2) + '</span>';
            }
            html += '</div>';
            html += '<div class="pinned-card-body">';
            html += '<label class="pinned-card-check"><input type="checkbox" class="pinned-check" data-id="' + p.productId + '" data-type="' + p.type + '" onchange="app.updatePinnedTotal()"><span class="checkmark"></span></label>';
            html += '<h3 class="pinned-card-title">' + p.name + '</h3>';
            html += '<p class="pinned-card-desc">' + (p.shortDescription || '') + '</p>';
            html += '<div class="pinned-card-footer">';
            html += '<div class="pinned-card-price">';
            html += '<span class="pinned-price-current">₱' + p.price.toFixed(2) + '</span>';
            if (p.originalPrice) html += '<span class="pinned-price-original">₱' + p.originalPrice.toFixed(2) + '</span>';
            html += '</div>';
            html += '<button class="btn btn-primary btn-sm" onclick="app.buyNow(' + p.productId + ')"><i class="fas fa-bolt"></i> Buy</button>';
            html += '</div></div></div>';
        }
        html += '</div>';

        pinnedContent.innerHTML = html;
    },

    currentPinnedType: 'digital',

    filterPinnedByType: function(type) {
        this.currentPinnedType = type;
        this.renderPinnedPage();
    },

    clearAllPinned: function() {
        if (pinned.getPinnedCount() === 0) return;
        if (!confirm('Unpin all products?')) return;
        pinned.clearPinned();
        this.updatePinnedCount();
        this.renderPinnedPage();
    },

    buyAllPinned: function(typeFilter) {
        var checks = document.querySelectorAll('.pinned-check');
        var selectedProducts = [];
        for (var i = 0; i < checks.length; i++) {
            if (checks[i].checked) {
                var id = parseInt(checks[i].getAttribute('data-id'));
                var product = pinned.getPinnedById(id);
                if (product && product.type === typeFilter) {
                    selectedProducts.push(product);
                }
            }
        }
        if (selectedProducts.length === 0) {
            this.showNotification('No products selected', 'error');
            return;
        }
        localStorage.removeItem('buyNowProduct');
        localStorage.setItem('buyAllProducts', JSON.stringify(selectedProducts));
        this.navigateTo('checkout');
    },

    updatePinnedCount: function() {
        var count = pinned.getPinnedCount();
        var pinnedCountEl = document.getElementById('pinnedCount');
        var mobilePinnedCountEl = document.querySelector('.mobile-pinned-count');
        
        if (pinnedCountEl) {
            pinnedCountEl.textContent = count;
        }
        if (mobilePinnedCountEl) {
            mobilePinnedCountEl.textContent = count;
        }
    },

    updatePinnedTotal: function() {
        var checks = document.querySelectorAll('.pinned-check');
        var total = 0;
        var selected = 0;
        for (var i = 0; i < checks.length; i++) {
            if (checks[i].checked) {
                var id = parseInt(checks[i].getAttribute('data-id'));
                var product = pinned.getPinnedById(id);
                if (product) {
                    total += parseFloat(product.price || 0);
                    selected++;
                }
            }
        }
        var selectedCount = document.getElementById('pinnedSelectedCount');
        var selectedPrice = document.getElementById('pinnedSelectedPrice');
        if (selectedCount) selectedCount.textContent = selected;
        if (selectedPrice) selectedPrice.textContent = '₱' + total.toFixed(2);
        this.updateSelectAllLabel();
    },

    updateSelectAllLabel: function() {
        var btn = document.getElementById('selectAllContainer');
        if (!btn) return;
        var checks = document.querySelectorAll('.pinned-check');
        var allChecked = checks.length > 0;
        for (var i = 0; i < checks.length; i++) {
            if (!checks[i].checked) { allChecked = false; break; }
        }
        if (allChecked) {
            btn.innerHTML = '<i class="fas fa-times-circle"></i> Deselect All';
        } else {
            btn.innerHTML = '<i class="fas fa-check-double"></i> Select All';
        }
    },

    toggleSelectAll: function() {
        var checks = document.querySelectorAll('.pinned-check');
        var allChecked = true;
        for (var i = 0; i < checks.length; i++) {
            if (!checks[i].checked) { allChecked = false; break; }
        }
        for (var j = 0; j < checks.length; j++) {
            checks[j].checked = !allChecked;
        }
        this.updatePinnedTotal();
        this.updateSelectAllLabel();
    },

    renderCheckoutPage: function() {
        var checkoutItems = document.getElementById('checkoutItems');
        if (!checkoutItems) return;

        // Check for single product purchase (buy now)
        var buyNowProduct = null;
        try {
            var stored = localStorage.getItem('buyNowProduct');
            if (stored) {
                buyNowProduct = JSON.parse(stored);
            }
        } catch(e) {}

        if (buyNowProduct) {
            // Single product checkout
            var buyQty = buyNowProduct.quantity || 1;
            var optsText = formatOptions(buyNowProduct.options);
            var itemHtml = buyNowProduct.name;
            if (optsText) itemHtml += '<br><small class="checkout-item-options">' + optsText + '</small>';
            var html = '<div class="checkout-item"><span>' + itemHtml + ' x ' + buyQty + '</span><span>₱' + (buyNowProduct.price * buyQty).toFixed(2) + '</span></div>';
            checkoutItems.innerHTML = html;

            // Update total in sidebar
            var checkoutTotal = document.getElementById('checkoutTotal');
            if (checkoutTotal) {
                checkoutTotal.textContent = '₱' + (buyNowProduct.price * buyQty).toFixed(2);
            }

            // Update form based on product type
            var digitalForm = document.getElementById('digitalCheckoutForm');
            var physicalForm = document.getElementById('physicalCheckoutForm');

            if (buyNowProduct.type === 'digital') {
                if (digitalForm) digitalForm.style.display = 'block';
                if (physicalForm) physicalForm.style.display = 'none';
            } else {
                if (digitalForm) digitalForm.style.display = 'none';
                if (physicalForm) physicalForm.style.display = 'block';
            }
            return;
        }

        // Check for buy all pinned products
        var buyAllProducts = null;
        try {
            var storedAll = localStorage.getItem('buyAllProducts');
            if (storedAll) {
                buyAllProducts = JSON.parse(storedAll);
            }
        } catch(e) {}

        if (buyAllProducts && buyAllProducts.length > 0) {
            var html = '';
            var totalAll = 0;
            var hasPhysical = false;
            var hasDigital = false;
            for (var a = 0; a < buyAllProducts.length; a++) {
                var ap = buyAllProducts[a];
                totalAll += ap.price;
                if (ap.type === 'physical') hasPhysical = true;
                else hasDigital = true;
                var optsAp = formatOptions(ap.options);
                var itemHtmlAp = ap.name;
                if (optsAp) itemHtmlAp += '<br><small class="checkout-item-options">' + optsAp + '</small>';
                html += '<div class="checkout-item"><span>' + itemHtmlAp + ' x 1</span><span>₱' + ap.price.toFixed(2) + '</span></div>';
            }
            checkoutItems.innerHTML = html;

            var checkoutTotalAll = document.getElementById('checkoutTotal');
            if (checkoutTotalAll) {
                checkoutTotalAll.textContent = '₱' + totalAll.toFixed(2);
            }

            var digitalForm = document.getElementById('digitalCheckoutForm');
            var physicalForm = document.getElementById('physicalCheckoutForm');
            if (hasPhysical) {
                if (digitalForm) digitalForm.style.display = 'none';
                if (physicalForm) physicalForm.style.display = 'block';
            } else {
                if (digitalForm) digitalForm.style.display = 'block';
                if (physicalForm) physicalForm.style.display = 'none';
            }
            return;
        }

        // No checkout data found
        checkoutItems.innerHTML = '<p>No items to checkout. Please use Buy Now on a product first.</p>';
        return;
    },

    createGitHubIssue: function(orderData) {
        var config = GITHUB_CONFIG;
        if (!config.token || config.token === 'YOUR_GITHUB_TOKEN_HERE') {
            console.warn('GitHub token not configured. Skipping issue creation.');
            return Promise.resolve();
        }

        // Build issue body in markdown
        var body = '## Customer Info\n';
        body += '- **Name:** ' + orderData.customerInfo.name + '\n';
        body += '- **Email:** ' + orderData.customerInfo.email + '\n';
        body += '- **Phone:** ' + orderData.customerInfo.phone + '\n';

        if (orderData.formType === 'physical') {
            body += '\n## Shipping Address\n';
            body += '- **Address:** ' + (orderData.customerInfo.address || '') + '\n';
            body += '- **Barangay:** ' + (orderData.customerInfo.barangay || 'N/A') + '\n';
            body += '- **City:** ' + (orderData.customerInfo.city || '') + '\n';
            body += '- **Province:** ' + (orderData.customerInfo.province || '') + '\n';
            body += '- **ZIP Code:** ' + (orderData.customerInfo.zipCode || '') + '\n';
            if (orderData.customerInfo.instructions) {
                body += '- **Instructions:** ' + orderData.customerInfo.instructions + '\n';
            }
        }

        body += '\n## Items Ordered\n';
        for (var i = 0; i < orderData.items.length; i++) {
            var item = orderData.items[i];
            var opts = formatOptions(item.options);
            var itemLine = '- ' + item.name;
            if (opts) itemLine += ' (' + opts + ')';
            itemLine += ' x' + (item.quantity || 1) + ' - ₱' + (item.price * (item.quantity || 1)).toFixed(2);
            body += itemLine + '\n';
        }

        body += '\n## Order Details\n';
        body += '- **Order ID:** ' + orderData.orderId + '\n';
        body += '- **Total:** ₱' + orderData.total.toFixed(2) + '\n';
        body += '- **Payment Method:** ' + orderData.paymentMethod.toUpperCase() + '\n';
        body += '- **Type:** ' + (orderData.formType === 'digital' ? 'Digital' : 'Physical') + '\n';
        body += '- **Date:** ' + new Date().toLocaleString() + '\n';

        var issueData = {
            title: 'New Order: ' + orderData.orderId,
            body: body,
            labels: ['order', orderData.formType, orderData.paymentMethod]
        };

        return fetch('https://api.github.com/repos/' + config.repo + '/issues', {
            method: 'POST',
            headers: {
                'Authorization': 'token ' + config.token,
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify(issueData)
        })
        .then(function(response) {
            if (response.ok) {
                console.log('GitHub issue created successfully');
                return response.json();
            } else {
                throw new Error('GitHub API error: ' + response.status);
            }
        })
        .catch(function(err) {
            console.error('Failed to create GitHub issue:', err);
            // Save to localStorage for retry later
            var failedOrders = JSON.parse(localStorage.getItem('failedGitHubOrders') || '[]');
            failedOrders.push(orderData);
            localStorage.setItem('failedGitHubOrders', JSON.stringify(failedOrders));
        });
    },

    submitOrder: function(formType) {
        var prefix = formType === 'digital' ? 'd.' : 'p.';
        
        // Get payment method from radio buttons
        var paymentMethod = document.querySelector('input[name="' + prefix + 'paymentMethod"]:checked');
        if (!paymentMethod) {
            this.showNotification('Please select a payment method', 'error');
            return;
        }
        var paymentValue = paymentMethod.value;

        var orderId = 'PV-' + Date.now().toString().slice(-6);
        
        // Get customer info
        var customerInfo = {
            name: document.getElementById(prefix + 'fullName').value,
            email: document.getElementById(prefix + 'email').value,
            phone: document.getElementById(prefix + 'phone').value
        };
        
        // Add shipping info only for physical products
        if (formType === 'physical') {
            customerInfo.address = document.getElementById(prefix + 'address').value;
            customerInfo.city = document.getElementById(prefix + 'city').value;
            customerInfo.province = document.getElementById(prefix + 'province').value;
            customerInfo.zipCode = document.getElementById(prefix + 'zipCode').value;
            customerInfo.barangay = document.getElementById(prefix + 'barangay') ? document.getElementById(prefix + 'barangay').value : '';
            customerInfo.instructions = document.getElementById(prefix + 'instructions') ? document.getElementById(prefix + 'instructions').value : '';
        }
        
        // Check for single product purchase
        var buyNowProduct = null;
        try {
            var stored = localStorage.getItem('buyNowProduct');
            if (stored) {
                buyNowProduct = JSON.parse(stored);
            }
        } catch(e) {}

        var orderItems, orderTotal;
        if (buyNowProduct) {
            var buyQty = buyNowProduct.quantity || 1;
            orderItems = [{name: buyNowProduct.name, price: buyNowProduct.price, quantity: buyQty, type: buyNowProduct.type, options: buyNowProduct.options || {}}];
            orderTotal = buyNowProduct.price * buyQty;
        } else {
            // Check for buy all pinned products
            var buyAllProducts = null;
            try {
                var storedAll = localStorage.getItem('buyAllProducts');
                if (storedAll) {
                    buyAllProducts = JSON.parse(storedAll);
                }
            } catch(e) {}

            if (buyAllProducts && buyAllProducts.length > 0) {
                orderItems = [];
                orderTotal = 0;
                for (var a = 0; a < buyAllProducts.length; a++) {
                    var ap = buyAllProducts[a];
                    orderItems.push({name: ap.name, price: ap.price, quantity: ap.quantity || 1, type: ap.type, options: ap.options || {}});
                    orderTotal += ap.price * (ap.quantity || 1);
                }
            } else {
                // No checkout data found
                this.showNotification('No items to checkout', 'error');
                return;
            }
        }

        // Build detailed items string for email
        var itemsList = [];
        for (var i = 0; i < orderItems.length; i++) {
            var item = orderItems[i];
            var itemText = item.name;
            var opts = formatOptions(item.options);
            if (opts) itemText += ' (' + opts + ')';
            itemText += ' x' + (item.quantity || 1) + ' - ₱' + (item.price * (item.quantity || 1)).toFixed(2);
            itemsList.push(itemText);
        }
        var itemsString = itemsList.join(' | ');

        // Populate hidden fields for FormSubmit
        var formId = prefix === 'd.' ? 'd.' : 'p.';
        var orderIdField = document.getElementById(formId + 'orderId');
        var itemsField = document.getElementById(formId + 'items');
        var totalField = document.getElementById(formId + 'total');
        if (orderIdField) orderIdField.value = orderId;
        if (itemsField) itemsField.value = itemsString;
        if (totalField) totalField.value = '₱' + orderTotal.toFixed(2);

        var orderData = {
            orderId: orderId,
            items: orderItems,
            paymentMethod: paymentValue,
            total: orderTotal,
            customerInfo: customerInfo,
            formType: formType
        };

        localStorage.setItem('lastOrder', JSON.stringify(orderData));
        this.navigateTo('payment');
        this.updatePaymentPage(orderData);
        
        // Send order to GitHub Issues + FormSubmit.co
        var self = this;
        var submitBtn = document.querySelector('#' + (prefix === 'd.' ? 'digital' : 'physical') + 'CheckoutForm .place-order-btn');

        // Disable button and show loading
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        }

        // Create GitHub Issue (primary)
        var githubPromise = this.createGitHubIssue(orderData);

        // Send StaticForms email (backup)
        var formEl = document.getElementById(prefix === 'd.' ? 'digitalCheckoutForm' : 'physicalCheckoutForm');
        var formSubmitPromise = Promise.resolve();
        if (formEl) {
            var subjectField = document.getElementById(formId + 'subject');
            if (subjectField) {
                subjectField.value = (formType === 'digital' ? 'New Digital Order' : 'New Physical Order') + ' - ' + orderId;
            }
            var formData = new FormData(formEl);
            // Convert FormData to JSON for StaticForms
            var formObject = {};
            formData.forEach(function(value, key) { formObject[key] = value; });
            formSubmitPromise = fetch('https://api.staticforms.dev/submit', {
                method: 'POST',
                body: JSON.stringify(formObject),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(function(response) {
                if (!response.ok) throw new Error('StaticForms failed');
                return true;
            })
            .catch(function(err) {
                console.error('StaticForms error:', err);
                return false;
            });
        }

        // Wait for both to complete
        Promise.all([githubPromise, formSubmitPromise])
        .then(function(results) {
            var githubOk = results[0] !== undefined; // resolved without error
            var formSubmitOk = results[1];

            if (githubOk || formSubmitOk) {
                self.showNotification('Order placed successfully! You will receive a notification.', 'success');
            } else {
                self.showNotification('Order placed but failed to notify seller. Order saved locally.', 'error');
            }

            // Restore button
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-lock"></i> Proceed to Payment';
            }
        });

        // Clear stored products
        localStorage.removeItem('buyNowProduct');
        localStorage.removeItem('buyAllProducts');
    },

    updatePaymentPage: function(orderData) {
        document.getElementById('orderId').textContent = orderData.orderId;

        var gcashPayment = document.getElementById('gcashPayment');
        var paypalPayment = document.getElementById('paypalPayment');

        if (orderData.paymentMethod === 'gcash') {
            gcashPayment.style.display = 'block';
            paypalPayment.style.display = 'none';
            document.getElementById('gcashAmount').textContent = '₱' + orderData.total.toFixed(2);
        } else {
            gcashPayment.style.display = 'none';
            paypalPayment.style.display = 'block';
            document.getElementById('paypalAmount').textContent = '₱' + orderData.total.toFixed(2);
        }
    },

    performSearch: function(query) {
        this.searchResults = [];
        for (var i = 0; i < categories.length; i++) {
            for (var j = 0; j < categories[i].products.length; j++) {
                var p = categories[i].products[j];
                var searchStr = (p.name + ' ' + p.description + ' ' + p.shortDescription + ' ' + categories[i].name).toLowerCase();
                if (searchStr.indexOf(query) > -1) {
                    this.searchResults.push({
                        id: p.id, name: p.name, shortDescription: p.shortDescription,
                        price: p.price, originalPrice: p.originalPrice, images: p.images,
                        type: p.type, categoryName: categories[i].name, categorySlug: categories[i].slug
                    });
                }
            }
        }
        this.showSearchResults(query);
    },

    showSearchResults: function(query) {
        this.showPage('category');
        document.getElementById('categoryName').textContent = 'Search Results for "' + query + '"';
        document.getElementById('categoryTitle').textContent = 'Search Results for "' + query + '"';
        document.getElementById('categoryDescription').textContent = 'Found ' + this.searchResults.length + ' products';

        var grid = document.getElementById('productsGrid');
        if (!grid) return;

        if (this.searchResults.length === 0) {
            grid.innerHTML = '<div class="empty-cart"><i class="fas fa-search"></i><h3>No results found</h3><p>Try searching for something else.</p><button class="btn btn-primary" onclick="app.navigateTo(\'home\')">Browse Categories</button></div>';
            return;
        }

        var html = '';
        for (var i = 0; i < this.searchResults.length; i++) {
            var p = this.searchResults[i];
            html += '<div class="product-card" data-id="' + p.id + '">';
            html += '<div class="product-card-image">';
            html += '<img src="' + p.images[0] + '" alt="' + p.name + '">';
            html += '<span class="product-badge ' + (p.type === 'digital' ? 'digital' : '') + '">' + (p.type === 'digital' ? 'Digital' : 'Physical') + '</span>';
            html += '</div>';
            html += '<div class="product-card-content">';
            html += '<h3 class="product-card-title">' + p.name + '</h3>';
            html += '<p class="product-card-description">' + p.shortDescription + '</p>';
            html += '<div class="product-card-price">';
            html += '<span class="current-price">₱' + p.price.toFixed(2) + '</span>';
            if (p.originalPrice) html += '<span class="original-price">₱' + p.originalPrice.toFixed(2) + '</span>';
            html += '</div>';
            html += '<div class="product-card-actions">';
            var isPinned = pinned.isPinned(p.id);
            html += '<button class="btn ' + (isPinned ? 'btn-pinned' : 'btn-primary') + ' btn-sm" onclick="app.togglePin(' + p.id + ')"><i class="fas fa-thumbtack"></i> ' + (isPinned ? 'Pinned' : 'Pin') + '</button>';
            html += '<button class="btn btn-secondary btn-sm" onclick="app.buyNow(' + p.id + ')"><i class="fas fa-bolt"></i> Buy Now</button>';
            html += '</div></div></div>';
        }

        grid.innerHTML = html;
        history.pushState(null, '', '#search?q=' + encodeURIComponent(query));
    },

    showNotification: function(message, type) {
        type = type || 'success';
        var notification = document.getElementById('notification');
        var msgEl = document.getElementById('notificationMessage');
        if (!notification || !msgEl) return;

        msgEl.textContent = message;
        if (type === 'error') {
            notification.style.background = '#e74c3c';
        } else if (type === 'warning') {
            notification.style.background = '#f39c12';
        } else {
            notification.style.background = '#2ecc71';
        }
        notification.classList.add('show');

        setTimeout(function() {
            notification.classList.remove('show');
        }, 3000);
    },

    updateLedSeparator: function(isHome) {
        var wrapper = document.querySelector('.led-separator-wrapper');
        if (wrapper) {
            if (isHome) {
                wrapper.classList.add('no-space');
            } else {
                wrapper.classList.remove('no-space');
            }
        }
    },

    copyToClipboard: function(text) {
        var self = this;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function() {
                self.showNotification('Copied to clipboard!');
            }).catch(function() {
                self.fallbackCopy(text);
            });
        } else {
            self.fallbackCopy(text);
        }
    },

    fallbackCopy: function(text) {
        var self = this;
        var textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            self.showNotification('Copied to clipboard!');
        } catch (e) {
            self.showNotification('Failed to copy', 'error');
        }
        document.body.removeChild(textarea);
    },

    downloadReceipt: function() {
        var self = this;
        var orderData = null;
        try {
            var stored = localStorage.getItem('lastOrder');
            if (stored) orderData = JSON.parse(stored);
        } catch(e) {}

        if (!orderData) {
            this.showNotification('No order data found', 'error');
            return;
        }

        var now = new Date();
        var dateStr = now.toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' });
        var timeStr = now.toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        var paymentMethod = orderData.paymentMethod === 'gcash' ? 'GCash' : 'PayPal';
        var customerName = orderData.customerInfo ? orderData.customerInfo.name : 'N/A';
        var customerEmail = orderData.customerInfo ? orderData.customerInfo.email : 'N/A';
        var customerPhone = orderData.customerInfo ? orderData.customerInfo.phone : 'N/A';

        var total = 0;
        for (var i = 0; i < orderData.items.length; i++) {
            total += orderData.items[i].price * (orderData.items[i].quantity || 1);
        }

        // Create canvas
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var w = 800;
        var headerH = 140;
        var statusH = 60;
        var infoH = 120;
        var tableHeaderH = 45;
        var tableRowH = 40;
        var tableH = tableHeaderH + (orderData.items.length * tableRowH) + 10;
        var totalH = 90;
        var paymentH = 80;
        var noteH = 80;
        var footerH = 100;
        var h = headerH + statusH + 30 + infoH + 30 + tableH + 20 + totalH + 20 + paymentH + 20 + noteH + footerH;

        canvas.width = w;
        canvas.height = h;

        // Background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);

        // Header background
        var grad = ctx.createLinearGradient(0, 0, w, 0);
        grad.addColorStop(0, '#0f172a');
        grad.addColorStop(0.5, '#1e3a5f');
        grad.addColorStop(1, '#1e5799');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, headerH);

        // Header accent line
        var accentGrad = ctx.createLinearGradient(0, 0, w, 0);
        accentGrad.addColorStop(0, '#3b82f6');
        accentGrad.addColorStop(0.25, '#06b6d4');
        accentGrad.addColorStop(0.5, '#10b981');
        accentGrad.addColorStop(0.75, '#f59e0b');
        accentGrad.addColorStop(1, '#3b82f6');
        ctx.fillStyle = accentGrad;
        ctx.fillRect(0, headerH - 4, w, 4);

        // Brand name
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 32px Arial, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('PrintVerse', 40, 60);

        // Tagline
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = '12px Arial, sans-serif';
        ctx.fillText('PRINT YOUR IMAGINATION', 40, 80);

        // Receipt label
        ctx.fillStyle = 'rgba(255,255,255,0.1)';
        roundRect(ctx, 40, 95, 140, 30, 6);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = '11px Arial, sans-serif';
        ctx.fillText('ORDER RECEIPT', 55, 115);

        // Order ID badge
        ctx.fillStyle = 'rgba(255,255,255,0.1)';
        roundRect(ctx, w - 180, 30, 140, 50, 8);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = '10px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('RECEIPT NO.', w - 110, 50);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Arial, sans-serif';
        ctx.fillText(orderData.orderId, w - 110, 72);
        ctx.textAlign = 'left';

        // Status bar
        var sy = headerH + 15;
        ctx.fillStyle = '#f8fafc';
        roundRect(ctx, 40, sy, w - 80, statusH - 10, 8);
        ctx.fill();
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;
        roundRect(ctx, 40, sy, w - 80, statusH - 10, 8);
        ctx.stroke();

        // Status items
        var statusItems = [
            { icon: 'DATE', value: dateStr },
            { icon: 'TIME', value: timeStr },
            { icon: 'PAYMENT', value: paymentMethod }
        ];
        for (var s = 0; s < statusItems.length; s++) {
            var sx = 70 + (s * 230);
            ctx.fillStyle = '#6b7280';
            ctx.font = '10px Arial, sans-serif';
            ctx.fillText(statusItems[s].icon, sx, sy + 20);
            ctx.fillStyle = '#111827';
            ctx.font = 'bold 13px Arial, sans-serif';
            ctx.fillText(statusItems[s].value, sx, sy + 40);
        }

        // Info section
        var iy = headerH + statusH + 20;
        
        // Customer info card
        ctx.fillStyle = '#f8fafc';
        roundRect(ctx, 40, iy, (w - 100) / 2, infoH, 10);
        ctx.fill();
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;
        roundRect(ctx, 40, iy, (w - 100) / 2, infoH, 10);
        ctx.stroke();

        ctx.fillStyle = '#6b7280';
        ctx.font = 'bold 10px Arial, sans-serif';
        ctx.fillText('BILL TO', 60, iy + 25);

        ctx.fillStyle = '#e5e7eb';
        ctx.beginPath();
        ctx.moveTo(60, iy + 35);
        ctx.lineTo(40 + (w - 100) / 2 - 20, iy + 35);
        ctx.stroke();

        ctx.fillStyle = '#9ca3af';
        ctx.font = '11px Arial, sans-serif';
        ctx.fillText('Name', 60, iy + 55);
        ctx.fillStyle = '#111827';
        ctx.font = 'bold 12px Arial, sans-serif';
        ctx.fillText(customerName, 130, iy + 55);

        ctx.fillStyle = '#9ca3af';
        ctx.font = '11px Arial, sans-serif';
        ctx.fillText('Email', 60, iy + 75);
        ctx.fillStyle = '#111827';
        ctx.font = '12px Arial, sans-serif';
        ctx.fillText(customerEmail, 130, iy + 75);

        ctx.fillStyle = '#9ca3af';
        ctx.font = '11px Arial, sans-serif';
        ctx.fillText('Phone', 60, iy + 95);
        ctx.fillStyle = '#111827';
        ctx.font = '12px Arial, sans-serif';
        ctx.fillText(customerPhone, 130, iy + 95);

        // Order details card
        var odx = 40 + (w - 100) / 2 + 20;
        ctx.fillStyle = '#f8fafc';
        roundRect(ctx, odx, iy, (w - 100) / 2, infoH, 10);
        ctx.fill();
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;
        roundRect(ctx, odx, iy, (w - 100) / 2, infoH, 10);
        ctx.stroke();

        ctx.fillStyle = '#6b7280';
        ctx.font = 'bold 10px Arial, sans-serif';
        ctx.fillText('ORDER DETAILS', odx + 20, iy + 25);

        ctx.fillStyle = '#e5e7eb';
        ctx.beginPath();
        ctx.moveTo(odx + 20, iy + 35);
        ctx.lineTo(odx + (w - 100) / 2 - 20, iy + 35);
        ctx.stroke();

        ctx.fillStyle = '#9ca3af';
        ctx.font = '11px Arial, sans-serif';
        ctx.fillText('Order ID', odx + 20, iy + 55);
        ctx.fillStyle = '#3b82f6';
        ctx.font = 'bold 12px Arial, sans-serif';
        ctx.fillText(orderData.orderId, odx + 120, iy + 55);

        ctx.fillStyle = '#9ca3af';
        ctx.font = '11px Arial, sans-serif';
        ctx.fillText('Items', odx + 20, iy + 75);
        ctx.fillStyle = '#111827';
        ctx.font = '12px Arial, sans-serif';
        ctx.fillText(orderData.items.length + ' item(s)', odx + 120, iy + 75);

        ctx.fillStyle = '#9ca3af';
        ctx.font = '11px Arial, sans-serif';
        ctx.fillText('Status', odx + 20, iy + 95);
        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 12px Arial, sans-serif';
        ctx.fillText('Pending Payment', odx + 120, iy + 95);

        // Items table
        var ty = iy + infoH + 25;

        // Table header
        var tableGrad = ctx.createLinearGradient(0, 0, w, 0);
        tableGrad.addColorStop(0, '#0f172a');
        tableGrad.addColorStop(1, '#1e3a5f');
        ctx.fillStyle = tableGrad;
        roundRect(ctx, 40, ty, w - 80, tableHeaderH, 10);
        ctx.fill();
        // Fix bottom corners
        ctx.fillRect(40, ty + 20, w - 80, tableHeaderH - 20);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px Arial, sans-serif';
        ctx.fillText('ITEM DESCRIPTION', 60, ty + 28);
        ctx.textAlign = 'center';
        ctx.fillText('QTY', 400, ty + 28);
        ctx.textAlign = 'right';
        ctx.fillText('PRICE', 540, ty + 28);
        ctx.fillText('AMOUNT', w - 60, ty + 28);
        ctx.textAlign = 'left';

        // Table rows
        var rowY = ty + tableHeaderH;
        for (var r = 0; r < orderData.items.length; r++) {
            var item = orderData.items[r];
            var itemTotal = item.price * (item.quantity || 1);

            // Alternating row background
            if (r % 2 === 0) {
                ctx.fillStyle = '#f9fafb';
                ctx.fillRect(40, rowY, w - 80, tableRowH);
            }

            // Row border
            ctx.strokeStyle = '#e5e7eb';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(40, rowY + tableRowH);
            ctx.lineTo(w - 40, rowY + tableRowH);
            ctx.stroke();

            ctx.fillStyle = '#111827';
            ctx.font = '13px Arial, sans-serif';
            ctx.fillText(item.name, 60, rowY + 26);

            ctx.fillStyle = '#6b7280';
            ctx.font = '13px Arial, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText((item.quantity || 1).toString(), 400, rowY + 26);

            ctx.textAlign = 'right';
            ctx.fillText('₱' + item.price.toFixed(2), 540, rowY + 26);

            ctx.fillStyle = '#111827';
            ctx.font = 'bold 13px Arial, sans-serif';
            ctx.fillText('₱' + itemTotal.toFixed(2), w - 60, rowY + 26);

            ctx.textAlign = 'left';
            rowY += tableRowH;
        }

        // Total section
        var totalY = ty + tableH + 10;
        var totalGrad = ctx.createLinearGradient(0, 0, w, 0);
        totalGrad.addColorStop(0, '#0f172a');
        totalGrad.addColorStop(1, '#1e3a5f');
        ctx.fillStyle = totalGrad;
        roundRect(ctx, 40, totalY, w - 80, totalH, 12);
        ctx.fill();

        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.font = '14px Arial, sans-serif';
        ctx.fillText('Total Amount Due', 60, totalY + 45);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 32px Arial, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('₱' + total.toFixed(2), w - 60, totalY + 50);
        ctx.textAlign = 'left';

        // Payment card
        var payY = totalY + totalH + 15;
        ctx.fillStyle = '#f8fafc';
        roundRect(ctx, 40, payY, w - 80, paymentH, 10);
        ctx.fill();
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;
        roundRect(ctx, 40, payY, w - 80, paymentH, 10);
        ctx.stroke();

        // Payment icon box
        ctx.fillStyle = orderData.paymentMethod === 'gcash' ? '#007dfe' : '#003087';
        roundRect(ctx, 60, payY + 15, 50, 50, 10);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 18px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(orderData.paymentMethod === 'gcash' ? 'G' : 'P', 85, payY + 48);
        ctx.textAlign = 'left';

        ctx.fillStyle = '#111827';
        ctx.font = 'bold 14px Arial, sans-serif';
        ctx.fillText(paymentMethod, 130, payY + 35);
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px Arial, sans-serif';
        ctx.fillText('Scan QR code or use account details to pay', 130, payY + 55);

        // Note section
        var noteY = payY + paymentH + 15;
        ctx.fillStyle = '#fffbeb';
        roundRect(ctx, 40, noteY, w - 80, noteH, 10);
        ctx.fill();
        ctx.strokeStyle = '#fde68a';
        ctx.lineWidth = 1;
        roundRect(ctx, 40, noteY, w - 80, noteH, 10);
        ctx.stroke();

        // Note icon
        ctx.fillStyle = '#f59e0b';
        roundRect(ctx, 60, noteY + 15, 30, 30, 6);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('!', 75, noteY + 36);
        ctx.textAlign = 'left';

        ctx.fillStyle = '#92400e';
        ctx.font = 'bold 12px Arial, sans-serif';
        ctx.fillText('Important Instructions', 100, noteY + 30);
        ctx.fillStyle = '#a16207';
        ctx.font = '11px Arial, sans-serif';
        ctx.fillText('Complete payment within 24 hours. Send screenshot to Facebook Messenger.', 100, noteY + 50);
        ctx.fillText('Your order will be processed once payment is verified.', 100, noteY + 65);

        // Footer
        var footerY = h - footerH;
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, footerY, w, footerH);

        // Footer top line
        var footLineGrad = ctx.createLinearGradient(0, 0, w, 0);
        footLineGrad.addColorStop(0, 'transparent');
        footLineGrad.addColorStop(0.5, '#3b82f6');
        footLineGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = footLineGrad;
        ctx.fillRect(80, footerY, w - 160, 2);

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 16px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('PrintVerse', w / 2, footerY + 30);

        ctx.fillStyle = '#9ca3af';
        ctx.font = '10px Arial, sans-serif';
        ctx.fillText('PRINT YOUR IMAGINATION', w / 2, footerY + 48);

        ctx.fillStyle = '#9ca3af';
        ctx.font = '10px Arial, sans-serif';
        ctx.fillText('Generated on ' + dateStr + ' at ' + timeStr, w / 2, footerY + 70);
        ctx.textAlign = 'left';

        // Download as JPG
        canvas.toBlob(function(blob) {
            var url = URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = url;
            link.download = 'PrintVerse-Receipt-' + orderData.orderId + '.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            self.showNotification('Receipt downloaded!');
        }, 'image/jpeg', 0.95);
    }
};

function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

// Initialize app on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    app.init();
});

// Handle browser back/forward
window.addEventListener('popstate', function() {
    app.handleInitialRoute();
});
