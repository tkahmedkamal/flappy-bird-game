import { SCENES_KEYS, SPRITE_KEYS } from "../constants";
import MainScene from "./MainScene";
import { Bird, PipeManager } from "../entities";

class GameScene extends MainScene {
  #bird!: Bird;
  #pipeManager!: PipeManager;
  #birdGroundCollider!: Phaser.Physics.Arcade.Collider;
  #isGameOver = false;
  #gameOverContainer!: Phaser.GameObjects.Container;
  #canStartAgain = false;

  constructor() {
    super(SCENES_KEYS.playScene);
  }

  create() {
    this.#isGameOver = false;
    this.#canStartAgain = false;

    super.create();
    this.createBird();
    this.createPipes();
    this.createInputs();
    this.createCollisions();
    this.createGameOverContainer();
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
    const handleInput = () => {
      if (this.#isGameOver && this.#canStartAgain) {
        this.scene.restart();
        return;
      }

      if (this.#isGameOver) return;

      this.#bird.flap();
    };

    this.input.on("pointerdown", handleInput);

    this.input.keyboard?.on("keydown-SPACE", handleInput);
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

  private createGameOverContainer() {
    const overlayY = this.scale.height * 0.3;
    const overlayHeight = 130;
    const overlayCenterY = overlayY + overlayHeight / 2;

    const overlay = this.add.graphics();
    overlay
      .fillStyle(0x195e75, 0.7)
      .fillRect(0, overlayY, this.scale.width, overlayHeight);

    const gameOverlayImage = this.add
      .image(this.scale.width / 2, overlayCenterY, SPRITE_KEYS.gameOver)
      .setOrigin(0.5);

    this.#gameOverContainer = this.add.container(0, 0, [
      overlay,
      gameOverlayImage,
    ]);

    this.#gameOverContainer.setVisible(false).setDepth(10);
  }

  private gameOver() {
    if (this.#isGameOver) return;
    this.#isGameOver = true;
    this.#canStartAgain = false;
    this.#pipeManager.pipesGroup.setVelocityX(0);
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
      this.#gameOverContainer.setVisible(true);
    });

    this.time.delayedCall(1000, () => {
      this.#canStartAgain = true;
    });
  }
}

export default GameScene;
