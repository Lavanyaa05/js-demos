const callbackButton = document.getElementById("callbackButton");
const tipBox = document.getElementById("tipBox");

const tips = [
  "Break large tasks into smaller steps.",
  "Take short breaks while studying.",
  "Practise questions instead of only reading.",
  "Explain the topic aloud to test yourself.",
  "Keep your phone away during focused work."
];

function getRandomTip() {
  const randomNumber = Math.floor(Math.random() * tips.length);
  return tips[randomNumber];
}

function loadTip(callback) {
  setTimeout(function () {
    const tip = getRandomTip();
    callback(tip);
  }, 1200);
}

callbackButton.addEventListener("click", function () {
  tipBox.className = "tip-box loading";
  tipBox.textContent = "Loading a study tip...";

  loadTip(function (tip) {
    tipBox.className = "tip-box success";
    tipBox.textContent = tip;
  });
});