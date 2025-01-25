document.addEventListener('DOMContentLoaded', () => {
  const cardArrayBase = [
    { name: 'fries', img: 'images/fries.png' },
    { name: 'cheeseburger', img: 'images/cheeseburger.png' },
    { name: 'ice-cream', img: 'images/ice-cream.png' },
    { name: 'pizza', img: 'images/pizza.png' },
    { name: 'milkshake', img: 'images/milkshake.png' },
    { name: 'hotdog', img: 'images/hotdog.png' }
  ];
  let cardArray = [];
  const grid = document.querySelector('.grid');
  const resultDisplay = document.querySelector('#result');
  const timerDisplay = document.querySelector('#timer');
  const difficultySelect = document.querySelector('#difficulty');
  const startButton = document.querySelector('#start-game');
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];
  let timer;
  let timeLeft;

  // Start Game
  startButton.addEventListener('click', () => {
    const difficulty = difficultySelect.value;
    adjustDifficulty(difficulty);
    resetGame();
    createBoard();
    startTimer();
  });

  // Adjust difficulty
  function adjustDifficulty(difficulty) {
    if (difficulty === 'easy') {
      cardArray = [...cardArrayBase.slice(0, 3), ...cardArrayBase.slice(0, 3)];
      timeLeft = 60;
    } else if (difficulty === 'medium') {
      cardArray = [...cardArrayBase.slice(0, 4), ...cardArrayBase.slice(0, 4)];
      timeLeft = 45;
    } else if (difficulty === 'hard') {
      cardArray = [...cardArrayBase, ...cardArrayBase];
      timeLeft = 30;
    }
    cardArray.sort(() => 0.5 - Math.random());
  }

  // Reset game
  function resetGame() {
    clearInterval(timer);
    cardsChosen = [];
    cardsChosenId = [];
    cardsWon = [];
    resultDisplay.textContent = 0;
    grid.innerHTML = '';
    timerDisplay.textContent = timeLeft;
  }

  // Create board
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('data-id', i);
      card.addEventListener('click', flipCard);

      const frontFace = document.createElement('img');
      frontFace.classList.add('front-face');
      frontFace.setAttribute('src', 'images/blank.png');

      const backFace = document.createElement('img');
      backFace.classList.add('back-face');
      backFace.setAttribute('src', cardArray[i].img);

      card.appendChild(frontFace);
      card.appendChild(backFace);
      grid.appendChild(card);
    }
  }

  // Check for matches
  function checkForMatch() {
    const cards = document.querySelectorAll('.card');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (optionOneId == optionTwoId) {
      alert('You have clicked the same card!');
    } else if (cardsChosen[0] === cardsChosen[1]) {
      alert('You found a match!');
      cards[optionOneId].classList.add('matched');
      cards[optionTwoId].classList.add('matched');
      cardsWon.push(cardsChosen);
    } else {
      cards[optionOneId].classList.remove('flipped');
      cards[optionTwoId].classList.remove('flipped');
      alert('Sorry, try again!');
    }
    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length;
    if (cardsWon.length === cardArray.length / 2) {
      clearInterval(timer);
      resultDisplay.textContent = 'Congratulations! You found them all!';
    }
  }

  // Flip card
  function flipCard() {
    const cardId = this.getAttribute('data-id');
    if (!this.classList.contains('flipped') && !this.classList.contains('matched')) {
      this.classList.add('flipped');
      cardsChosen.push(cardArray[cardId].name);
      cardsChosenId.push(cardId);
      if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500);
      }
    }
  }

  // Start timer
  function startTimer() {
    timerDisplay.textContent = timeLeft;
    timer = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
      if (timeLeft === 0) {
        clearInterval(timer);
        alert('Time is up! Game over!');
      }
    }, 1000);
  }
});
