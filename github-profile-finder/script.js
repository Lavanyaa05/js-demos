const searchForm = document.getElementById("searchForm");
const usernameInput = document.getElementById("usernameInput");
const profileMessage = document.getElementById("profileMessage");
const profileResult = document.getElementById("profileResult");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = usernameInput.value.trim();

  if (username === "") {
    profileMessage.textContent = "Please enter a GitHub username.";
    return;
  }

  profileMessage.textContent = "Loading profile data...";

  fetch("https://api.github.com/users/" + username)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("User not found.");
      }

      return response.json();
    })
    .then(function (user) {
      console.log(user);

      profileMessage.textContent =
        "Profile data loaded. Check the browser console.";
    })
    .catch(function (error) {
      profileMessage.textContent = error.message;
    });
});