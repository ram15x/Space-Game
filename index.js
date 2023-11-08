import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";
const canvas = document.getElementById("game");//canvas setup
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const background = new Image();
background.src = "images/space.png";
const playerBulletController = new BulletController(canvas, 10, "red",);//player bullet with color red an speed 10
const enemyBulletController = new BulletController(canvas, 4, "white",);//enemy bullet with speed 4
const enemyController = new EnemyController(
  canvas,
  enemyBulletController,
  playerBulletController
);
const player = new Player(canvas, 3, playerBulletController);

let isGameOver = false;//default false
let didWin = false;

/*It checks if the game is over.
If not, it first draws the background image.
Then it draws the game elements (enemies, player, bullets) using the respective controllers.*/
function game() {
  checkGameOver();
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  displayGameOver();
  if (!isGameOver) {
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);
  }
}

function displayGameOver() {//if game over
  if (isGameOver) {
    let text = didWin ? "You Win" : "Game Over";
    let textOffset = didWin ? 3.5 : 5;

    ctx.fillStyle = "white";
    ctx.font = "70px Arial";
    ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
  }
}
function checkGameOver() {
  if (isGameOver) {
    return;
  }
//If an enemy bullet collides with the player.
  if (enemyBulletController.collideWith(player)) {
    isGameOver = true;
  }
//If an enemy collides with the player.
  if (enemyController.collideWith(player)) {
    isGameOver = true;
  }
//If there are no more enemies left (player wins).
  if (enemyController.enemyRows.length === 0) {
    didWin = true;
    isGameOver = true;
  }
}
// a method in JavaScript that repeatedly calls a function
/*it's calling the function game at an interval of 1000 / 60 milliseconds. 
responsible for updating the game state (like positions of elements, 
checking for collisions, etc.) and rendering the updated state on the canvas.*/
setInterval(game, 1000 / 60);