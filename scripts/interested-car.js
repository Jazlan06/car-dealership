import { cars } from './data/cars.js';

function getCarDetails(carId) {
    return cars.find(car => car.id === carId);
}

function createWhatsAppMessage(car) {
    
    return `
        **I'm interested in ${car.name}**
Driven: ${car.overview.driven}
Fuel: ${car.overview.fuel}
Ownership: ${car.overview.ownership}
    `;
}

function showSellerDetails(car) {
    const sellerDetailsHTML = `
        <div class="card-body">
            <div class="text-center">
                <img src="${car.images.coverImage}" alt="Car Image" class="img-fluid rounded">
            </div>
            <div class="interested-car-info"> 
                <h5 class="card-title mt-3">${car.name}</h5>
                <p class="card-text"><small class="text-muted">${car.overview.driven} • ${car.overview.fuel} • ${car.overview.transmission} • ${car.overview.ownership}</small></p>
                <h5 class="card-text text-primary">₹${car.price}</h5>
                <small>
                <a href="#" class="text-info">Make Your Offer</a></small>
                <div class="alert alert-success" role="alert">
                    <i class="fas fa-check-circle"></i> Make Your Offer via Visit, Call & Chat. 
                </div>
                <h6 class="card-subtitle mb-2 text-muted">The Motor Gaadi</h6>
                <p class="card-text">3rd Floor, BMC Parking Hub, Cama Industrial Estate, Uswala Road, Goregaon East - 400063 | Next To Hub Mall Goregaon East</p>
                <div class="d-flex justify-content-around mt-3">
                    <a href="https://www.google.com/maps/@${19.15407},${ 72.85610},20z" class="btn btn-outline-primary" target="_blank"><i class="fas fa-directions"></i> Direction</a>
                    <a href="tel:+917021840316" class="btn btn-danger"><i class="fas fa-phone-alt"></i> Call</a>
                </div>
            </div>
        </div>
    `;

    document.querySelector('.seller-details-container').innerHTML = sellerDetailsHTML;

    document.querySelector('.text-info').addEventListener('click', (event) => {
        event.preventDefault();

        const message = createWhatsAppMessage(car);
        const phoneNumber = '917021840316'; 
        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        console.log('WhatsApp URL:', url); 
        window.open(url, '_blank'); 
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('carId');

    if (carId) {
        const car = getCarDetails(carId);
        if (car) {
            showSellerDetails(car);
        }
    }

    document.querySelector('.close').addEventListener('click', () => {
        window.history.back();
    });
});

