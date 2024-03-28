const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");


// Creating elements for the pop-up:

const popUpBgc = document.createElement('div');
const popUpDiv = document.createElement('div');
const popUpH2 = document.createElement('h2');
const popUpP = document.createElement('p');
const popUpClick = document.createElement('input');
const buttonWarpper = document.createElement('div');

// Pop Up massage:
popUpBgc.className = 'pop-bgc';
popUpDiv.className = 'pop-up';
popUpClick.type = 'button';
buttonWarpper.className = 'btn-warpper';

document.body.appendChild(popUpBgc);
popUpBgc.appendChild(popUpDiv);

popUpDiv.innerHTML +=
  `
  <h2>אופס, נפסלת</h2>
  <h4>🤭</h4>
  <p>לחצ/י בכדי להתחיל משחק חדש</p>
  `;

// Create function with condition that pops up if game over

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let movementX = 0, movementY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;

const popUpMessage = () => {
  if (gameOver) {
    popUpDiv.style.display = 'block';
    popUpBgc.style.display = 'block';
  } else {
    popUpDiv.style.display = 'none';
    popUpBgc.style.display = 'none';
  }
}

popUpClick.addEventListener('click', () => {
  location.reload();
});

popUpClick.className = 'pop-up-click';
popUpClick.value = 'לחצו כאן';
popUpDiv.appendChild(buttonWarpper);
buttonWarpper.appendChild(popUpClick);

// Retrieve high score from storage

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `שיא קודם: ${highScore}`;

// Update food position function

const updateFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
}

// Handle game over function

const handleGameOver = () => {
  clearInterval(setIntervalId);
  popUpMessage();
}

// Change direction function

const changeDirection = e => {
  if (e.key === "ArrowUp" && movementY != 1) {
    movementX = 0;
    movementY = -1;
  } else if (e.key === "ArrowDown" && movementY != -1) {
    movementX = 0;
    movementY = 1;
  } else if (e.key === "ArrowLeft" && movementX != 1) {
    movementX = -1;
    movementY = 0;
  } else if (e.key === "ArrowRight" && movementX != -1) {
    movementX = 1;
    movementY = 0;
  }
}

controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));

// Initialize game function

const initGame = () => {
  if (gameOver) return handleGameOver();

  if (!snakeBody.length) {
    snakeX = Math.floor(Math.random() * 30) + 1;
    snakeY = Math.floor(Math.random() * 30) + 1;
  }

  let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

  if (!snakeBody.length) { }

  if (snakeX === foodX && snakeY === foodY) {
    updateFoodPosition();
    snakeBody.push([foodY, foodX]);
    score++;
    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);
    scoreElement.innerText = `ניקוד: ${score}`;
    highScoreElement.innerText = `שיא קודם: ${highScore}`;
  }

  snakeX += movementX;
  snakeY += movementY;

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeX, snakeY];

  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    return gameOver = true;
  }

  for (let i = 0; i < snakeBody.length; i++) {
    html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
      gameOver = true;
    }
  }

  playBoard.innerHTML = html;
}

updateFoodPosition();
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keyup", changeDirection);
