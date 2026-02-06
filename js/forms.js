/**
 * FORMS.JS - Form Handling with Security & Validation
 * Handles contact form, newsletter signup, and viewing room authentication
 */

(function() {
    'use strict';

    // ===================================
    // FORM VALIDATION UTILITIES
    // ===================================

    const Validator = {
        email: (email) => {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },
        
        name: (name) => {
            return name.trim().length >= 2;
        },
        
        message: (message) => {
            return message.trim().length >= 10;
        },
        
        sanitize: (input) => {
            const div = document.createElement('div');
            div.textContent = input;
            return div.innerHTML;
        }
    };

    // ===================================
    // CONTACT FORM
    // ===================================

    class ContactForm {
        constructor(formId) {
            this.form = document.getElementById(formId);
            if (!this.form) return;
            
            this.init();
        }

        init() {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            
            // Real-time validation
            const inputs = this.form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
            });
        }

        validateField(field) {
            const value = field.value.trim();
            let isValid = true;
            let errorMessage = '';

            switch(field.type) {
                case 'email':
                    isValid = Validator.email(value);
                    errorMessage = 'Please enter a valid email address.';
                    break;
                case 'text':
                    if (field.id === 'name') {
                        isValid = Validator.name(value);
                        errorMessage = 'Name must be at least 2 characters.';
                    }
                    break;
                case 'textarea':
                    isValid = Validator.message(value);
                    errorMessage = 'Message must be at least 10 characters.';
                    break;
                case 'select-one':
                    isValid = value !== '';
                    errorMessage = 'Please select an inquiry type.';
                    break;
            }

            this.showFieldError(field, isValid, errorMessage);
            return isValid;
        }

        showFieldError(field, isValid, message) {
            // Remove existing error
            const existingError = field.parentElement.querySelector('.field-error');
            if (existingError) {
                existingError.remove();
            }

            if (!isValid) {
                const error = document.createElement('span');
                error.className = 'field-error';
                error.style.color = '#FF4500';
                error.style.fontSize = '0.85rem';
                error.style.marginTop = '0.25rem';
                error.style.display = 'block';
                error.textContent = message;
                field.parentElement.appendChild(error);
                field.style.borderColor = '#FF4500';
            } else {
                field.style.borderColor = '';
            }
        }

        async handleSubmit(e) {
            e.preventDefault();

            // Validate all fields
            const inputs = this.form.querySelectorAll('input, textarea, select');
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.hasAttribute('required')) {
                    if (!this.validateField(input)) {
                        isValid = false;
                    }
                }
            });

            if (!isValid) {
                this.showFormMessage('Please correct the errors above.', 'error');
                return;
            }

            // Collect form data
            const formData = {
                name: Validator.sanitize(this.form.querySelector('#name').value),
                email: Validator.sanitize(this.form.querySelector('#email').value),
                inquiryType: this.form.querySelector('#inquiry-type').value,
                message: Validator.sanitize(this.form.querySelector('#message').value),
                timestamp: new Date().toISOString(),
                honeypot: this.form.querySelector('#honeypot')?.value || '' // Bot trap
            };

            // Honeypot check (anti-spam)
            if (formData.honeypot !== '') {
                console.log('Bot detected');
                return;
            }

            // Show loading state
            const submitBtn = this.form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                // Simulate API call (replace with your actual endpoint)
                await this.submitToAPI(formData);
                
                this.showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
                this.form.reset();
            } catch (error) {
                console.error('Form submission error:', error);
                this.showFormMessage('There was an error sending your message. Please try again.', 'error');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        }

        async submitToAPI(data) {
            // Replace this with your actual backend endpoint
            // For now, we'll simulate a successful submission
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log('Form data:', data);
                    resolve({ success: true });
                }, 1000);
            });
            
            /* Example with actual API:
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            return await response.json();
            */
        }

        showFormMessage(message, type) {
            // Remove existing message
            const existingMsg = this.form.querySelector('.form-message');
            if (existingMsg) {
                existingMsg.remove();
            }

            const msgDiv = document.createElement('div');
            msgDiv.className = 'form-message';
            msgDiv.style.padding = '1rem';
            msgDiv.style.marginTop = '1rem';
            msgDiv.style.borderRadius = '5px';
            msgDiv.style.textAlign = 'center';
            msgDiv.textContent = message;

            if (type === 'success') {
                msgDiv.style.backgroundColor = 'rgba(0, 255, 136, 0.1)';
                msgDiv.style.border = '1px solid rgba(0, 255, 136, 0.3)';
                msgDiv.style.color = '#00FF88';
            } else {
                msgDiv.style.backgroundColor = 'rgba(255, 69, 0, 0.1)';
                msgDiv.style.border = '1px solid rgba(255, 69, 0, 0.3)';
                msgDiv.style.color = '#FF4500';
            }

            this.form.appendChild(msgDiv);

            // Auto-remove after 5 seconds
            setTimeout(() => {
                msgDiv.style.opacity = '0';
                msgDiv.style.transition = 'opacity 0.5s';
                setTimeout(() => msgDiv.remove(), 500);
            }, 5000);
        }
    }

    // ===================================
    // NEWSLETTER FORM
    // ===================================

    class NewsletterForm {
        constructor(formId) {
            this.form = document.getElementById(formId);
            if (!this.form) return;
            
            this.init();
        }

        init() {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        async handleSubmit(e) {
            e.preventDefault();

            const emailInput = this.form.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (!Validator.email(email)) {
                this.showMessage('Please enter a valid email address.', 'error');
                return;
            }

            const submitBtn = this.form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;

            try {
                await this.subscribeToNewsletter(email);
                this.showMessage('Successfully subscribed! Check your email for confirmation.', 'success');
                this.form.reset();
            } catch (error) {
                console.error('Newsletter subscription error:', error);
                this.showMessage('Subscription failed. Please try again.', 'error');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        }

        async subscribeToNewsletter(email) {
            // Replace with your actual newsletter API endpoint
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log('Newsletter subscription:', email);
                    resolve({ success: true });
                }, 800);
            });
        }

        showMessage(message, type) {
            const existingMsg = this.form.parentElement.querySelector('.newsletter-message');
            if (existingMsg) {
                existingMsg.remove();
            }

            const msgDiv = document.createElement('div');
            msgDiv.className = 'newsletter-message';
            msgDiv.style.marginTop = '1rem';
            msgDiv.style.padding = '0.75rem';
            msgDiv.style.borderRadius = '5px';
            msgDiv.style.textAlign = 'center';
            msgDiv.style.fontSize = '0.9rem';
            msgDiv.textContent = message;

            if (type === 'success') {
                msgDiv.style.backgroundColor = 'rgba(0, 255, 136, 0.1)';
                msgDiv.style.border = '1px solid rgba(0, 255, 136, 0.3)';
                msgDiv.style.color = '#00FF88';
            } else {
                msgDiv.style.backgroundColor = 'rgba(255, 69, 0, 0.1)';
                msgDiv.style.border = '1px solid rgba(255, 69, 0, 0.3)';
                msgDiv.style.color = '#FF4500';
            }

            this.form.parentElement.appendChild(msgDiv);

            setTimeout(() => {
                msgDiv.style.opacity = '0';
                msgDiv.style.transition = 'opacity 0.5s';
                setTimeout(() => msgDiv.remove(), 500);
            }, 5000);
        }
    }

    // ===================================
    // VIEWING ROOM PASSWORD GATE
    // ===================================

    class ViewingRoomAuth {
        constructor(formId, contentId, gateId) {
            this.form = document.getElementById(formId);
            this.content = document.getElementById(contentId);
            this.gate = document.getElementById(gateId);
            
            if (!this.form || !this.content || !this.gate) return;
            
            // Check if already authenticated
            if (this.isAuthenticated()) {
                this.showContent();
            }
            
            this.init();
        }

        init() {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        async handleSubmit(e) {
            e.preventDefault();

            const passwordInput = this.form.querySelector('input[type="password"]');
            const password = passwordInput.value;

            if (!password) {
                this.showError('Please enter an access code.');
                return;
            }

            const submitBtn = this.form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Verifying...';
            submitBtn.disabled = true;

            try {
                const isValid = await this.verifyPassword(password);
                
                if (isValid) {
                    this.setAuthenticated();
                    this.showContent();
                    this.loadViewingRoomContent();
                } else {
                    this.showError('Invalid access code. Please contact the artist for access.');
                }
            } catch (error) {
                console.error('Authentication error:', error);
                this.showError('Authentication failed. Please try again.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                passwordInput.value = '';
            }
        }

        async verifyPassword(password) {
            // In production, this should verify against a secure backend
            // For now, we'll use a simple client-side check
            // SECURITY NOTE: Replace this with actual backend authentication
            
            const validPasswords = ['collector2026', 'viewingroom', 'preview'];
            
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(validPasswords.includes(password.toLowerCase()));
                }, 500);
            });
            
            /* Production implementation:
            const response = await fetch('/api/viewing-room/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password })
            });
            
            const data = await response.json();
            return data.authenticated;
            */
        }

        showContent() {
            this.gate.style.display = 'none';
            this.content.classList.remove('hidden');
            this.content.style.opacity = '0';
            
            setTimeout(() => {
                this.content.style.transition = 'opacity 0.5s';
                this.content.style.opacity = '1';
            }, 10);
        }

        loadViewingRoomContent() {
            // Load exclusive content for authenticated users
            const availableWorks = [
                {
                    id: 101,
                    title: 'Neon Void - Limited Edition',
                    image: './assets/viewing-room/vr-01.jpg',
                    price: '$3,500',
                    dimensions: '36x48"',
                    medium: 'Acrylic on Canvas',
                    status: 'Available'
                },
                {
                    id: 102,
                    title: 'Interference Pattern Diptych',
                    image: './assets/viewing-room/vr-02.jpg',
                    price: '$5,800',
                    dimensions: '48x60" (each)',
                    medium: 'Acrylic on Canvas',
                    status: 'Reserved'
                }
            ];

            this.content.innerHTML = `
                <div class="viewing-room-grid">
                    ${availableWorks.map(work => `
                        <div class="viewing-room-item">
                            <img src="${work.image}" alt="${work.title}" loading="lazy">
                            <div class="viewing-room-info">
                                <h3>${work.title}</h3>
                                <p class="work-price">${work.price}</p>
                                <p class="work-details">${work.medium} | ${work.dimensions}</p>
                                <span class="work-status ${work.status.toLowerCase()}">${work.status}</span>
                                <button class="inquire-btn" onclick="scrollToContact('${work.title}')">
                                    Inquire
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;

            // Add CSS for viewing room
            this.injectViewingRoomStyles();
        }

        injectViewingRoomStyles() {
            const style = document.createElement('style');
            style.textContent = `
                .viewing-room-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                    gap: var(--spacing-lg);
                    margin-top: var(--spacing-lg);
                }
                
                .viewing-room-item {
                    background-color: var(--dark-grey);
                    border: 1px solid rgba(224, 224, 224, 0.1);
                    overflow: hidden;
                    transition: transform 0.3s ease;
                }
                
                .viewing-room-item:hover {
                    transform: translateY(-5px);
                }
                
                .viewing-room-item img {
                    width: 100%;
                    aspect-ratio: 1 / 1;
                    object-fit: cover;
                }
                
                .viewing-room-info {
                    padding: var(--spacing-md);
                }
                
                .viewing-room-info h3 {
                    font-size: 1.25rem;
                    margin-bottom: var(--spacing-sm);
                }
                
                .work-price {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--orange-red);
                    margin-bottom: var(--spacing-xs);
                }
                
                .work-details {
                    font-size: 0.9rem;
                    color: rgba(224, 224, 224, 0.7);
                    margin-bottom: var(--spacing-sm);
                }
                
                .work-status {
                    display: inline-block;
                    padding: 0.25rem 0.75rem;
                    border-radius: 15px;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    font-weight: 600;
                    margin-bottom: var(--spacing-sm);
                }
                
                .work-status.available {
                    background-color: rgba(0, 255, 136, 0.2);
                    color: #00FF88;
                }
                
                .work-status.reserved {
                    background-color: rgba(255, 69, 0, 0.2);
                    color: var(--orange-red);
                }
                
                .inquire-btn {
                    width: 100%;
                    padding: 0.75rem;
                    margin-top: var(--spacing-sm);
                    background-color: transparent;
                    border: 2px solid var(--orange-red);
                    color: var(--orange-red);
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    transition: all 0.3s ease;
                }
                
                .inquire-btn:hover {
                    background-color: var(--orange-red);
                    color: var(--eerie-black);
                }
            `;
            document.head.appendChild(style);
        }

        showError(message) {
            const existingError = this.form.querySelector('.auth-error');
            if (existingError) {
                existingError.remove();
            }

            const errorDiv = document.createElement('div');
            errorDiv.className = 'auth-error';
            errorDiv.style.marginTop = '1rem';
            errorDiv.style.padding = '0.75rem';
            errorDiv.style.backgroundColor = 'rgba(255, 69, 0, 0.1)';
            errorDiv.style.border = '1px solid rgba(255, 69, 0, 0.3)';
            errorDiv.style.color = '#FF4500';
            errorDiv.style.borderRadius = '5px';
            errorDiv.style.textAlign = 'center';
            errorDiv.textContent = message;

            this.form.appendChild(errorDiv);

            setTimeout(() => {
                errorDiv.style.opacity = '0';
                errorDiv.style.transition = 'opacity 0.5s';
                setTimeout(() => errorDiv.remove(), 500);
            }, 5000);
        }

        isAuthenticated() {
            // Check session storage for authentication
            return sessionStorage.getItem('viewingRoomAuth') === 'true';
        }

        setAuthenticated() {
            sessionStorage.setItem('viewingRoomAuth', 'true');
        }
    }

    // ===================================
    // GLOBAL HELPER FUNCTIONS
    // ===================================

    window.scrollToContact = function(workTitle) {
        const contactSection = document.getElementById('contact');
        const messageField = document.getElementById('message');
        const inquirySelect = document.getElementById('inquiry-type');
        
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        if (messageField && workTitle) {
            setTimeout(() => {
                messageField.value = `I'm interested in "${workTitle}". `;
                messageField.focus();
            }, 500);
        }
        
        if (inquirySelect) {
            inquirySelect.value = 'purchase';
        }
    };

    // ===================================
    // INITIALIZATION
    // ===================================

    document.addEventListener('DOMContentLoaded', () => {
        new ContactForm('contactForm');
        new NewsletterForm('newsletterForm');
        new ViewingRoomAuth('passwordForm', 'viewingRoomContent', 'passwordGate');
    });

})();
