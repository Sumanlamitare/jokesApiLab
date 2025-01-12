import { getCategories, getJoke } from "./api.js";
import { displayJoke, populateCategories } from "./ui.js";

let selectedCategory = "Any";
let favoriteJokes = []; // Array to store favorite jokes

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

  // Event listener for the Favorite Joke button
  const favoriteBtn = document.querySelector(".favoriteJoke");
  favoriteBtn.addEventListener("click", () => {
    const joke = document.querySelector(".jokeDisplay p").textContent;
    if (joke && !favoriteJokes.includes(joke)) {
      favoriteJokes.push(joke); // Add joke to favorites
      console.log("Favorite Jokes: ", favoriteJokes);
      alert("Joke is added to your favorite");
    }
  });
});

//function to post a joke to the api

document.querySelector(".postJoke").addEventListener("click", showPostForm);

function showPostForm() {
  document.querySelector(".mainContainer").style.display = "none";
  document.querySelector(".form-container ").style.display = "block";
}
document
  .getElementById("jokeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Call the postJoke function
    postJoke();
  });

async function postJoke() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: document.getElementById("categorypost").value,
        body: document.getElementById("joke").value,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to post the joke");
    } else {
      const data = await response.json();
      console.log("posted", data);
    }
    alert("Joke has been posted.");
    document.querySelector(".mainContainer").style.display = "flex";
    document.querySelector(".form-container ").style.display = "none";
  } catch (error) {
    console.log(error.message);
  }
}
