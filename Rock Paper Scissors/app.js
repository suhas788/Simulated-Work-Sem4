const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');
const winCountDisplay = document.getElementById('win-count');
const lossCountDisplay = document.getElementById('loss-count');
const tieCountDisplay = document.getElementById('tie-count');
const possibleChoices = document.querySelectorAll('button');
let userChoice;
let computerChoice;
let result;
let wins = 0;
let losses = 0;
let ties = 0;

// Sound effects
const winSound = new Audio('win.mp3');
const loseSound = new Audio('lose.mp3');
const drawSound = new Audio('draw.mp3');

// Add click listener to choices
possibleChoices.forEach((choice) =>
  choice.addEventListener('click', (e) => {
    userChoice = e.target.id;

    // Add animation to user choice
    e.target.classList.add('selected');
    setTimeout(() => e.target.classList.remove('selected'), 300);

    userChoiceDisplay.innerHTML = userChoice;
    generateComputerChoice();
    getResult();
  })
);

function generateComputerChoice() {
  const randomNumber = Math.floor(Math.random() * 3); // 0 to 2

  if (randomNumber === 0) {
    computerChoice = 'rock';
  }
  if (randomNumber === 1) {
    computerChoice = 'paper';
  }
  if (randomNumber === 2) {
    computerChoice = 'scissors';
  }
  computerChoiceDisplay.innerHTML = computerChoice;
}

function getResult() {
  if (computerChoice === userChoice) {
    result = "It's a draw!";
    ties++;
    drawSound.play();
  } else if (
    (computerChoice === 'rock' && userChoice === 'paper') ||
    (computerChoice === 'paper' && userChoice === 'scissors') ||
    (computerChoice === 'scissors' && userChoice === 'rock')
  ) {
    result = 'You win!';
    wins++;
    winSound.play();
  } else {
    result = 'You lose!';
    losses++;
    loseSound.play();
  }

  resultDisplay.innerHTML = result;
  updateScore();
}

function updateScore() {
  winCountDisplay.innerHTML = wins;
  lossCountDisplay.innerHTML = losses;
  tieCountDisplay.innerHTML = ties;
}
