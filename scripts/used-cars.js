import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js';
import { initializeFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js';
import { firebaseConfig } from './firebase-config.js';


const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  databaseId: '(default)',
});

const auth = getAuth(app);

async function fetchCarsAndRender() {
  try {
    const carsCol = collection(db, 'cars');
    const carSnapshot = await getDocs(carsCol);
    const cars = carSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    let usedCarsHTML = '';
    cars.forEach((car) => {
      usedCarsHTML += `
        <div class="used-container" data-car-id="${car.id}">
          <div class="used-car-container">
            <div class="slider">
              <div class="slide"><img src="${car.images.coverImage}" alt="Car Image" class="used-car-img"></div>
              <div class="slide"><img src="${car.images.frontView}" alt="Car Image" class="used-car-img"></div>
              <div class="slide"><img src="${car.images.sideView}" alt="Car Image" class="used-car-img"></div>
              <div class="slide"><img src="${car.images.rearView}" alt="Car Image" class="used-car-img"></div>
              <div class="slide"><img src="${car.images.interior}" alt="Car Image" class="used-car-img"></div>
            </div>
            <button class="prev">❮</button>
            <button class="next">❯</button>
          </div>
          <div class="used-car-info">
            <div class="used-car-name-container">
              <p class="used-car-name">${car.name}</p>
            </div>
            <div class="used-price-fueltype">
              <div class="used-price-container">
                <p class="used-price">&#8377; ${car.price}</p>
              </div>
              <div class="transmission-container">
                <p class="transmission">${car.overview.transmission}</p>
              </div>
              <div class="used-kms">
                <p class="used-car-kms">${car.overview.driven}</p>
              </div>
              <div class="used-fuel-type-container">
                <p class="used-fuel-type">${car.overview.fuel}</p>
              </div>
            </div>
            <div class="used-actions">
              <button class="chat">CALL</button>
              <button class="contact-seller">Interested</button>
            </div>
          </div>
        </div>
      `;
    });

    document.querySelector('.used-car-main').innerHTML = usedCarsHTML;
    setupSliders();
    setupButtonHandlers();
  } catch (error) {
    console.error('Error fetching cars:', error);
  }
}

// --- Slider and button handlers remain the same ---
function setupSliders() {
  document.querySelectorAll('.slider').forEach(slider => {
    slider.dataset.slideIndex = 0;
    slider.parentElement.querySelector('.next').addEventListener('click', (event) => {
      event.stopPropagation();
      let slideIndex = parseInt(slider.dataset.slideIndex) || 0;
      showSlide(slider, ++slideIndex);
    });
    slider.parentElement.querySelector('.prev').addEventListener('click', (event) => {
      event.stopPropagation();
      let slideIndex = parseInt(slider.dataset.slideIndex) || 0;
      showSlide(slider, --slideIndex);
    });
    showSlide(slider, 0);
  });
}

function showSlide(slider, index) {
  const slides = slider.querySelectorAll('.slide');
  const totalSlides = slides.length;
  if (index >= totalSlides) index = 0;
  if (index < 0) index = totalSlides - 1;
  slider.style.transform = `translateX(-${index * 100}%)`;
  slider.dataset.slideIndex = index;
}

function setupButtonHandlers() {
  document.querySelectorAll('.contact-seller').forEach(button => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const carId = button.closest('.used-container').dataset.carId;
      auth.onAuthStateChanged(user => {
        if (user) {
          window.location.href = `/interested-car.html?carId=${carId}`;
        } else {
          window.location.href = '/login-signup.html';
        }
      });
    });
  });

  document.querySelectorAll('.chat').forEach(button => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      window.location.href = 'tel:+917021840316';
    });
  });

  document.querySelectorAll('.used-container').forEach(container => {
    container.addEventListener('click', (event) => {
      if (event.target.closest('button')) return;
      const carId = container.dataset.carId;
      window.location.href = `/car-details.html?carId=${carId}`;
    });
  });

  document.querySelectorAll('.used-car-container, .used-car-info').forEach(element => {
    element.addEventListener('click', (event) => {
      const container = event.currentTarget.closest('.used-container');
      if (!container) return;
      const carId = container.dataset.carId;
      window.location.href = `/car-details.html?carId=${carId}`;
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetchCarsAndRender();
});
