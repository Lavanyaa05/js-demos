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

  const profileBio = document.createElement("p");

  if (user.bio) {
    profileBio.textContent = user.bio;
  } else {
    profileBio.textContent = "No bio available.";
  }

  const profileStats = document.createElement("div");

  const repoCount = document.createElement("p");
  repoCount.textContent = "Public repositories: " + user.public_repos;

  const followerCount = document.createElement("p");
  followerCount.textContent = "Followers: " + user.followers;

  const followingCount = document.createElement("p");
  followingCount.textContent = "Following: " + user.following;

  profileStats.appendChild(repoCount);
  profileStats.appendChild(followerCount);
  profileStats.appendChild(followingCount);

  profileResult.appendChild(profileImage);
  profileResult.appendChild(profileName);
  profileResult.appendChild(profileUsername);
  profileResult.appendChild(profileBio);
  profileResult.appendChild(profileStats);
}