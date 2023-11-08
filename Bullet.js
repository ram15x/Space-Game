export default class Bullet {
    constructor(canvas, x, y, velocity, bulletColor) {
      this.canvas = canvas;
      this.x = x;// The initial x-coordinate of the bullet.
      this.y = y;// The initial y-coordinate of the bullet.
      this.velocity = velocity;//speed at which the bullet moves.
      this.bulletColor = bulletColor;
     //dimension of the bullet  
      this.width = 5;
      this.height = 20;
    }
  
    draw(ctx) {
      this.y -= this.velocity;
      ctx.fillStyle = this.bulletColor;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  
    collideWith(sprite) { //This method is used to check for collisions between 
      //the bullet and another sprite (enemy).
      if (
        this.x + this.width > sprite.x &&
        this.x < sprite.x + sprite.width &&
        this.y + this.height > sprite.y &&
        this.y < sprite.y + sprite.height
      ) {
        return true;
      } else {
        return false;
      }
    }
  }