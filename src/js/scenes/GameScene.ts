import { SCENES_KEYS, SPRITE_KEYS } from "../constants";
import MainScene from "./MainScene";
import { Bird } from "../entities";

class GameScene extends MainScene {
  #bird!: Bird;

  constructor() {
    super(SCENES_KEYS.playScene);
  }

  create() {
    super.create();

    this.#bird = new Bird(
      this,
      this.scale.width / 2,
      (this.scale.height - this.ground.height - 200) / 2,
      SPRITE_KEYS.bird,
    );

    this.physics.add.collider(this.#bird, this.ground);
    this.input.on("pointerdown", () => this.#bird.flap());
    this.input.keyboard?.on("keydown-SPACE", () => this.#bird.flap());
  }

  update() {
    super.update();
    this.#bird.updateBird();
  }
}

export default GameScene;
