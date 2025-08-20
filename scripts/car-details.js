import { cars } from './data/cars.js';
import { auth } from './firebase-config.js';
import { getDatabase, ref, get } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js';

const database = getDatabase();

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
    if (profileButton) {
        profileButton.addEventListener('click', () => {
            window.location.href = 'login-signup.html'; // Redirect to login-signup.html
        });
    }
};

document.addEventListener('DOMContentLoaded', loadHeader);

function getCarIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('carId');
}

function loadCarDetails() {
    const carId = getCarIdFromUrl();
    const car = cars.find(car => car.id === carId);

    if (car) {
        document.getElementById('car-details').innerHTML = `
           <div class="used-container" data-car-id="${car.id}">
            <div class="used-car-container">
                <div class="slider">
                    <div class="slide">
                        <img src="${car.images.coverImage}" alt="Car Image" class="used-car-img">
                    </div>
                    <div class="slide">
                        <img src="${car.images.frontView}" alt="Car Image" class="used-car-img">
                    </div>
                    <div class="slide">
                        <img src="${car.images.sideView}" alt="Car Image" class="used-car-img">
                    </div>
                    <div class="slide">
                        <img src="${car.images.rearView}" alt="Car Image" class="used-car-img">
                    </div>
                    <div class="slide">
                        <img src="${car.images.interior}" alt="Car Image" class="used-car-img">
                    </div>
                </div>
                <button class="prev">❮</button>
                <button class="next">❯</button>
            </div>
            <div class="used-car-name-price">
        <div class="used-car-name-container">
            <p class="used-car-name">
                ${car.name}
            </p>
        </div>
        <div class="used-price-container">
            <p class="used-price">
                &#8377; ${car.price}
            </p>
        </div>
    </div>
    <div class="used-car-overview-details">
        <div class="transmission-container">
            <p class="transmission">
                ${car.overview.transmission}
            </p>
        </div>
        <div class="used-kms">
            <p class="used-car-kms">
                ${car.overview.driven}
            </p>
        </div>
        <div class="used-fuel-type-container">
            <p class="used-fuel-type">
                ${car.overview.fuel}
            </p>
        </div>
        <div class="used-ownership-container">
            <p class="used-ownership">
                ${car.overview.ownership}
            </p>
        </div>
    </div>
            </div>
        </div>

        <div class ="sellers-remark-container">
        <p class ="remark-header">Sellers Remark</p>
        <p class ="remark">
        ${car.remark}
        </p>
        </div>

         <div class="used-actions2">
             <button class ="chat"> <i class="fas fa-phone-alt"></i> Call</button>
            <button class="interested">Interested</button>
        </div>


         <div class="car-overview">
        <h2>Car Overview</h2>
        <div class="detail">
            <span><i class="fa-regular fa-calendar"></i> Registration Year</span>
            <span>${car.overview.registration}</span>
        </div>
        <div class="detail">
            <span><i class="fa-solid fa-shield-halved"></i> Insurance</span>
            <span>${car.overview.insurance}</span>
        </div>
        <div class="detail">
            <span><i class="fa-solid fa-gas-pump"></i> Fuel Type</span>
            <span>${car.overview.fuel}</span>
        </div>
        <div class="detail">
    <span><i class="bi bi-car-front"></i> Capacity</span>
    <span>${car.overview.seats}</span>
</div>

        <div class="detail">
            <span><i class="fa-solid fa-tachometer-alt"></i> Kms Driven</span>
            <span>${car.overview.driven}</span>
        </div>
        <div class="detail">
            <span><i class="fa-solid fa-city"></i> RTO</span>
            <span>${car.overview.rto}</span>
        </div>
        <div class="detail">
            <span><i class="fa-solid fa-user"></i> Ownership</span>
            <span>${car.overview.ownership}</span>
        </div>
        <div class="detail">
            <span><i class="fa-solid fa-car"></i> Engine Displacement</span>
            <span>${car.overview.engineDisplacement}</span>
        </div>
        <div class="detail">
            <span><i class="fa-solid fa-cogs"></i> Transmission</span>
            <span>${car.overview.transmission}</span>
        </div>
    </div>

    <div class="engine-transmission">
        <h2>Engine & Transmission</h2>
        <div class="detail">
            <span>Engine Type</span>
            <span>${car.e_t.engineType}</span>
        </div>
        <div class="detail">
            <span>No. of Cylinders</span>
            <span>${car.e_t.no_Cylinder}</span>
        </div>
        <div class="detail">
            <span>Valves Per Cylinder</span>
            <span>${car.e_t.valvesPerCylinder}</span>
        </div>
        <div class="detail">
            <span>Turbo Charger</span>
            <span>${car.e_t.turboCharger}</span>
        </div>
        <div class="detail">
            <span>Super Charger</span>
            <span>${car.e_t.superCharger}</span>
        </div>
        <div class="detail">
            <span>Gearbox</span>
            <span>${car.e_t.gearbox}</span>
        </div>
    </div>

    <div class="dimensions-capacity">
        <h2>Dimensions & Capacity</h2>
        <div class="detail">
            <span>Length</span>
            <span>${car.d_c.length}</span>
        </div>
        <div class="detail">
            <span>Width</span>
            <span>${car.d_c.width}</span>
        </div>
        <div class="detail">
            <span>Seating Capacity</span>
            <span>${car.d_c.seatingCapacity}</span>
        </div>
        <div class="detail">
            <span>Ground Clearance</span>
            <span>${car.d_c.groundClearance}</span>
        </div>
        <div class="detail">
            <span>Gross Weight</span>
            <span>${car.d_c.grossWeight}</span>
        </div>
        <div class="detail">
            <span>No. of Doors</span>
            <span>${car.d_c.no_Doors}</span>
        </div>
    </div>
        `;
        document.querySelector('.prev').addEventListener('click', prevSlide);
        document.querySelector('.next').addEventListener('click', nextSlide);
        showSlide(0); // Show the first slide initially

        document.querySelectorAll('.interested').forEach(button => {
            button.addEventListener('click', () => {
                auth.onAuthStateChanged(user => {
                    if (user) {
                        console.log('Authenticated User UID:', user.uid);
                        const userRef = ref(database, `users/${user.uid}`);
                        
                        get(userRef).then(snapshot => {
                            if (snapshot.exists()) {
                                const userData = snapshot.val();
                                console.log('Retrieved User Data:', userData); // Check the content
                
                                // Ensure 'name' and 'number' are available
                                const userName = userData.name || 'N/A';
                                const userNumber = userData.number || 'N/A';
                
                                console.log('User Name:', userName);
                                console.log('User Number:', userNumber);
                
                                // Construct the email body
                                const emailBody = `
                                    A user is interested in the car with the following details:
                                    Car Name: ${car.name}
                                    User Name: ${userName}
                                    User Number: ${userNumber}
                                `;
                
                                // Send email notification using Formspree
                                fetch('https://formspree.io/f/xvgpyzpo', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        name: `Interest in ${car.name}`,
                                        email: 'info@themotorgaadi.in',
                                        message: emailBody,
                                    }),
                                })
                                .then(response => {
                                    if (response.ok) {
                                        alert('Your interest has been notified to the dealer.');
                                        window.location.href = `/interested-car.html?carId=${car.id}`;
                                    } else {
                                        alert('There was a problem sending the notification.');
                                    }
                                })
                                .catch(error => console.error('Error sending email:', error));
                            } else {
                                console.error('No user data found');
                                alert('User data not found.');
                            }
                        }).catch(error => console.error('Error fetching user data:', error));
                    } else {
                        window.location.href = '/login-signup.html';
                    }
                });

            });
        });
    } else {
        document.getElementById('car-details-container').innerHTML = '<p>Car details not found.</p>';
    }
}

