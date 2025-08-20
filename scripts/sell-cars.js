function loadHeader() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
            setupHeaderEventListeners(); // Setup event listeners after loading header
        })
        .catch(error => console.error('Error loading header:', error));
}

function setupHeaderEventListeners() {
    const profileButton = document.querySelector('.profile-button');
    const profileButton2 = document.querySelector('.profile-button2');
    if (profileButton) {
        profileButton.addEventListener('click', () => {
            window.location.href = 'login-signup.html'; // Redirect to login-signup.html
        });
    };
    if (profileButton2) {
        profileButton2.addEventListener('click', () => {
            window.location.href = 'login-signup.html'; // Redirect to login-signup.html
        });
    }
};

document.addEventListener('DOMContentLoaded', loadHeader);

document.addEventListener("DOMContentLoaded", function() {
    const testimonials = document.querySelectorAll('.testimonial');
    let currentIndex = 0;

    function showTestimonial() {
        testimonials.forEach((testimonial, index) => {
            testimonial.classList.remove('active');
            testimonial.style.zIndex = 0;
        });
        testimonials[currentIndex].classList.add('active');
        testimonials[currentIndex].style.zIndex = 1;
    }

    showTestimonial(); 

    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial();
    }, 5000); 
});


document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('.card');
    
    const observerOptions = {
        root: null, // Use the viewport as the container
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the card is visible
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to trigger animation
                entry.target.classList.add('fade-in-up'); // or 'scale-in'
                // Optionally stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        observer.observe(card);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('.footer').innerHTML = data;
        });
});

