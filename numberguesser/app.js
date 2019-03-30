/*
GAME FUNCTION: 
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if they lose
- Let player choose to play again
*/

// Game variables
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Listen for guess
guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);

  // Validate input
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check if won
  if (guess === winningNum) {
    // Game end - won
    gameEnd(true, `${guess} is correct! You WIN!`);
  } else {
    // Wrong number
    guessesLeft--;

    if (guessesLeft === 0) {
      // Game over - lost

      gameEnd(
        false,
        `You ran out of guesses, you LOSE! The correct number was ${winningNum}.`
      );
    } else {
      // Game continues, answer wrong
      setMessage(
        `${guess} is incorrect. You have ${guessesLeft} guesses left before failure.`
      );

      guessInput.value = '';

      // Change border color
      guessInput.style.borderColor = 'red';
    }
  }
});

// Play again event listener
game.addEventListener('mousedown', function(e) {
  if (e.target.classList.contains('play-again')) {
    window.location.reload();
  }
});

// Set message
function setMessage(msg, color = 'black') {
  message.style.color = color;
  message.textContent = msg;
}

// Game end
function gameEnd(won, msg) {
  let color;
  won === true ? (color = 'green') : (color = 'red');

  // Disable the input
  guessInput.disabled = true;

  // Change color
  document.body.style.backgroundColor = color;

  if (won) {
    // Tell them they won
    setMessage(msg, 'white');
  } else {
    setMessage(msg);
  }

  // Play again?
  guessBtn.value = 'Play Again';
  guessBtn.className = 'btn btn-light play-again';
}

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
