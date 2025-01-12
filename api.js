export async function getCategories() {
  const response = await fetch("https://v2.jokeapi.dev/categories");
  const data = await response.json();
  return data.categories;
}

// Function to fetch a joke based on the selected category
export async function getJoke(category = "Any") {
  const response = await fetch(
    `https://v2.jokeapi.dev/joke/${category}?blacklistFlags=nsfw,racist,sexist,explicit&format=txt`
  );
  const joke = await response.text();
  return joke;
}
