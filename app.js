// https://api.unsplash.com/search/photos?query=food&client_id=4p0a1zcP1HDh5Rwwrxj6mUj6WF5qde5kTDW46pFaBpg

const CLIENT_ID = "4p0a1zcP1HDh5Rwwrxj6mUj6WF5qde5kTDW46pFaBpg";

const API_URL = `https://api.unsplash.com/search/photos?client_id=${CLIENT_ID}&per_page=25`;

const input = document.querySelector("input");
const form = document.querySelector("form");
const imageSection = document.querySelector("#images");
const loadingImage = document.querySelector("#loadingImage");

loadingImage.style.display = "none";

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Delete previous images
  imageSection.innerHTML = "";
  loadingImage.style.display = "";

  const searchTerm = input.value;
  search(searchTerm)
    .then(dispayImages)
    .catch((err) => {
      console.log("Error");
      loadingImage.style.display = "none";
      alert("Something went wrong! Try again!");
    });
});

function search(searchTerm) {
  const url = `${API_URL}&query=${searchTerm}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.results);
}

function dispayImages(images) {
  for (image of images) {
    const imageElement = document.createElement("img");
    imageElement.src = image.urls.regular;
    imageSection.appendChild(imageElement);
  }
  loadingImage.style.display = "none";
}
