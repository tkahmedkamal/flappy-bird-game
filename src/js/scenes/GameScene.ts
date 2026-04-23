import { SCENES_KEYS, SPRITE_KEYS } from "../constants";
import MainScene from "./MainScene";
import { Bird, PipeManager } from "../entities";

class GameScene extends MainScene {
  #bird!: Bird;
  #pipeManager!: PipeManager;
  #birdGroundCollider!: Phaser.Physics.Arcade.Collider;
  #isGameOver = false;

  constructor() {
    super(SCENES_KEYS.playScene);
  }

  create() {
    this.#isGameOver = false;
    super.create();
    this.createBird();
    this.createPipes();
    this.createInputs();
    this.createCollisions();
  }

  update() {
    if (!this.#isGameOver) {
      this.#bird.updateBird();
      super.update();
      this.#pipeManager.recycle();
    }

    if (this.#bird.getBounds().top <= 0) {
      this.gameOver();
    }
  }

  private createBird() {
    this.#bird = new Bird(
      this,
      this.scale.width / 2,
      (this.scale.height - this.ground.height - 200) / 2,
      SPRITE_KEYS.bird,
    );
  }

  private createPipes() {
    this.#pipeManager = new PipeManager(
      this,
      0,
      0,
      SPRITE_KEYS.pipe,
      this.ground.height,
    );
  }

  private createInputs() {
    this.input.on("pointerdown", () => this.#bird.flap());
    this.input.keyboard?.on("keydown-SPACE", () => this.#bird.flap());
  }

  private createCollisions() {
    this.physics.add.collider(this.#bird, this.#pipeManager.pipesGroup, () =>
      this.gameOver(),
    );

    this.#birdGroundCollider = this.physics.add.collider(
      this.#bird,
      this.ground,
      () => this.gameOver(),
    );
  }

  private gameOver() {
    if (this.#isGameOver) return;
    this.#isGameOver = true;
    this.#pipeManager.pipesGroup.setVelocityX(0);
    this.input.off("pointerdown");
    this.input.keyboard?.off("keydown-SPACE");
    this.#bird.body.setVelocity(60, -160);
    this.#bird.setAngularVelocity(-720);
    this.#bird.body.setGravityY(4800);
    this.#bird.body.setDrag(35, 0);
    this.#bird.body.setMaxVelocity(800, 2200);
    this.#bird.stop();

    this.time.delayedCall(100, () => {
      this.#birdGroundCollider.active = false;
      this.#bird.body.checkCollision.none = true;
      this.#bird.setCollideWorldBounds(false);
      this.#bird.setVelocityX(0);
      this.#bird.setFrame(5);
    });
  }
}

export default GameScene;
