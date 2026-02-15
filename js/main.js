/**
 * MAIN.JS - Core Application Logic
 * Handles navigation, smooth scrolling, and initialization
 */

(function() {
    'use strict';

    // ===================================
    // INITIALIZATION
    // ===================================
    
    document.addEventListener('DOMContentLoaded', initApp);

    function initApp() {
        initNavigation();
        initSmoothScroll();
        initScrollSpy();
        initLazyLoading();
        loadFeaturedWorks();
        loadPortfolioItems();
        initIntersectionObserver();
    }

    // ===================================
    // NAVIGATION
    // ===================================

    function initNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        const nav = document.querySelector('.main-nav');

        // Mobile menu toggle
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }

        // Close mobile menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle?.classList.remove('active');
            });
        });

        // Navbar scroll effect
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                nav.classList.remove('scroll-up');
                return;
            }
            
            if (currentScroll > lastScroll && !navMenu.classList.contains('active')) {
                // Scroll down
                nav.style.transform = 'translateY(-100%)';
            } else {
                // Scroll up
                nav.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }

    // ===================================
    // SMOOTH SCROLLING
    // ===================================

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed nav
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ===================================
    // SCROLL SPY (Active Nav Link)
    // ===================================

    function initScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ===================================
    // LAZY LOADING IMAGES
    // ===================================

    function initLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    // ===================================
    // INTERSECTION OBSERVER (Animations)
    // ===================================

    function initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements that should animate in
        document.querySelectorAll('.featured-item, .masonry-item, .about-content, .studio-gallery img').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Add visible class styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ===================================
    // LOAD FEATURED WORKS
    // ===================================

    function loadFeaturedWorks() {
        const featuredGrid = document.querySelector('.featured-grid');
        if (!featuredGrid) return;

        // Your featured works - showcasing best from each series
        const featuredWorks = [
            {
                id: 5,
                title: 'Glitch Matrix',
                series: 'interference-code',
                image: './assets/portfolio/interference-05.jpg',
                description: 'Orange and blue geometric blocks with cryptic symbol marks revealing digital artifacts and structural decay.'
            },
            {
                id: 6,
                title: 'Void Constellation',
                series: 'neon-noir',
                image: './assets/portfolio/neon-01.jpg',
                description: 'Dark violet abyss punctured by explosive white splatter bursts forming a cosmic map against the darkness.'
            },
            {
                id: 9,
                title: 'Kinetic Horizon',
                series: 'full-spectrum-static',
                image: './assets/portfolio/spectrum-01.jpg',
                description: 'Wide panoramic energy field with dense multi-color splatter and kinetic white drip trajectories.'
            }
        ];

        featuredWorks.forEach(work => {
            const item = createFeaturedItem(work);
            featuredGrid.appendChild(item);
        });
    }

    function createFeaturedItem(work) {
        const item = document.createElement('div');
        item.className = 'featured-item';
        item.dataset.series = work.series;
        item.dataset.workId = work.id;
        
        item.innerHTML = `
            <img src="${work.image}" alt="${work.title}" loading="lazy">
            <div class="featured-overlay">
                <h3>${work.title}</h3>
                <p>${work.description}</p>
            </div>
        `;
        
        item.addEventListener('click', () => {
            window.lightboxManager?.open(work.id);
        });
        
        return item;
    }

    // ===================================
    // LOAD PORTFOLIO ITEMS
    // ===================================

    function loadPortfolioItems() {
        const masonryGrid = document.getElementById('masonryGrid');
        if (!masonryGrid) return;

        // Your actual portfolio artwork data - 21 works
        const portfolioData = {
            'interference-code': [
                { id: 1, title: 'Frequency Drift', image: './assets/portfolio/interference-01.jpg', dimensions: '24x36"', medium: 'Acrylic on Canvas', year: 2026, description: 'Yellow and blue scraped geometries revealing structural decay and analog signal degradation' },
                { id: 2, title: 'Signal Decay', image: './assets/portfolio/interference-02.jpg', dimensions: '18x24"', medium: 'Acrylic on Canvas', year: 2025, description: 'Blue and orange architectural grid fragmenting into atmospheric depth' },
                { id: 3, title: 'Static Membrane', image: './assets/portfolio/interference-03.jpg', dimensions: '24x36"', medium: 'Acrylic on Canvas', year: 2025, description: 'Pink and grey scraped layers forming a tactile interference pattern' },
                { id: 4, title: 'Data Erosion', image: './assets/portfolio/interference-04.jpg', dimensions: '24x36"', medium: 'Acrylic on Canvas', year: 2026, description: 'Multi-color grid experiencing systematic breakdown and pixel corruption' },
                { id: 5, title: 'Glitch Matrix', image: './assets/portfolio/interference-05.jpg', dimensions: '20x24"', medium: 'Acrylic on Canvas', year: 2025, description: 'Orange and blue geometric blocks with cryptic symbol marks and digital artifacts' },
                { id: 13, title: 'Code Fragment', image: './assets/portfolio/interference-06.jpg', dimensions: '24x30"', medium: 'Acrylic on Canvas', year: 2026, description: 'Numeric sequences and geometric blocks emerging from layered digital substrate' },
                { id: 14, title: 'Grid Collapse', image: './assets/portfolio/interference-07.jpg', dimensions: '24x30"', medium: 'Acrylic on Canvas', year: 2025, description: 'Earthy tones with systematic grid breakdown revealing deeper architectural layers' },
                { id: 15, title: 'Metallic Drift', image: './assets/portfolio/interference-08.jpg', dimensions: '16x20"', medium: 'Acrylic on Canvas', year: 2026, description: 'Silver scraped surface with vibrant color disruptions and metallic texture' },
                { id: 22, title: 'Blue Monolith', image: './assets/portfolio/blue-monolith.png', dimensions: '24x36"', medium: 'Acrylic on Canvas', year: 2026, description: 'Dynamic interplay of blues, blacks, and white—structural grids cutting through layered topography and organic splatters' }
            ],
            'neon-noir': [
                { id: 6, title: 'Void Constellation', image: './assets/portfolio/neon-01.jpg', dimensions: '36x48"', medium: 'Acrylic on Canvas', year: 2026, description: 'Dark violet abyss punctured by explosive white splatter bursts forming a cosmic map' },
                { id: 7, title: 'Midnight Trajectory', image: './assets/portfolio/neon-02.jpg', dimensions: '24x36"', medium: 'Acrylic on Canvas', year: 2026, description: 'Deep nocturnal void with luminous yellow and white velocity lines cutting through darkness' },
                { id: 8, title: 'Cosmic Debris', image: './assets/portfolio/neon-03.jpg', dimensions: '24x36"', medium: 'Acrylic on Canvas', year: 2025, description: 'Dark earthy void scattered with explosive multi-color splatter remnants' },
                { id: 16, title: 'Vertical Cascade', image: './assets/portfolio/neon-04.jpg', dimensions: '20x36"', medium: 'Acrylic on Canvas', year: 2026, description: 'Dark vertical field with explosive multi-color splatter cascade and white velocity lines' },
                { id: 17, title: 'Nightfall Scatter', image: './assets/portfolio/neon-05.jpg', dimensions: '16x16"', medium: 'Acrylic on Canvas', year: 2025, description: 'Deep brown nocturnal void with pink and cyan scatter patterns against darkness' }
            ],
            'full-spectrum-static': [
                { id: 9, title: 'Kinetic Horizon', image: './assets/portfolio/spectrum-01.jpg', dimensions: '36x60"', medium: 'Acrylic on Canvas', year: 2026, description: 'Wide panoramic energy field with dense multi-color splatter and white drip trajectories' },
                { id: 10, title: 'Layered Velocity', image: './assets/portfolio/spectrum-02.jpg', dimensions: '24x36"', medium: 'Acrylic on Canvas', year: 2025, description: 'Vertical composition documenting accelerated time through earth tones and vibrant accents' },
                { id: 11, title: 'Chromatic Density', image: './assets/portfolio/spectrum-03.jpg', dimensions: '24x36"', medium: 'Acrylic on Canvas', year: 2026, description: 'Dense all-over saturation with pink magenta highlights rupturing through the surface' },
                { id: 12, title: 'Compressed Energy', image: './assets/portfolio/spectrum-04.jpg', dimensions: '12x12"', medium: 'Acrylic on Canvas', year: 2025, description: 'Intimate square format containing dark atmospheric density and restrained power' },
                { id: 18, title: 'Chromatic Burst', image: './assets/portfolio/spectrum-05.jpg', dimensions: '24x24"', medium: 'Acrylic on Canvas', year: 2026, description: 'Square format with explosive all-over color density and white splatter trajectories' },
                { id: 19, title: 'Dual Force', image: './assets/portfolio/spectrum-06.jpg', dimensions: '20x30"', medium: 'Acrylic on Canvas', year: 2026, description: 'Vertical diptych energy with contrasting dark and light atmospheric forces' },
                { id: 20, title: 'Silver Rupture', image: './assets/portfolio/spectrum-07.jpg', dimensions: '16x16"', medium: 'Acrylic on Canvas', year: 2025, description: 'Metallic silver base ruptured by vibrant orange, green, and red color bursts' },
                { id: 21, title: 'Luminous Descent', image: './assets/portfolio/spectrum-08.jpg', dimensions: '20x30"', medium: 'Acrylic on Canvas', year: 2026, description: 'Vertical gradient from luminous yellow to purple with drip patterns and textural depth' }
            ]
        };

        // Flatten all portfolio items
        window.portfolioItems = [];
        Object.keys(portfolioData).forEach(series => {
            portfolioData[series].forEach(item => {
                item.series = series;
                window.portfolioItems.push(item);
            });
        });

        // Render all items
        renderPortfolioItems(window.portfolioItems);

        // Initialize series filter
        initSeriesFilter();
    }

    function renderPortfolioItems(items) {
        const masonryGrid = document.getElementById('masonryGrid');
        masonryGrid.innerHTML = '';

        items.forEach(item => {
            const element = createMasonryItem(item);
            masonryGrid.appendChild(element);
        });
    }

    function createMasonryItem(item) {
        const div = document.createElement('div');
        div.className = 'masonry-item';
        div.dataset.series = item.series;
        div.dataset.workId = item.id;
        
        div.innerHTML = `
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="macro-overlay"></div>
        `;
        
        // Click to open lightbox
        div.addEventListener('click', () => {
            window.lightboxManager?.open(item.id);
        });

        // Macro hover effect
        const img = div.querySelector('img');
        const overlay = div.querySelector('.macro-overlay');
        
        div.addEventListener('mousemove', (e) => {
            const rect = div.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            overlay.style.left = `${x - 100}px`;
            overlay.style.top = `${y - 100}px`;
            overlay.style.backgroundImage = `url(${item.image})`;
            overlay.style.backgroundPosition = `${-x * 2 + 100}px ${-y * 2 + 100}px`;
        });
        
        return div;
    }

    // ===================================
    // SERIES FILTER
    // ===================================

    function initSeriesFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const masonryItems = document.querySelectorAll('.masonry-item');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter items
                const filter = btn.dataset.filter;
                
                masonryItems.forEach(item => {
                    if (filter === 'all' || item.dataset.series === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(30px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ===================================
    // PERFORMANCE OPTIMIZATION
    // ===================================

    // Debounce function for scroll events
    function debounce(func, wait = 10) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function for mousemove events
    function throttle(func, limit = 16) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

})();
