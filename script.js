const apiUrl = "http://localhost:3000";

function fetchReviews(resource) {
    const url = `${apiUrl}/${resource}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data); // Array of reviews data
        
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



  const stars = document.querySelectorAll('.star1');
console.log(stars);

let ratingValue;

stars.forEach(function(star) {
  star.addEventListener('click', function() {
    const rating = this.getAttribute('data-rating');
    console.log('Rating: ' + rating);
    ratingValue = rating;
  });
});

const form = document.querySelector('.review-form');
form.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent the default form submission behavior

  const name = document.querySelector('#input-name').value;
  const thumbnail = document.querySelector('#imgurl').value;
  const reviewTitle = document.querySelector('#review-tittle').value;
  const review = document.querySelector('#input-review').value;
  const resource = document.querySelector('#input-shop').value;

  const reviewData = {
    rating: ratingValue,
    thumbnail,
    name,
    reviewtittle: reviewTitle,
    review,
  };

  console.log('Review data:', reviewData);
  
    // send the review data to the appropriate resource inputted in the form
    const url = `http://localhost:3000/${resource}`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reviewData)
    })
    .then(response => {
      if (response.ok) {
        console.log(`Review posted to ${resource} successfully`);
        form.reset();
      } else {
        console.error(`Error posting review to ${resource}: ${response.status}`);
      }
    })
    .catch(error => {
      console.error(`Error posting review to ${resource}: ${error}`);
    });
  });
  
  

  

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
