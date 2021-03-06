const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/1.png";

const food = new Image();
food.src = "img/2.png";

let box = 20;

let score = 0;

let food2 = {
  x: Math.floor(Math.random() * 30 + 1) * box,
  y: Math.floor(Math.random() * 30 + 1) * box,
};

let snake = [];
snake[0] = {
  x: 15 * box,
  y: 15 * box,
};

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
  if (event.keyCode == 37 && dir != "right") dir = "left";
  else if (event.keyCode == 38 && dir != "down") dir = "up";
  else if (event.keyCode == 39 && dir != "left") dir = "right";
  else if (event.keyCode == 40 && dir != "up") dir = "down";
}

function drawGame() {
  ctx.drawImage(ground, 0, 0);

  ctx.drawImage(food, food2.x, food2.y);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "white";
  ctx.font = "50px Arial";
  ctx.fillText(score, box * 2.5, box * 2.5);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX == food2.x && snakeY == food2.y) {
    score++;
    food2 = {
      x: Math.floor(Math.random() * 30 + 1) * box,
      y: Math.floor(Math.random() * 30 + 1) * box,
    };
  } else {
    snake.pop();
  }


  if (dir == "left") snakeX -= box;
  if (dir == "right") snakeX += box;
  if (dir == "up") snakeY -= box;
  if (dir == "down") snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);
}

let game = setInterval(drawGame, 100);
