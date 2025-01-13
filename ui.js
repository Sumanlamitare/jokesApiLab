// Function to display a joke on the UI
export function displayJoke(joke) {
  const displayJoke = document.querySelector(".jokeDisplay");
  displayJoke.innerHTML = ""; // Clear previous joke
  const jokeElement = document.createElement("p");
  jokeElement.textContent = joke;
  displayJoke.appendChild(jokeElement);
}

// Function to populate the category dropdown with categories
export function populateCategories(categories) {
  const categorySelect = document.getElementById("category");
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}
