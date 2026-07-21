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

  profileMessage.textContent = "Loading profile...";
  profileResult.innerHTML = "";

  fetch("https://api.github.com/users/" + username)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("User not found.");
      }

      return response.json();
    })
    .then(function (user) {
      console.log(user);
      showBasicProfile(user);

      profileMessage.textContent = "Profile loaded.";
    })
    .catch(function (error) {
      profileMessage.textContent = error.message;

      profileResult.innerHTML =
        '<div class="profile-placeholder">No profile to display.</div>';
    });
});

function showBasicProfile(user) {
  const profileImage = document.createElement("img");
  profileImage.src = user.avatar_url;
  profileImage.alt = user.login + " profile picture";
  profileImage.width = 120;
  profileImage.height = 120;
  profileImage.style.borderRadius = "50%";

  const profileName = document.createElement("h2");

  if (user.name) {
    profileName.textContent = user.name;
  } else {
    profileName.textContent = user.login;
  }

  const profileUsername = document.createElement("p");
  profileUsername.textContent = "@" + user.login;

  profileResult.appendChild(profileImage);
  profileResult.appendChild(profileName);
  profileResult.appendChild(profileUsername);
}