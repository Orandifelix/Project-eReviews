const apiUrl = "http://localhost:3000";

function fetchContent() {
  const resources = ["jumia", "alibaba", "amazon", "ebay"];

  const promises = resources.map(resource => {
    const url = `${apiUrl}/${resource}`;
    return fetch(url).then(response => response.json());
  });

  Promise.all(promises)
    .then(data => {
      console.log(data); // Array of all resources data
      // You can manipulate the data and DOM here
      const ecommerceDiv = document.querySelector(".ecommerce");
      data.forEach((resourceData, index) => {
        const shopDiv = document.createElement("div");
        const shopName = document.createElement("h2");
        shopName.innerText = resources[index];
        shopDiv.appendChild(shopName);
        ecommerceDiv.appendChild(shopDiv);
      });
    })
    .catch(error => {
      console.log(error);
    });
}

document.addEventListener("DOMContentLoaded", fetchContent);
