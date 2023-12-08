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
