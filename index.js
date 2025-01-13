import { getCategories, getJoke } from "./api.js";
import { displayJoke, populateCategories } from "./ui.js";

let selectedCategory = "Any";

document.addEventListener("DOMContentLoaded", async () => {
  // Fetch categories and populate the dropdown
  const categories = await getCategories();
  populateCategories(categories);

  // Event listener for category change
  const categorySelect = document.getElementById("category");
  categorySelect.addEventListener("change", (event) => {
    selectedCategory = event.target.value;
  });

  // Event listener for the Get Joke button
  const getJokeBtn = document.querySelector(".getJokes");
  getJokeBtn.addEventListener("click", async () => {
    const joke = await getJoke(selectedCategory);
    displayJoke(joke);
  });

  document.querySelector(".postJoke").addEventListener("click", showPostForm);

  // Show the form to post a joke
  function showPostForm() {
    document.querySelector(".mainContainer").style.display = "none";
    document.querySelector(".form-container").style.display = "block";
  }

  // Event listener for the joke form submission
  document
    .getElementById("jokeForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      postJoke();
    });

  // The async function to post the joke to the API
  async function postJoke() {
    try {
      // Fetch request to the placeholder API
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST", // Set the method to POST
          body: JSON.stringify({
            title: document.getElementById("categorypost").value, // Get the category input value
            body: document.getElementById("joke").value, // Get the joke input value
            userId: 1, // You can set any userId you like
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8", // Ensure the request is in JSON format
          },
        }
      );

      // Check if the response is OK (status 200-299)
      if (!response.ok) {
        throw new Error("Failed to post the joke"); // If the request failed, throw an error
      }

      // If the post was successful, parse the JSON data and log it
      const data = await response.json();
      console.log("Posted:", data);

      // Show a success message to the user
      alert("Joke has been posted.");

      // Hide the form and return to the main container

      document.querySelector(".mainContainer").style.display = "flex";
      displayJoke("");
      document.querySelector(".form-container").style.display = "none";
    } catch (error) {
      console.log(error.message); // Log any errors that occur
    }
  }

  // Initially hide the form
  document.querySelector(".form-container").style.display = "none";
});
