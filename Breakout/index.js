const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;
const boardWidth = 560;
const boardHeight = 300;
let xDirection = -2;
let yDirection = 2;

const userStart = [230, 10];
let currentPosition = userStart;

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

let timerId;
let score = 0;
let level = 1;
let speed = 30;

class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    this.topLeft = [xAxis, yAxis + blockHeight];
  }
}

let blocks = [];

// Generate blocks dynamically based on the level
function generateBlocks(level) {
  blocks = [];
  const rows = level + 2; // Increase the number of rows as the level increases
  const cols = 5; // Fixed number of columns

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * (blockWidth + 10);
      const y = boardHeight - (row + 1) * (blockHeight + 10);
      blocks.push(new Block(x, y));
    }
  }
}

// Draw blocks
function addBlocks() {
  grid.innerHTML = ''; // Clear the grid for new layout
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.style.left = blocks[i].bottomLeft[0] + 'px';
    block.style.bottom = blocks[i].bottomLeft[1] + 'px';
    grid.appendChild(block);
  }
}

function nextLevel() {
  level++;
  xDirection = -2 - level; // Increase speed on the x-axis
  yDirection = 2 + level;  // Increase speed on the y-axis
  speed = Math.max(10, speed - 5); // Decrease timer interval, minimum is 10ms

  generateBlocks(level); // Generate new layout
  addBlocks();

  ballCurrentPosition = [...ballStart];
  drawBall();
  currentPosition = [...userStart];
  drawUser();

  clearInterval(timerId);
  timerId = setInterval(moveBall, speed);
}

generateBlocks(level);
addBlocks();

const user = document.createElement('div');
user.classList.add('user');
grid.appendChild(user);
drawUser();

const ball = document.createElement('div');
ball.classList.add('ball');
grid.appendChild(ball);
drawBall();

function moveUser(e) {
  switch (e.key) {
    case 'ArrowLeft':
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        drawUser();
      }
      break;
    case 'ArrowRight':
      if (currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 10;
        drawUser();
      }
      break;
  }
}
document.addEventListener('keydown', moveUser);

function drawUser() {
  user.style.left = currentPosition[0] + 'px';
  user.style.bottom = currentPosition[1] + 'px';
}

function drawBall() {
  ball.style.left = ballCurrentPosition[0] + 'px';
  ball.style.bottom = ballCurrentPosition[1] + 'px';
}

function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
}
timerId = setInterval(moveBall, speed);

function checkForCollisions() {
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] < blocks[i].topLeft[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll('.block'));
      allBlocks[i].classList.remove('block');
      blocks.splice(i, 1);
      changeDirection();
      score++;
      scoreDisplay.innerHTML = score;

      if (blocks.length === 0) {
        if (level < 5) {
          alert(`Level ${level} Complete!`);
          nextLevel();
        } else {
          scoreDisplay.innerHTML = 'You Win!';
          clearInterval(timerId);
          document.removeEventListener('keydown', moveUser);
        }
      }
    }
  }

  if (
    ballCurrentPosition[0] >= boardWidth - ballDiameter ||
    ballCurrentPosition[0] <= 0 ||
    ballCurrentPosition[1] >= boardHeight - ballDiameter
  ) {
    changeDirection();
  }

  if (
    ballCurrentPosition[0] > currentPosition[0] &&
    ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
    ballCurrentPosition[1] > currentPosition[1] &&
    ballCurrentPosition[1] < currentPosition[1] + blockHeight
  ) {
    changeDirection();
  }

  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId);
    scoreDisplay.innerHTML = 'You lose!';
    document.removeEventListener('keydown', moveUser);
  }
}

function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }
}
