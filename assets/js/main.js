document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    initializeTheme();
    initializeSidebar();
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeContactForm();
    initializeSkillBars();
    
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }
}

function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
            
            this.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                this.style.transform = 'rotate(0deg)';
            }, 300);
        });
    }
}

function setTheme(theme) {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    
    body.setAttribute('data-theme', theme);
    
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'bx bx-sun' : 'bx bx-moon';
        }
    }
    
    localStorage.setItem('theme', theme);
}

function initializeSidebar() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    
    if (mobileMenuBtn && sidebar) {
        mobileMenuBtn.addEventListener('click', function() {
            sidebar.classList.toggle('open');
            
            const icon = this.querySelector('i');
            if (icon) {
                icon.className = sidebar.classList.contains('open') ? 'bx bx-x' : 'bx bx-menu';
            }
        });
    }
    
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 1024) {
            if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                sidebar.classList.remove('open');
                if (mobileMenuBtn) {
                    const icon = mobileMenuBtn.querySelector('i');
                    if (icon) {
                        icon.className = 'bx bx-menu';
                    }
                }
            }
        }
    });
}

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 0;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
            
            if (window.innerWidth <= 1024) {
                const sidebar = document.getElementById('sidebar');
                const mobileMenuBtn = document.getElementById('mobileMenuBtn');
                
                if (sidebar) {
                    sidebar.classList.remove('open');
                }
                if (mobileMenuBtn) {
                    const icon = mobileMenuBtn.querySelector('i');
                    if (icon) {
                        icon.className = 'bx bx-menu';
                    }
                }
            }
        });
    });
    
    window.addEventListener('scroll', updateActiveNavigation);
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPosition = window.pageYOffset + 200;
    
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

function initializeScrollEffects() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function initializeSkillBars() {
    const progressBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.getAttribute('data-progress');
                
                setTimeout(() => {
                    progressBar.style.width = progress + '%';
                }, 500);
                
                observer.unobserve(progressBar);
            }
        });
    }, {
        threshold: 0.5
    });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

function initializeAnimations() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const elements = heroContent.querySelectorAll('.hero-greeting, .hero-name, .hero-title, .hero-description, .hero-buttons');
        
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200 + 500);
        });
    }
    
    const animateOnScroll = document.querySelectorAll('.fade-in');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateOnScroll.forEach(element => {
        scrollObserver.observe(element);
    });
    
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name') || this.querySelector('input[name="name"]').value;
            const email = formData.get('email') || this.querySelector('input[name="email"]').value;
            const subject = formData.get('subject') || this.querySelector('input[name="subject"]').value;
            const message = formData.get('message') || this.querySelector('textarea[name="message"]').value;
            
            if (validateForm(name, email, subject, message)) {
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.7';
                
                setTimeout(() => {
                    showNotification('Message sent successfully! Thank you for contacting me.', 'success');
                    this.reset();
                    
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                }, 2000);
            }
        });
    }
}

function validateForm(name, email, subject, message) {
    const errors = [];
    
    if (!name || name.trim().length < 2) {
        errors.push('Name is required and must be at least 2 characters');
    }
    
    if (!email || !isValidEmail(email)) {
        errors.push('A valid email address is required');
    }
    
    if (!subject || subject.trim().length < 3) {
        errors.push('Subject is required and must be at least 3 characters');
    }
    
    if (!message || message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('. '), 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="bx ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="bx bx-x"></i>
        </button>
    `;
    
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                background: var(--card-bg);
                color: var(--text-color);
                padding: 16px 20px;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                gap: 12px;
                transform: translateX(400px);
                transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                max-width: 400px;
                border-left: 4px solid var(--primary-color);
                backdrop-filter: blur(10px);
            }
            
            .notification.notification-success {
                border-left-color: #4CAF50;
            }
            
            .notification.notification-error {
                border-left-color: #f44336;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
                flex: 1;
                font-size: 0.95rem;
            }
            
            .notification-content i {
                font-size: 1.3rem;
                color: var(--primary-color);
            }
            
            .notification.notification-success .notification-content i {
                color: #4CAF50;
            }
            
            .notification.notification-error .notification-content i {
                color: #f44336;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: var(--text-color);
                cursor: pointer;
                padding: 8px;
                border-radius: 50%;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .notification-close:hover {
                background: rgba(0,0,0,0.1);
                transform: scale(1.1);
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success':
            return 'bx-check-circle';
        case 'error':
            return 'bx-error-circle';
        case 'warning':
            return 'bx-error';
        default:
            return 'bx-info-circle';
    }
}

function addParallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
}

function initializeNavAnimations() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(12px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateX(0) scale(1)';
            }
        });
    });
}

function smoothScrollToSection(targetId) {
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
        const headerOffset = 0;
        const elementPosition = targetSection.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

window.addEventListener('scroll', function() {
    updateActiveNavigation();
}, { passive: true });

window.addEventListener('resize', function() {
    const sidebar = document.getElementById('sidebar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    if (window.innerWidth > 1024) {
        if (sidebar) {
            sidebar.classList.remove('open');
        }
        if (mobileMenuBtn) {
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.className = 'bx bx-menu';
            }
        }
    }
});