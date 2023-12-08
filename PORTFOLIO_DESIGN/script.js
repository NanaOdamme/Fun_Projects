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



document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menu-icon');
    const mobileNavbar = document.querySelector('.navbar');

    menuIcon.addEventListener('click', function () {
        mobileNavbar.style.display = mobileNavbar.style.display === 'flex' ? 'none' : 'flex';
    });

    // Close mobile navbar when a link is clicked
    const mobileNavLinks = document.querySelectorAll('.navbar a');
    mobileNavLinks.forEach(link => {
          link.addEventListener('click', function () {
            mobileNavbar.style.display = 'none';
        });
    });

    // Close mobile navbar when clicking outside of it
    document.addEventListener('click', function (event) {
        if (!event.target.matches('#menu-icon') && !event.target.closest('.navbar')) {
            mobileNavbar.style.display = 'none';
        }
    });
});


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
