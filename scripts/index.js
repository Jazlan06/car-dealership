import { cars } from "./data/cars.js"; 

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


consoleText(['The Motor Gaadi', 'Reliable cars, trusted dealership, best deals', 'Drive home in style and satisfaction','Drive with confidence, choose with us'], 'text', ['tomato', 'rebeccapurple', 'lightblue']);

function consoleText(words, id, color) {
    var letterCount = 1;
    var x = 1;
    var waiting = false;
    var target = document.getElementById(id);
    target.style.color = 'rgb(99,3,3)'; // Set initial color
  
    window.setInterval(function() {
      if (letterCount === 0 && waiting === false) {
        waiting = true;
        target.innerHTML = words[0].substring(0, letterCount);
        window.setTimeout(function() {
          var usedWord = words.shift();
          words.push(usedWord);
          x = 1;
          target.innerHTML = words[0].substring(0, letterCount);
          letterCount += x;
          waiting = false;
        }, 1000);
      } else if (letterCount === words[0].length + 1 && waiting === false) {
        waiting = true;
        window.setTimeout(function() {
          x = -1;
          letterCount += x;
          waiting = false;
        }, 1000);
      } else if (waiting === false) {
        target.innerHTML = words[0].substring(0, letterCount);
        letterCount += x;
      }
    }, 120);
  
    window.setInterval(function() {
      var underscore = document.getElementById('console');
      underscore.classList.toggle('hidden');
    }, 400);
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

// Add event listener for the view-all-cars button
const viewButton = document.querySelector('.view-all-cars');
if (viewButton) {
    viewButton.addEventListener('click', () => {
        window.location.href = 'used-cars.html'; // Redirect to used-cars.html
    });
};

document.addEventListener('DOMContentLoaded', function() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('.footer').innerHTML = data;
        });
});