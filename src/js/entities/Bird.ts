import { LOOK_DOWN_ANGLE, LOOK_UP_ANGLE, SPRITE_KEYS } from "../constants";

class Bird extends Phaser.Physics.Arcade.Sprite {
  declare body: Phaser.Physics.Arcade.Body;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.init();
  }

  private init() {
    this.setCollideWorldBounds(true);
    this.setDepth(3);
    this.body.setGravityY(800);
    this.body.setVelocityY(0);
    this.play("fly");
  }

  flap() {
    this.body.setVelocityY(-250);
  }

  updateBird() {
    let targetAngle = 0;

    if (this.body.velocity.y < 0) {
      targetAngle = -LOOK_UP_ANGLE;
    } else if (this.y > this.scene.scale.height * 0.7) {
      targetAngle = LOOK_DOWN_ANGLE;
    } else {
      targetAngle = 0;
    }

    this.angle = Phaser.Math.Linear(this.angle, targetAngle, 0.15);
  }
}

export default Bird;
