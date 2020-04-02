const guessesElement = document.getElementById("guesses");
const messageElement = document.getElementById("message");
const guessSubmit = document.getElementById("guess-submit");
const guessInput = document.getElementById("guess-input");
const resetButton = document.getElementById("reset");

guessSubmit.addEventListener("click", checkGuess);
resetButton.addEventListener("click", resetGame);
guessInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    checkGuess();
  }
});

let randomNumber = generateRandomInteger(1, 100);
let guessCount = 1;

function checkGuess() {
  if (guessInput.value === null || guessInput.value.trim() === "") {
    return;
  }
  let userGuess = Number(guessInput.value);
  if (guessCount === 1) {
    guesses.textContent = "Previous guesses: ";
  }

  guesses.textContent += userGuess + " ";
  messageElement.className = "message";

  if (userGuess === randomNumber) {
    messageElement.textContent = "Congratulations! You got it right!";
    messageElement.classList.add("message-success");
    setGameOver();
  } else if (guessCount === 10) {
    messageElement.textContent = "GAME OVER!";
    messageElement.classList.add("message-warning");
    setGameOver();
  } else {
    messageElement.textContent = "Wrong!";
    messageElement.classList.add("message-error");
    if (userGuess < randomNumber) {
      messageElement.textContent += " Too low!";
    } else if (userGuess > randomNumber) {
      messageElement.textContent += " Too high!";
    }
  }

  guessCount++;
  guessInput.value = "";
  guessInput.focus();
}

function setGameOver() {
  guessInput.disabled = true;
  guessSubmit.disabled = true;
  resetButton.className = "";
}

function resetGame() {
  guessCount = 1;

  const resultsElements = document.querySelectorAll("#results p");
  for (let i = 0; i < resultsElements.length; i++) {
    resultsElements[i].textContent = "";
  }

  guessInput.disabled = false;
  guessSubmit.disabled = false;
  guessInput.value = "";
  guessInput.focus();
  messageElement.className = "";
  resetButton.className = "hidden";

  randomNumber = generateRandomInteger(1, 100);
}

function generateRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}