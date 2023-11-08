import Bullet from "./Bullet.js";
export default class BulletController {
  bullets = [];
  timeTillNextBulletAllowed = 0;// A counter to track the time until the next bullet can be shot.

  constructor(canvas, maxBulletsAtATime, bulletColor, soundEnabled) {
    this.canvas = canvas;   // The game canvas where the bullets will be drawn.
    //: A boolean indicating whether sound is enabled
    this.maxBulletsAtATime = maxBulletsAtATime;    // The maximum number of bullets allowed to be active at the same time.
    this.bulletColor = bulletColor;//The color of the bullets.
    this.soundEnabled = soundEnabled; // A boolean indicating whether sound is enabled
    this.shootSound = new Audio("sounds/shoot.wav");
    this.shootSound.volume = 0.1;
  }
  draw(ctx) {
    this.bullets = this.bullets.filter(
      (bullet) => bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height
    );

    this.bullets.forEach((bullet) => bullet.draw(ctx));
    if (this.timeTillNextBulletAllowed > 0) {
      this.timeTillNextBulletAllowed--;
    }
  }
  /* This method is used to check if any bullets in the controller have collided with a given sprite.
If a collision is found, it removes the bullet from the bullets array and returns true. Otherwise, it returns false.*/
  collideWith(sprite) {
    const bulletThatHitSpriteIndex = this.bullets.findIndex((bullet) =>
      bullet.collideWith(sprite)
    );

    if (bulletThatHitSpriteIndex >= 0) {
      this.bullets.splice(bulletThatHitSpriteIndex, 1);
      return true;
    }

    return false;
  }
//this method is used to shoot a bullet.
//if sound is enabled, it plays a shooting sound effect.
//It also updates the timeTillNextBulletAllowed counter.
  shoot(x, y, velocity, timeTillNextBulletAllowed = 0) {
    if (
      this.timeTillNextBulletAllowed <= 0 &&
      this.bullets.length < this.maxBulletsAtATime
    ) {
      const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor);
      this.bullets.push(bullet);
      if (this.soundEnabled) {
        this.shootSound.currentTime = 0;
        this.shootSound.play();
      }
      this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
    }
  }
}