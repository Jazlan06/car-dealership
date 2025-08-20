import { feedbacks } from "./data/feedbacks.js";

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
    // Add event listener to the profile button in the dynamically loaded header
    const profileButton = document.querySelector('.profile-button');
    if (profileButton) {
        profileButton.addEventListener('click', () => {
            window.location.href = 'login-signup.html'; // Redirect to login-signup.html
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    let feedbackHTML = '';

    feedbacks.forEach((feedback) => {
        feedbackHTML += `
        <div class="reviews">
            <div class="feedback-car-container">
                <div class="slider">
                    <div class="slide">
                        <img src="${feedback.image.src}" type="${feedback.image.type}" class="feedback-img">
                    </div>
                    <div class="slide">
                       <video controls class="feedback-video">
                         <source src="${feedback.video.src}" type="${feedback.video.type}">
                        </video>
                    </div>
                </div>
                <button class="prev">❮</button>
                <button class="next">❯</button>
                <div class = "feedback-info">
                    <div>
                        <p class ="feedback-car-name">
                        ${feedback.carName}
                        </p>
                    </div>
                    <div class="feedback-star">
                     <div class="feedback-rating-container">
                         <div class="rating-text">
                            <p>Service Quality</p>
                         </div>
                    <div class="rating-image">
                         <img class="feedback-rating-stars"
                        src="/Customers-Feedback/ratings/rating-${feedback.ratings.serviceQuality * 10}.png">
                    </div>
                </div>

                <div class="feedback-rating-container">
                         <div class="rating-text">
                            <p>Car Rating</p>
                         </div>
                    <div class="rating-image">
                         <img class="feedback-rating-stars"
                        src="/Customers-Feedback/ratings/rating-${feedback.ratings.carRating * 10}.png">
                    </div>
                </div>

                <div class="feedback-rating-container">
                         <div class="rating-text">
                            <p>Overall Experience</p>
                         </div>
                    <div class="rating-image">
                         <img class="feedback-rating-stars"
                        src="/Customers-Feedback/ratings/rating-${feedback.ratings.overallExperience * 10}.png">
                    </div>
                </div>
                </div>
            </div>
        </div>    
        `;
    });

    document.querySelector('.feedback-container').innerHTML = feedbackHTML;

    // Slider functionality
    function showSlide(slider, index) {
        const slides = slider.querySelectorAll('.slide');
        const totalSlides = slides.length;
        if (index >= totalSlides) {
            index = 0;
        }
        if (index < 0) {
            index = totalSlides - 1;
        }
        slider.style.transform = `translateX(-${index * 100}%)`;
        slider.dataset.slideIndex = index;
    }

    function setupSliders() {
        document.querySelectorAll('.slider').forEach(slider => {
            const slides = slider.querySelectorAll('.slide');
            const totalSlides = slides.length;
            slider.dataset.slideIndex = 0;

            slider.parentElement.querySelector('.next').addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent this click event from bubbling up to .feedback-car-container
                let slideIndex = parseInt(slider.dataset.slideIndex) || 0;
                slideIndex++;
                showSlide(slider, slideIndex);
            });

            slider.parentElement.querySelector('.prev').addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent this click event from bubbling up to .feedback-car-container
                let slideIndex = parseInt(slider.dataset.slideIndex) || 0;
                slideIndex--;
                showSlide(slider, slideIndex);
            });

            // Initial call to show the first slide
            showSlide(slider, 0);
        });
    }

    setupSliders();
});

document.addEventListener('DOMContentLoaded', function() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('.footer').innerHTML = data;
        });
});

