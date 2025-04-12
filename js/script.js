// Form Validation and Event Handling
const contactForm = document.getElementById('contactForm');
const enrollmentForm = document.getElementById('enrollmentForm');

// Phone number validation regex
const phoneRegex = /^\+?[\d\s-]{10,}$/;
// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Contact Form Validation
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const contactEmail = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        let isValid = true;
        let errorMessage = '';

        // Name validation
        if (name.length < 2) {
            isValid = false;
            errorMessage += 'Name must be at least 2 characters long.\n';
        }

        // Email validation
        if (!emailRegex.test(contactEmail)) {
            isValid = false;
            errorMessage += 'Please enter a valid email address.\n';
        }

        // Message validation
        if (message.length < 10) {
            isValid = false;
            errorMessage += 'Message must be at least 10 characters long.\n';
        }

        if (isValid) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-3';
            successMessage.innerHTML = `
                <h4 class="alert-heading">Thank you for reaching out!</h4>
                <p>We have received your message and will get back to you as soon as possible.</p>
            `;

            // Replace the contact form with the success message
            contactForm.parentNode.replaceChild(successMessage, contactForm);

        } else {
            // Show error message
            showAlert(errorMessage, 'danger', contactForm);
        }
    });
}

// Enrollment Form Validation
if (enrollmentForm) {
    enrollmentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const studentName = document.getElementById('studentName').value;
        const studentEmail = document.getElementById('studentEmail').value;
        const paymentMethod = document.getElementById('paymentMethod').value;
        
        let isValid = true;
        let errorMessage = '';
        
        // Name validation
        if (studentName.length < 2) {
            isValid = false;
            errorMessage += 'Name must be at least 2 characters long.\n';
        }
        
        // Email validation
        if (!emailRegex.test(studentEmail)) {
            isValid = false;
            errorMessage += 'Please enter a valid email address.\n';
        }
        
        // Payment method validation
        if (!paymentMethod) {
            isValid = false;
            errorMessage += 'Please select a payment method.\n';
        }
        
        if (isValid) {            
            // Store student name in localStorage
            localStorage.setItem('studentName', studentName);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-3';
            successMessage.innerHTML = `
                <h4 class="alert-heading">Thank you for enrolling!</h4>
                <p>We've sent a confirmation email to ${studentEmail} with your course details and payment instructions.</p>
                <hr>
                <p class="mb-0">You will be redirected to your dashboard shortly...</p>
            `;
            
            // Replace form with success message
            enrollmentForm.parentNode.replaceChild(successMessage, enrollmentForm);
            
            
        } else {
            // Show error message
            showAlert(errorMessage, 'danger');
        }
    });
}


// Alert Function
function showAlert(message, type, formElement = null) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-3`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        <div>${message.replace(/\n/g, '<br>')}</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // ✅ Use formElement directly
    if (formElement) {
        // Remove any existing alerts first
        const existingAlerts = formElement.parentNode.querySelectorAll('.alert');
        existingAlerts.forEach(alert => alert.remove());

        // Add new alert after the form
        formElement.parentNode.insertBefore(alertDiv, formElement.nextSibling);
    } 

    // Auto remove after 5s
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}



// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Form field validation on input
document.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', function() {
        validateField(this);
    });
});

// Field validation function
function validateField(field) {
    const value = field.value;
    let isValid = true;
    let feedback = '';
    
    switch (field.id) {
        case 'fullName':
        case 'name':
        case 'studentName':
            if (value.length < 2) {
                isValid = false;
                feedback = 'Name must be at least 2 characters long.';
            }
            break;
            
        case 'email':
        case 'contactEmail':
        case 'studentEmail':
            if (!emailRegex.test(value)) {
                isValid = false;
                feedback = 'Please enter a valid email address.';
            }
            break;
            
        case 'phone':
            if (!phoneRegex.test(value)) {
                isValid = false;
                feedback = 'Please enter a valid phone number.';
            }
            break;
            
        case 'message':
            if (value.length < 10) {
                isValid = false;
                feedback = 'Message must be at least 10 characters long.';
            }
            break;
    }
    
    // Update field validation state
    field.classList.toggle('is-invalid', !isValid);
    field.classList.toggle('is-valid', isValid);
    
    // Update feedback message
    let feedbackDiv = field.nextElementSibling;
    if (!feedbackDiv || !feedbackDiv.classList.contains('invalid-feedback')) {
        feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'invalid-feedback';
        field.parentNode.insertBefore(feedbackDiv, field.nextSibling);
    }
    feedbackDiv.textContent = feedback;
}


// --- Login System (Dashboard Access + Dynamic Navbar) ---
const validUsername = 'admin';
const validPassword = 'admin';

// 1. Redirect to login if accessing dashboard and not logged in
if (window.location.pathname.includes('dashboard.html')) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
        window.location.href = 'login.html';
    }
}

// 2. Update navbar based on login state
document.addEventListener('DOMContentLoaded', () => {
    const authContainer = document.getElementById('nav-auth-container');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (authContainer) {
        if (isLoggedIn === 'true') {
            // Show Dashboard and Logout button
            authContainer.innerHTML = `
                <div class="d-flex align-items-center gap-2">
                    <a href="dashboard.html" class="nav-link">Dashboard</a>
                    <button onclick="logout()" class="btn btn-outline-light btn-sm">Logout</button>
                </div>
            `;
        } else {
            // Show Login link only
            authContainer.innerHTML = `
                <a href="login.html" class="nav-link">Login</a>
            `;
        }
    }
});

// 3. Login form handling
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (username === validUsername && password === validPassword) {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'dashboard.html';
        } else {
            showAlert('Invalid username or password', 'danger');
        }
    });
}

// 4. Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
}