let recommendationHTML = '';
const maxIterations = 4;
let iterationCount = 0;
cars.forEach((car) => {
    if (iterationCount < maxIterations) {
        recommendationHTML += `
            <div class="recommendation-container" data-car-id="${car.id}">
                <div class="recommendation-card">
                    <div class="recommendation-card-image-container">
                        <img src="${car.images.coverImage}" alt="${car.name}">
                    </div>     
                    <div class="recommendation-details">
                        <h2>${car.name}</h2>
                        <p class="recommendation-overview">${car.overview.driven} • ${car.overview.fuel} • ${car.overview.transmission}</p>
                        <p class="recommendation-price">₹${car.price}</p>
                    </div>
                </div>
            </div>
        `;
        iterationCount++;
    }
});

document.querySelector('.recommendations').innerHTML = recommendationHTML;

// Add click event listeners to recommendation containers
document.querySelectorAll('.recommendation-container').forEach(container => {
    container.addEventListener('click', () => {
        const carId = container.getAttribute('data-car-id');
        window.location.href = `/car-details.html?carId=${carId}`;
    });
});
function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    if (index >= totalSlides) {
        index = 0;
    }
    if (index < 0) {
        index = totalSlides - 1;
    }
    const slider = document.querySelector('.slider');
    slider.style.transform = `translateX(-${index * 100}%)`;
    document.querySelector('.used-container').dataset.slideIndex = index; // Save the current slide index
}

function nextSlide() {
    let slideIndex = parseInt(document.querySelector('.used-container').dataset.slideIndex) || 0;
    slideIndex++;
    showSlide(slideIndex);
}

function prevSlide() {
    let slideIndex = parseInt(document.querySelector('.used-container').dataset.slideIndex) || 0;
    slideIndex--;
    showSlide(slideIndex);
}
document.addEventListener('DOMContentLoaded', loadCarDetails);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.prev').addEventListener('click', prevSlide);
    document.querySelector('.next').addEventListener('click', nextSlide);
    showSlide(0); // Show the first slide initially
});


document.addEventListener('DOMContentLoaded', () => {
    const callButton = document.querySelector('.chat');
    if (callButton) {
        callButton.addEventListener('click', () => {
            window.location.href = 'tel:+917021840316';
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('.footer').innerHTML = data;
        });
});

