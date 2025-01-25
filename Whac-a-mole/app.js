const squares = document.querySelectorAll('.square');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');

let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;
let bonusTimerId = null;

// Function to randomly place a mole
function randomSquare() {
  squares.forEach(square => {
    square.classList.remove('mole', 'bonus-mole'); // Clear existing moles
  });

  const randomSquare = squares[Math.floor(Math.random() * squares.length)];
  randomSquare.classList.add('mole');
  hitPosition = randomSquare.id;
}

// Function to place a bonus mole occasionally
function randomBonusSquare() {
  const bonusChance = Math.random();
  if (bonusChance > 0.7) { // 30% chance for a bonus mole
    const randomSquare = squares[Math.floor(Math.random() * squares.length)];
    randomSquare.classList.add('bonus-mole');
    hitPosition = randomSquare.id;
  }
}

// Add event listeners for clicking the mole
squares.forEach(square => {
  square.addEventListener('mousedown', () => {
    if (square.id === hitPosition) {
      if (square.classList.contains('bonus-mole')) {
        result += 5; // Bonus mole gives 5 points
      } else {
        result++;
      }
      score.textContent = result;
      hitPosition = null;
    }
  });
});

// Move regular moles every 500ms
function moveMole() {
  timerId = setInterval(randomSquare, 500);
}

// Place bonus moles every 3 seconds
function moveBonusMole() {
  bonusTimerId = setInterval(randomBonusSquare, 3000);
}

// Countdown timer
function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime === 0) {
    clearInterval(timerId);
    clearInterval(bonusTimerId);
    clearInterval(countDownTimerId);
    alert('GAME OVER! Your final score is ' + result);
  }
}

let countDownTimerId = setInterval(countDown, 1000);

moveMole();
moveBonusMole();
