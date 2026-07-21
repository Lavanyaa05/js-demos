const searchForm = document.getElementById("searchForm");
const usernameInput = document.getElementById("usernameInput");
const profileMessage = document.getElementById("profileMessage");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = usernameInput.value.trim();

  if (username === "") {
    profileMessage.textContent = "Please enter a GitHub username.";
    return;
  }

  profileMessage.textContent = "Searching for " + username + "...";
});