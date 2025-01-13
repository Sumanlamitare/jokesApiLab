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

  async function postJoke() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST", // Set the method to POST
          body: JSON.stringify({
            title: document.getElementById("categorypost").value,
            body: document.getElementById("joke").value,
            userId: 1, // You can set any userId you like
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post the joke");
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
