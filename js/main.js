// Main JavaScript for Bucharest Job Search Website

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Load companies dynamically
    loadCompanies();
    
    // Setup company filters
    setupCompanyFilters();
    
    // Setup contact form
    setupContactForm();
    
    // Add scroll animations
    setupScrollAnimations();
});

// Load and display companies
function loadCompanies(filter = 'all') {
    const companiesContainer = document.getElementById('companies-list');
    if (!companiesContainer) return;
    
    companiesContainer.innerHTML = '';
    
    const filteredCompanies = companies.filter(company => {
        if (filter === 'all') return true;
        return company.categories.includes(filter);
    });
    
    filteredCompanies.forEach(company => {
        const card = createCompanyCard(company);
        companiesContainer.appendChild(card);
    });
    
    // Update count
    updateCompanyCount(filteredCompanies.length);
}

function createCompanyCard(company) {
    const card = document.createElement('div');
    card.className = 'company-card' + (company.priority ? ' priority' : '');
    card.dataset.categories = company.categories.join(',');
    
    // Build badges
    let badges = '';
    if (company.priority) {
        badges += '<span class="badge badge-priority">⭐ TOP PRIORITY</span>';
    }
    if (company.categories.includes('short-commute')) {
        badges += '<span class="badge badge-short">📍 SHORT COMMUTE</span>';
    }
    if (company.ai) {
        badges += '<span class="badge badge-ai">🤖 AI/ML</span>';
    }
    
    card.innerHTML = `
        <h3>${company.name}</h3>
        <div class="company-badges">
            ${badges}
        </div>
        <div class="company-info">
            <p><strong>Industry:</strong> ${company.type}</p>
            <p><strong>Size:</strong> ${company.size}</p>
            <p><strong>Commute:</strong> ${company.commute}</p>
            <p><strong>Visa Sponsorship:</strong> ${company.visa}</p>
            <p><strong>Remote:</strong> ${company.remote}</p>
            ${company.description ? `<p><em>${company.description}</em></p>` : ''}
        </div>
        <div class="company-links">
            <a href="${company.careers}" target="_blank" class="company-link" title="Careers Page">
                <i class="fas fa-briefcase"></i> Careers
            </a>
            <a href="${company.linkedin}" target="_blank" class="company-link" title="LinkedIn">
                <i class="fab fa-linkedin"></i> LinkedIn
            </a>
            <a href="${company.glassdoor}" target="_blank" class="company-link" title="Glassdoor">
                <i class="fas fa-star"></i> Glassdoor
            </a>
            <a href="mailto:${company.hr}" class="company-link" title="Email HR">
                <i class="fas fa-envelope"></i> Email
            </a>
        </div>
    `;
    
    return card;
}

function setupCompanyFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.dataset.filter;
            
            // Load filtered companies
            loadCompanies(filter);
        });
    });
}

function updateCompanyCount(count) {
    const subtitle = document.querySelector('#companies .section-subtitle');
    if (subtitle) {
        subtitle.textContent = `${count} companies actively hiring software engineers`;
    }
}

// Contact form handling
function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const company = document.getElementById('company').value;
        const message = document.getElementById('message').value;
        
        // Create mailto link
        const subject = encodeURIComponent(`Job Opportunity - From ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Company: ${company || 'N/A'}\n\n` +
            `Message:\n${message}`
        );
        
        const mailtoLink = `mailto:moshestein24@gmail.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        alert('Thank you for reaching out! Your default email client should open now. If it doesn\'t, please email me directly at moshestein24@gmail.com');
        
        // Reset form
        form.reset();
    });
}

// Scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animatedElements = document.querySelectorAll('.skill-category, .company-card, .project-card, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Utility: Copy email to clipboard
function copyEmail() {
    const email = 'moshestein24@gmail.com';
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(function() {
            showNotification('Email copied to clipboard!');
        });
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showNotification('Email copied to clipboard!');
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #00A878;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification animations
const notificationStyles = `
<style>
@keyframes slideIn {
    from {
        transform: translateX(400px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(400px);
        opacity: 0;
    }
}
</style>
`;
document.head.insertAdjacentHTML('beforeend', notificationStyles);

// Track page views (optional - for analytics)
function trackPageView() {
    console.log('Page loaded:', new Date().toISOString());
    // Add Google Analytics or other tracking here if needed
}

trackPageView();

// Print functionality for checklist
function printChecklist() {
    window.print();
}

// Download all files as ZIP (if implemented)
function downloadAllFiles() {
    alert('To download all files, please use the individual download links in the Downloads section.');
}

// Stats counter animation
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate stats on scroll
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            const stats = entry.target.querySelectorAll('.stat h3');
            stats.forEach(stat => {
                const endValue = parseInt(stat.textContent);
                animateValue(stat, 0, endValue, 2000);
            });
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Export functions for use in HTML
window.copyEmail = copyEmail;
window.printChecklist = printChecklist;
window.downloadAllFiles = downloadAllFiles;
