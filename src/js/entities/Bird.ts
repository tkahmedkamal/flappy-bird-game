import { AUDIO_KEYS, LOOK_UP_ANGLE } from "../constants";

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
    this.body.setGravityY(700);
    this.body.setVelocityY(0);
    this.play("fly");
  }

  flap() {
    this.body.setVelocityY(-280);
    this.scene.sound.play(AUDIO_KEYS.jump);
  }

  updateBird() {
    let targetAngle = 0;

    if (this.body.velocity.y < 0) {
      targetAngle = -LOOK_UP_ANGLE;
    } else {
      targetAngle = 0;
    }

    this.angle = Phaser.Math.Linear(this.angle, targetAngle, 0.15);
  }
}

export default Bird;
