/**
 * MASONRY.JS - Masonry Grid Layout Handler
 * Handles dynamic masonry grid with responsive columns
 */

(function() {
    'use strict';

    class MasonryGrid {
        constructor(container, options = {}) {
            this.container = container;
            this.items = [];
            this.columns = options.columns || this.getColumnCount();
            this.gap = options.gap || 16;
            
            this.init();
        }

        init() {
            window.addEventListener('resize', this.debounce(() => {
                const newColumns = this.getColumnCount();
                if (newColumns !== this.columns) {
                    this.columns = newColumns;
                    this.layout();
                }
            }, 250));
        }

        getColumnCount() {
            const width = window.innerWidth;
            if (width >= 1200) return 3;
            if (width >= 768) return 2;
            return 1;
        }

        addItem(element) {
            this.items.push(element);
        }

        layout() {
            // CSS column-count handles the layout automatically
            // This method is for future enhancements if needed
            this.container.style.columnCount = this.columns;
            this.container.style.columnGap = `${this.gap}px`;
        }

        refresh() {
            this.items = Array.from(this.container.children);
            this.layout();
        }

        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), wait);
            };
        }
    }

    // Initialize masonry grid when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        const masonryContainer = document.getElementById('masonryGrid');
        if (masonryContainer) {
            window.masonryGrid = new MasonryGrid(masonryContainer);
        }
    });

})();
