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
        throw new Error("GitHub user not found.");
      }

      return response.json();
    })
    .then(function (user) {
      showProfile(user);
      profileMessage.textContent = "Profile loaded.";
    })
    .catch(function (error) {
      profileMessage.textContent = error.message;

      profileResult.innerHTML =
        '<div class="profile-placeholder">No profile to display.</div>';
    });
});

function showProfile(user) {
  profileResult.innerHTML = "";

  const image = document.createElement("img");
  image.src = user.avatar_url;
  image.alt = user.login + " profile picture";
  image.width = 120;
  image.height = 120;
  image.style.borderRadius = "50%";

  const name = document.createElement("h2");

  if (user.name) {
    name.textContent = user.name;
  } else {
    name.textContent = user.login;
  }

  const username = document.createElement("p");
  username.textContent = "@" + user.login;

  const bio = document.createElement("p");

  if (user.bio) {
    bio.textContent = user.bio;
  } else {
    bio.textContent = "No bio available.";
  }

  const location = document.createElement("p");
  location.textContent =
    "Location: " + (user.location || "Not provided");

  const repositories = document.createElement("p");
  repositories.textContent =
    "Public repositories: " + user.public_repos;

  const followers = document.createElement("p");
  followers.textContent = "Followers: " + user.followers;

  const following = document.createElement("p");
  following.textContent = "Following: " + user.following;

  const profileLink = document.createElement("a");
  profileLink.href = user.html_url;
  profileLink.textContent = "Open GitHub profile";
  profileLink.target = "_blank";

  profileResult.appendChild(image);
  profileResult.appendChild(name);
  profileResult.appendChild(username);
  profileResult.appendChild(bio);
  profileResult.appendChild(location);
  profileResult.appendChild(repositories);
  profileResult.appendChild(followers);
  profileResult.appendChild(following);
  profileResult.appendChild(profileLink);
}
