// Form Validation and Event Handling

// Registration Form Validation
const registrationForm = document.getElementById('registrationForm');
const contactForm = document.getElementById('contactForm');

// Phone number validation regex
const phoneRegex = /^\+?[\d\s-]{10,}$/;
// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Registration Form Validation
registrationForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const course = document.getElementById('course').value;
    
    let isValid = true;
    let errorMessage = '';
    
    // Name validation
    if (fullName.length < 2) {
        isValid = false;
        errorMessage += 'Name must be at least 2 characters long.\n';
    }
    
    // Email validation
    if (!emailRegex.test(email)) {
        isValid = false;
        errorMessage += 'Please enter a valid email address.\n';
    }
    
    // Phone validation
    if (!phoneRegex.test(phone)) {
        isValid = false;
        errorMessage += 'Please enter a valid phone number.\n';
    }
    
    // Course selection validation
    if (!course) {
        isValid = false;
        errorMessage += 'Please select a course.\n';
    }
    
    if (isValid) {
        // Show success message
        showAlert('Registration successful! We will contact you soon.', 'success');
        registrationForm.reset();
    } else {
        // Show error message
        showAlert(errorMessage, 'danger');
    }
});

// Contact Form Validation
contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const contactEmail = document.getElementById('contactEmail').value;
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
        showAlert('Message sent successfully! We will get back to you soon.', 'success');
        contactForm.reset();
    } else {
        // Show error message
        showAlert(errorMessage, 'danger');
    }
});

// Course Enrollment Buttons
document.querySelectorAll('.btn-sm.btn-primary').forEach(button => {
    button.addEventListener('click', function() {
        const courseName = this.closest('tr').querySelector('td:first-child').textContent;
        showAlert(`You have successfully enrolled in ${courseName}!`, 'success');
    });
});

// Alert Function
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Insert alert before the form
    const form = event.target.closest('form');
    form.parentNode.insertBefore(alertDiv, form);
    
    // Remove alert after 5 seconds
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
            if (value.length < 2) {
                isValid = false;
                feedback = 'Name must be at least 2 characters long.';
            }
            break;
            
        case 'email':
        case 'contactEmail':
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

// Initialize tooltips
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
}); 