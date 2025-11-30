// Tab change event listeners
document.addEventListener('DOMContentLoaded', function() {
    
    // Tab navigation event listeners
    const tabButtons = document.querySelectorAll('[data-bs-toggle="tab"]');
    tabButtons.forEach(button => {
        button.addEventListener('shown.bs.tab', function(event) {
            console.log('Tab activated:', event.target.getAttribute('aria-controls'));
            
            // Add animation class
            const targetPane = document.querySelector(event.target.getAttribute('data-bs-target'));
            if (targetPane) {
                targetPane.style.opacity = '0';
                setTimeout(() => {
                    targetPane.style.transition = 'opacity 0.5s ease';
                    targetPane.style.opacity = '1';
                }, 10);
            }
        });
    });

    // Pills navigation event listeners
    const pillButtons = document.querySelectorAll('[data-bs-toggle="pill"]');
    pillButtons.forEach(button => {
        button.addEventListener('shown.bs.tab', function(event) {
            console.log('Pill activated:', event.target.getAttribute('aria-controls'));
            
            // Add animation class
            const targetPane = document.querySelector(event.target.getAttribute('data-bs-target'));
            if (targetPane) {
                targetPane.style.opacity = '0';
                setTimeout(() => {
                    targetPane.style.transition = 'opacity 0.5s ease';
                    targetPane.style.opacity = '1';
                }, 10);
            }
        });
    });

    // Contact form submission handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                // Create success alert
                const alertDiv = document.createElement('div');
                alertDiv.className = 'alert alert-success alert-dismissible fade show mt-3';
                alertDiv.setAttribute('role', 'alert');
                alertDiv.innerHTML = `
                    <strong>Success!</strong> Your message has been sent successfully.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                `;
                
                contactForm.appendChild(alertDiv);
                
                // Clear form
                contactForm.reset();
                
                // Remove alert after 5 seconds
                setTimeout(() => {
                    alertDiv.remove();
                }, 5000);
            } else {
                // Create error alert
                const alertDiv = document.createElement('div');
                alertDiv.className = 'alert alert-danger alert-dismissible fade show mt-3';
                alertDiv.setAttribute('role', 'alert');
                alertDiv.innerHTML = `
                    <strong>Error!</strong> Please fill in all fields.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                `;
                
                contactForm.appendChild(alertDiv);
                
                // Remove alert after 5 seconds
                setTimeout(() => {
                    alertDiv.remove();
                }, 5000);
            }
        });
    }

    // Add hover effects to pricing cards
    const pricingCards = document.querySelectorAll('.card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.03)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add click event to pricing buttons
    const pricingButtons = document.querySelectorAll('.btn-outline-primary, .btn-success, .btn-outline-warning');
    pricingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planName = this.closest('.card').querySelector('h5').textContent;
            alert(`You selected the ${planName} plan! This is a demo, so no actual purchase will be made.`);
        });
    });

    // Log when page is fully loaded
    console.log('Bootstrap Dynamic Tabs/Pills website loaded successfully!');
    console.log('Features: Tabs, Pills, Dynamic Content, Form Handling, Animations');
});

// Function to programmatically switch tabs
function switchToTab(tabId) {
    const tabTrigger = new bootstrap.Tab(document.getElementById(tabId));
    tabTrigger.show();
}

// Function to programmatically switch pills
function switchToPill(pillId) {
    const pillTrigger = new bootstrap.Tab(document.getElementById(pillId));
    pillTrigger.show();
}

// Example: Uncomment to auto-switch tabs every 5 seconds (demo purpose)
// let currentTabIndex = 0;
// const tabs = ['home-tab', 'profile-tab', 'services-tab', 'contact-tab'];
// setInterval(() => {
//     currentTabIndex = (currentTabIndex + 1) % tabs.length;
//     switchToTab(tabs[currentTabIndex]);
// }, 5000);
