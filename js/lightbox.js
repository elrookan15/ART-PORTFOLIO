/**
 * LIGHTBOX.JS - Advanced Lightbox with Deep Zoom & Pan
 * Provides immersive viewing experience with texture detail exploration
 */

(function() {
    'use strict';

    class LightboxManager {
        constructor() {
            this.lightbox = document.getElementById('lightbox');
            this.lightboxImage = document.getElementById('lightboxImage');
            this.lightboxTitle = document.getElementById('lightboxTitle');
            this.lightboxDescription = document.getElementById('lightboxDescription');
            this.lightboxDetails = document.getElementById('lightboxDetails');
            this.closeBtn = document.querySelector('.lightbox-close');
            this.prevBtn = document.querySelector('.lightbox-prev');
            this.nextBtn = document.querySelector('.lightbox-next');
            
            this.currentIndex = 0;
            this.isZoomed = false;
            this.isPanning = false;
            this.panStart = { x: 0, y: 0 };
            this.panOffset = { x: 0, y: 0 };
            this.currentScale = 1;
            
            this.init();
        }

        init() {
            // Close button
            this.closeBtn?.addEventListener('click', () => this.close());
            
            // Navigation buttons
            this.prevBtn?.addEventListener('click', () => this.navigate(-1));
            this.nextBtn?.addEventListener('click', () => this.navigate(1));
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (!this.lightbox.classList.contains('active')) return;
                
                switch(e.key) {
                    case 'Escape':
                        this.close();
                        break;
                    case 'ArrowLeft':
                        this.navigate(-1);
                        break;
                    case 'ArrowRight':
                        this.navigate(1);
                        break;
                    case 'z':
                    case 'Z':
                        this.toggleZoom();
                        break;
                }
            });
            
            // Click outside to close
            this.lightbox?.addEventListener('click', (e) => {
                if (e.target === this.lightbox) {
                    this.close();
                }
            });
            
            // Image zoom toggle
            this.lightboxImage?.addEventListener('click', (e) => {
                if (!this.isZoomed) {
                    this.zoomIn(e);
                } else {
                    this.zoomOut();
                }
            });
            
            // Pan functionality
            this.initPanControls();
            
            // Disable body scroll when lightbox is open
            this.lightbox?.addEventListener('transitionend', () => {
                if (this.lightbox.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
        }

        initPanControls() {
            this.lightboxImage?.addEventListener('mousedown', (e) => {
                if (!this.isZoomed) return;
                
                e.preventDefault();
                this.isPanning = true;
                this.panStart.x = e.clientX - this.panOffset.x;
                this.panStart.y = e.clientY - this.panOffset.y;
                this.lightboxImage.style.cursor = 'grabbing';
            });

            document.addEventListener('mousemove', (e) => {
                if (!this.isPanning) return;
                
                e.preventDefault();
                this.panOffset.x = e.clientX - this.panStart.x;
                this.panOffset.y = e.clientY - this.panStart.y;
                
                this.updateImageTransform();
            });

            document.addEventListener('mouseup', () => {
                if (this.isPanning) {
                    this.isPanning = false;
                    if (this.isZoomed) {
                        this.lightboxImage.style.cursor = 'zoom-out';
                    }
                }
            });

            // Touch support for mobile
            this.lightboxImage?.addEventListener('touchstart', (e) => {
                if (!this.isZoomed || e.touches.length !== 1) return;
                
                const touch = e.touches[0];
                this.isPanning = true;
                this.panStart.x = touch.clientX - this.panOffset.x;
                this.panStart.y = touch.clientY - this.panOffset.y;
            });

            this.lightboxImage?.addEventListener('touchmove', (e) => {
                if (!this.isPanning || e.touches.length !== 1) return;
                
                e.preventDefault();
                const touch = e.touches[0];
                this.panOffset.x = touch.clientX - this.panStart.x;
                this.panOffset.y = touch.clientY - this.panStart.y;
                
                this.updateImageTransform();
            });

            this.lightboxImage?.addEventListener('touchend', () => {
                this.isPanning = false;
            });
        }

        open(workId) {
            const items = window.portfolioItems || [];
            const item = items.find(i => i.id === workId);
            
            if (!item) return;
            
            this.currentIndex = items.indexOf(item);
            this.loadImage(item);
            this.lightbox.style.display = 'flex';
            
            // Trigger reflow for animation
            setTimeout(() => {
                this.lightbox.classList.add('active');
            }, 10);
        }

        close() {
            this.lightbox.classList.remove('active');
            this.resetZoom();
            
            setTimeout(() => {
                this.lightbox.style.display = 'none';
            }, 300);
        }

        navigate(direction) {
            const items = window.portfolioItems || [];
            this.currentIndex = (this.currentIndex + direction + items.length) % items.length;
            this.loadImage(items[this.currentIndex]);
            this.resetZoom();
        }

        loadImage(item) {
            // Show loading state
            this.lightboxImage.style.opacity = '0';
            
            // Load image
            const img = new Image();
            img.onload = () => {
                this.lightboxImage.src = item.image;
                this.lightboxImage.alt = item.title;
                this.lightboxImage.style.opacity = '1';
            };
            img.src = item.image;
            
            // Update info
            this.lightboxTitle.textContent = item.title;
            this.lightboxDescription.textContent = item.description || 'Abstract expressionism artwork featuring visceral texture and kinetic energy.';
            
            this.lightboxDetails.innerHTML = `
                <p><strong>Series:</strong> ${this.formatSeriesName(item.series)}</p>
                <p><strong>Medium:</strong> ${item.medium}</p>
                <p><strong>Dimensions:</strong> ${item.dimensions}</p>
                <p><strong>Year:</strong> ${item.year}</p>
            `;
        }

        formatSeriesName(series) {
            const names = {
                'interference-code': 'Interference Code',
                'neon-noir': 'Neon Noir',
                'full-spectrum-static': 'Full Spectrum Static'
            };
            return names[series] || series;
        }

        toggleZoom() {
            if (this.isZoomed) {
                this.zoomOut();
            } else {
                this.zoomIn();
            }
        }

        zoomIn(event) {
            this.isZoomed = true;
            this.currentScale = 2;
            
            // If event is provided, zoom to that point
            if (event && event.clientX && event.clientY) {
                const rect = this.lightboxImage.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                
                // Calculate pan offset to zoom to click point
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                this.panOffset.x = (centerX - x) * this.currentScale;
                this.panOffset.y = (centerY - y) * this.currentScale;
            }
            
            this.lightboxImage.classList.add('zoomed');
            this.lightboxImage.style.cursor = 'zoom-out';
            this.updateImageTransform();
        }

        zoomOut() {
            this.isZoomed = false;
            this.currentScale = 1;
            this.panOffset = { x: 0, y: 0 };
            
            this.lightboxImage.classList.remove('zoomed');
            this.lightboxImage.style.cursor = 'zoom-in';
            this.updateImageTransform();
        }

        resetZoom() {
            this.isZoomed = false;
            this.currentScale = 1;
            this.panOffset = { x: 0, y: 0 };
            this.lightboxImage.classList.remove('zoomed');
            this.lightboxImage.style.cursor = 'zoom-in';
            this.lightboxImage.style.transform = '';
        }

        updateImageTransform() {
            const transform = `scale(${this.currentScale}) translate(${this.panOffset.x}px, ${this.panOffset.y}px)`;
            this.lightboxImage.style.transform = transform;
        }
    }

    // Initialize lightbox when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        window.lightboxManager = new LightboxManager();
    });

})();
