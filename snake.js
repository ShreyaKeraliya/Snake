// Get the canvas element
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const score1 = document.getElementById('Score'); 
// Set the canvas dimensions
canvas.width = 400;
canvas.height = 400;

// Set the game variables
let snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 }
];
let snakeHead;
let snakeTail;

// Draw the snake
function drawSnake() {    
    // ctx.strokeStyle = 'green';
    // ctx.fillStyle = 'green'; 
    // ctx.lineWidth = 1; // optional, sets the line width
    // ctx.beginPath();
    // ctx.roundRect(snake[0].x, snake[0].y, 10,10,[0, 0, 60, 100]);
    // ctx.stroke();
    // ctx.fill();
    ctx.strokeStyle = '#4e7923';
ctx.fillStyle = '#4e7923'; 
ctx.lineWidth = 0.1; 

let radius = [0, 0, 0, 0]; // default radius for all corners

if (direction === 'right') { // moving right
    radius = [0, 60, 60, 0]; // top-left and top-right corners rounded
} else if (direction === 'left') { // moving left
    radius = [60, 0, 0, 60]; // top-right and bottom-right corners rounded
} else if (direction === 'up') { // moving up
    radius = [60, 60, 0, 0]; // top-left and top-right corners rounded
} else if (direction === 'down') { // moving down
    radius = [0, 0, 60, 60]; // bottom-left and bottom-right corners rounded
}

ctx.beginPath();
ctx.roundRect(snake[0].x, snake[0].y, 10, 10, radius);
ctx.stroke();
ctx.fill();

    ctx.fillStyle = '#8cb454';
    for (let i = 1; i < snake.length; i++) {
      ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
    }
    ctx.fillStyle = 'blue';
    ctx.roundRect(snake[snake.length - 1].x,snake[snake.length - 1].y,10,10,[0, 0, 50, 60]);

}




let food = { x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10 };
let score = 0;
let scale = 10;
let direction = 'right';
let gameOver = false;

// Draw the game board
function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.fillStyle = URL('bgimg4.jpg');
  ctx.fillStyle = '#171c0c';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'black';
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}



// Draw the food
function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, 10, 10);
}

// Update the game state
function updateGameState() {
  // Move the snake
  for (let i = snake.length - 1; i > 0; i--) {
    snake[i].x = snake[i - 1].x;
    snake[i].y = snake[i - 1].y;
  }
  switch (direction) {
    case 'up':
      snake[0].y -= 10;
      break;
    case 'down':
      snake[0].y += 10;
      break;
    case 'left':
      snake[0].x -= 10;
      break;
    case 'right':
      snake[0].x += 10;
      break;
  }
    if (snake[0].x >= canvas.width) {
      snake[0].x = 0;
    }

    if (snake[0].y >= canvas.height) {
      snake[0].y = 0;
    }

    if (snake[0].x < 0) {
      snake[0].x = canvas.width - scale;
    }

    if (snake[0].y < 0) {
        snake[0].y = canvas.height - scale;
    }

  // Check for collisions with the wall or itself
  if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height) {
    gameOver = true;
  }
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      gameOver = true;
    }
  }

  // Check for food collision
  if (snake[0].x === food.x && snake[0].y === food.y) {
    updateScore();
    food = { x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10 };
    snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
  }
}

// Handle keyboard input
function handleKeydown(e) {
  switch (e.key) {
    case "ArrowRight":
      if (direction!== "left") {
        direction = "right";
      }
      break;
    case "ArrowLeft":
      if (direction!== "right") {
        direction = "left";
      }
      break;
    case "ArrowUp":
      if (direction!== "down") {
        direction = "up";
      }
      break;
    case "ArrowDown":
      if (direction!== "up") {
        direction = "down";
      }
      break;
  }
}

document.addEventListener("keydown", handleKeydown);
const gameOverPopup = document.querySelector('.game-over-popup');
const playAgainBtn = document.getElementById('play-again-btn');

// Game loop
setInterval(() => {
  if (!gameOver) {
    updateGameState();
    drawBoard();
    drawSnake();
    drawFood();
  } else {
    gameOverPopup.classList.add('show');
    showFinalScore(score);

  }
}, 110);

function reset() {
  snake = [
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 }
  ];
  food = { x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10 };
  score = 0;
  scale = 10;
  direction = 'right';
  gameOver = false; 
  gameOverPopup.classList.remove('show');
  resetscore();
}

function resetscore() {
  scoreElement.textContent = `Score: 0`;
  maxScoreElement.textContent = `Max Score: ${maxScore}`;
}
let Score = 0;
let maxScore = 0;
const scoreElement = document.getElementById('Score');
const maxScoreElement = document.getElementById('MaxScore');
const ScoreElement = document.getElementById('final-score');

function updateScore() {
  score++;
  scoreElement.textContent = `Score: ${score}`;
  localStorage.getItem(score);
  if (score > maxScore) {
    maxScore = score;
    maxScoreElement.textContent = `Max Score: ${maxScore}`;
  }
}


function showFinalScore(score) {
  const finalScoreElement = document.getElementById('final-score');
  finalScoreElement.textContent = `Your score: ${score}`;
  console.log("score is"+score);
}


