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

// Form validation
document.addEventListener('DOMContentLoaded', function() {
    // Get all forms that need validation
    const forms = document.querySelectorAll('.needs-validation');
    
    // Loop over forms and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    // Handle course enrollment
    const enrollmentForm = document.getElementById('enrollmentForm');
    if (enrollmentForm) {
        enrollmentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form data
            const studentName = document.getElementById('studentName').value;
            const studentEmail = document.getElementById('studentEmail').value;
            const paymentMethod = document.getElementById('paymentMethod').value;

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

            // Redirect to dashboard after 3 seconds
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 3000);
        });
    }

    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-3';
            successMessage.innerHTML = `
                <h4 class="alert-heading">Thank you for your message!</h4>
                <p>We have received your message and will get back to you shortly.</p>
                <hr>
                <p class="mb-0">You will be redirected to the home page...</p>
            `;
            
            // Replace form with success message
            contactForm.parentNode.replaceChild(successMessage, contactForm);

            // Redirect to home page after 3 seconds
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        });
    }

    // Display student name in dashboard
    const studentNameElement = document.getElementById('studentName');
    if (studentNameElement) {
        const storedName = localStorage.getItem('studentName');
        if (storedName) {
            studentNameElement.textContent = storedName;
        }
    }

    // Handle dashboard course progress
    const progressBars = document.querySelectorAll('.progress-bar');
    if (progressBars.length > 0) {
        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = progress + '%';
            }, 500);
        });
    }

    // Handle course video playback
    const videoButtons = document.querySelectorAll('.video-button');
    if (videoButtons.length > 0) {
        videoButtons.forEach(button => {
            button.addEventListener('click', function() {
                const videoId = this.getAttribute('data-video-id');
                // Here you would typically handle video playback
                // For now, we'll just show an alert
                alert('Video playback functionality will be implemented in the full version.');
            });
        });
    }

    // Handle quick action buttons
    const quickActionButtons = document.querySelectorAll('.btn-outline-primary');
    quickActionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.getAttribute('onclick');
            if (action) {
                eval(action);
            }
        });
    });
});

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add active class to current navigation item
const currentLocation = window.location.pathname;
document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentLocation.split('/').pop()) {
        link.classList.add('active');
    }
}); 