const apiUrl = "http://localhost:3000";

function fetchReviews(resource) {
    const url = `${apiUrl}/${resource}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data); // Array of reviews data
        // You can manipulate the data and DOM here
        
        // Clear previous reviews
        const reviewsGrid = document.querySelector(".review-grid");
        reviewsGrid.innerHTML = "";
  
        data.forEach(review => {
          const reviewContainer = document.createElement("div");
          reviewContainer.className = "review-container";
          
          const toprow = document.createElement("div");
          toprow.setAttribute("id", "toprow");
          const thumbnail = document.createElement("img");
          thumbnail.src = review.thumbnail;
          const nameElem = document.createElement("h4");
          nameElem.innerText = review.name;
          const ratingElem = document.createElement("span");
          ratingElem.innerText = review.rating;

          nameElem.appendChild(ratingElem)
  
          toprow.appendChild(thumbnail);
          toprow.appendChild(nameElem);
          
  
          const bottomrow = document.createElement("div");
          bottomrow.setAttribute("id", "bottomrow")
          const reviewTitleElem = document.createElement("h3");
          reviewTitleElem.innerText = review.reviewtittle;
          const reviewElem = document.createElement("p");
          reviewElem.innerText = review.review;
          
          bottomrow.appendChild(reviewTitleElem);
          bottomrow.appendChild(reviewElem);
  
          reviewContainer.appendChild(toprow);
          reviewContainer.appendChild(bottomrow);
  
          reviewsGrid.appendChild(reviewContainer);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  

function addButtonListeners() {
  const buttons = document.querySelectorAll(".ecommerce button");
  buttons.forEach(button => {
    button.addEventListener("click", function() {
      const resource = this.getAttribute("data-resource");
      fetchReviews(resource);
    });
  });
}

document.addEventListener("DOMContentLoaded", function() {
  addButtonListeners();
});
