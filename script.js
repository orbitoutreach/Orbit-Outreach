// Smooth Page Transitions
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in class to body on page load
    document.body.classList.add('fade-in');
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('nav a, .about-cta a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's a # link, no href, or mailto link
            if (!href || href === '#' || href.startsWith('#') || href.startsWith('mailto:')) {
                return;
            }
            
            // Prevent default navigation
            e.preventDefault();
            
            // Add fade-out class
            document.body.classList.add('fade-out');
            
            // Navigate after animation completes
            setTimeout(() => {
                window.location.href = href;
            }, 400);
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            document.body.classList.remove('fade-out');
            document.body.classList.add('fade-in');
        }
    });
});

// Handle Email Signup Form (Homepage)
document.addEventListener('DOMContentLoaded', function() {
    const emailForm = document.getElementById('emailSignupForm');
    
    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            const submitButton = emailForm.querySelector('.demo-button');
            const originalText = submitButton.textContent;
            
            // Disable button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Show success message after iframe loads (simulate delay)
            setTimeout(() => {
                showSuccessMessage('email');
                emailForm.reset();
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 1500);
        });
    }
});

// Handle Contact Form
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitButton = contactForm.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            
            // Disable button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Show success message after iframe loads
            setTimeout(() => {
                showSuccessMessage('contact');
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 1500);
        });
    }
});

// Function to show success messages with custom styling
function showSuccessMessage(formType) {
    // Create success message element
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #1e90ff, #0066cc);
        color: white;
        padding: 30px 50px;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(30, 144, 255, 0.4);
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        z-index: 10000;
        animation: fadeInScale 0.3s ease;
    `;
    
    // Add animation keyframes
    if (!document.querySelector('#successAnimation')) {
        const style = document.createElement('style');
        style.id = 'successAnimation';
        style.textContent = `
            @keyframes fadeInScale {
                from {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    if (formType === 'email') {
        messageDiv.innerHTML = `
            <div style="font-size: 48px; margin-bottom: 10px;">✅</div>
            <div>Thanks for requesting a demo!</div>
            <div style="font-size: 14px; margin-top: 10px; opacity: 0.9;">We'll be in touch soon.</div>
        `;
    } else if (formType === 'contact') {
        messageDiv.innerHTML = `
            <div style="font-size: 48px; margin-bottom: 10px;">✅</div>
            <div>Message sent successfully!</div>
            <div style="font-size: 14px; margin-top: 10px; opacity: 0.9;">We'll respond within 24 hours.</div>
        `;
    }
    
    document.body.appendChild(messageDiv);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'fadeInScale 0.3s ease reverse';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

// Handle "See Plans" button on homepage
document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton && ctaButton.textContent.includes('See Plans')) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = 'plans.html';
            }, 400);
        });
    }
});