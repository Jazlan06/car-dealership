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
};

document.addEventListener('DOMContentLoaded', loadHeader);

const container = document.getElementById("container");
const registerbtn = document.getElementById("register");
const loginbtn = document.getElementById("login");

registerbtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginbtn.addEventListener("click", () => {
  container.classList.remove("active");
});
