import { Bird } from "../entities";
import {
  BIRD_HEIGHT,
  BIRD_WIDTH,
  PATTERN_HEIGHT,
  SCENES_KEYS,
  SPRITE_KEYS,
} from "./../constants";
import MainScene from "./MainScene";

class StartScene extends MainScene {
  #bird!: Bird;
  #patternTopY = 50;
  #patternBottomY = 200;
  #birdY!: number;

  constructor() {
    super(SCENES_KEYS.startScene);
  }

  create() {
    super.create();
    this.createBird();
    this.createPattern();
    this.createLogo();
    this.createText();
    this.createBadge();
    this.createInputs();
  }

  update() {
    super.update();
    this.updateBirdVerticalPosition();
  }

  private createBird() {
    this.#birdY = (this.scale.height - this.ground.height - 200) / 2;

    this.#bird = new Bird(
      this,
      this.scale.width / 2,
      this.#birdY,
      SPRITE_KEYS.bird,
      0,
    );

    this.#bird.body.setAllowGravity(false);
  }

  private createPattern() {
    this.add
      .tileSprite(
        -100,
        this.#patternTopY,
        this.scale.width + 100,
        PATTERN_HEIGHT,
        SPRITE_KEYS.pattern,
      )
      .setOrigin(0);

    this.add
      .tileSprite(
        -100,
        this.#patternBottomY,
        this.scale.width + 100,
        PATTERN_HEIGHT,
        SPRITE_KEYS.pattern,
      )
      .setOrigin(0)
      .setFlipX(true);
  }

  private createLogo() {
    const logoY =
      (this.#patternTopY + this.#patternBottomY + PATTERN_HEIGHT) / 2;

    this.add.image(this.scale.width / 2, logoY, SPRITE_KEYS.logo);
  }

  private createText() {
    const textY = this.#birdY + BIRD_HEIGHT;

    this.add
      .text(this.scale.width / 2, textY, "CLICK OR SPACE TO FLAP", {
        fontSize: "24px",
        fontFamily: "newAmsterdam",
        color: "#ffffff",
        strokeThickness: 1.5,
        stroke: "#134758",
        letterSpacing: 1.5,
      })
      .setOrigin(0.5);
  }

  private createBadge() {
    this.add.image(
      this.scale.width / 2 + BIRD_WIDTH,
      this.#birdY,
      SPRITE_KEYS.flapBadge,
    );
  }

  private updateBirdVerticalPosition() {
    this.#bird.setY(this.#birdY + Math.sin(this.time.now / 300) * 2.6 * 4);
  }

  private createInputs() {
    this.input.on("pointerdown", () => {
      this.scene.start(SCENES_KEYS.playScene);
    });

    this.input.keyboard?.on("keydown-SPACE", () => {
      this.scene.start(SCENES_KEYS.playScene);
    });
  }
}

export default StartScene;
