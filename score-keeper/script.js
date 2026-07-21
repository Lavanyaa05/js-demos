const scoreText = document.getElementById("score");
const message = document.getElementById("message");

const increaseButton = document.getElementById("increaseButton");
const decreaseButton = document.getElementById("decreaseButton");
const resetButton = document.getElementById("resetButton");


function createCounter() {
  let score = 0;

  function changeScore(amount) {
    score = score + amount;
    return score;
  }

  function resetScore() {
    score = 0;
    return score;
  }

  return {
    changeScore: changeScore,
    resetScore: resetScore
  };
}


const counter = createCounter();


increaseButton.addEventListener("click", function () {
  const score = counter.changeScore(1);

  updatePage(score, "Score increased");
});


decreaseButton.addEventListener("click", function () {
  const score = counter.changeScore(-1);

  updatePage(score, "Score decreased");
});


resetButton.addEventListener("click", function () {
  const score = counter.resetScore();

  updatePage(score, "Score reset");
});


function updatePage(score, newMessage) {
  scoreText.textContent = score;
  message.textContent = newMessage;

  if (score > 0) {
    scoreText.className = "score-number positive-score";
  } else if (score < 0) {
    scoreText.className = "score-number negative-score";
  } else {
    scoreText.className = "score-number";
  }
}


/*
This small example is here to show hoisting and scope.
It does not appear on the webpage.
*/

showHoistingExample();

function showHoistingExample() {
  var beforeAssignment;

  if (true) {
    let blockMessage = "This only exists inside this block";
    console.log(blockMessage);
  }

  console.log("Hoisting example:", beforeAssignment);

  beforeAssignment = "Value added";
}