const header = document.querySelector("header")

window.addEventListener ("scroll", function() {
    header.classList.toggle ("sticky", window.scrollY > 200)
});

//gallery properties
//select all filter buttons and cards
const filterBtns = document.querySelectorAll(".filter-btn button");
const filterableCards = document.querySelectorAll(".all-cards .card");

const filterCards = (e) => {
    document.querySelector(".active").classList.remove("active")
    e.target.classList.add("active");
  //  console.log(e.target);

  filterableCards.forEach(card => {
    //add hide class to hide cards
    card.classList.add("hide");
    //check if the card matches the categeory
    if(card.dataset.name === e.target.dataset.name || e.target.dataset.name === "all"){
      card.classList.remove("hide");
    }
  })
};

// Use forEach on filterBtns since it's a NodeList
filterBtns.forEach(button => button.addEventListener("click", filterCards));


// Get the modal and its components
const modal = document.getElementById('myModal');
const modalImage = document.getElementById('modalImage');
const closeBtn = document.querySelector('.close');

// Function to open the modal with a specific image
const openModal = (imageUrl) => {
  modalImage.src = imageUrl;
  modal.style.display = 'block';
};

// Function to close the modal
const closeModal = () => {
  modal.style.display = 'none';
};

/**Event listener for each card to open the modal
filterableCards.forEach(card => {
  card.addEventListener('click', function () {
    const imageUrl = this.querySelector('img').src;
    openModal(imageUrl);
  });
});*/

// Event listener to close the modal when the close button is clicked
closeBtn.addEventListener('click', closeModal);

// Event listener to close the modal when clicking outside of it
window.addEventListener('click', function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

// Close modal on pressing the Esc key
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});


// Function to open the image in a new window
const openImageInNewWindow = (imageUrl) => {
  window.open(imageUrl, '_blank');
};

// Event listener for each card to open the image in a new window
filterableCards.forEach(card => {
  card.addEventListener('click', function () {
    const imageUrl = this.querySelector('img').src;
    openImageInNewWindow(imageUrl);
  });
});

//show and hide navlinks in responsive mode
document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.getElementById("menu-icon");
  const navbar = document.querySelector(".navbar");

  menuIcon.addEventListener("click", function () {
    navbar.classList.toggle("show-links");
  });

  // Close the navigation links when clicking outside of them
  document.body.addEventListener("click", function (event) {
    if (!navbar.contains(event.target) && !menuIcon.contains(event.target)) {
      navbar.classList.remove("show-links");
    }
  });
});

    document.addEventListener("DOMContentLoaded", function () {
        const urlParams = new URLSearchParams(window.location.search);
        const message = urlParams.get('message');

        if (message === 'sent') {
            alert('Message sent!');
        }
    });
