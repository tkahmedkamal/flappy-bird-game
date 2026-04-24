import {
  BIRD_HEIGHT,
  BIRD_WIDTH,
  CLOUDS_HEIGHT,
  CLOUDS_WIDTH,
  GROUND_HEIGHT,
  GROUND_WIDTH,
  PIPE_HEIGHT,
  PIPE_WIDTH,
  SCENES_KEYS,
  SPRITE_KEYS,
} from "../constants";

class PreloadScene extends Phaser.Scene {
  constructor() {
    super(SCENES_KEYS.preloadScene);
  }

  preload() {
    this.load.spritesheet(SPRITE_KEYS.ground, "assets/grounds.png", {
      frameWidth: GROUND_WIDTH,
      frameHeight: GROUND_HEIGHT,
      startFrame: 0,
      endFrame: 2,
    });

    this.load.spritesheet(SPRITE_KEYS.clouds, "assets/clouds.png", {
      frameWidth: CLOUDS_WIDTH,
      frameHeight: CLOUDS_HEIGHT,
      startFrame: 0,
    });

    this.load.spritesheet(SPRITE_KEYS.bird, "assets/birds.png", {
      frameWidth: BIRD_WIDTH,
      frameHeight: BIRD_HEIGHT,
      startFrame: 0,
      endFrame: 5,
    });

    this.load.spritesheet(SPRITE_KEYS.pipe, "assets/pipes.png", {
      frameWidth: PIPE_WIDTH,
      frameHeight: PIPE_HEIGHT,
      startFrame: 2,
      endFrame: 3,
    });

    this.load.image(SPRITE_KEYS.gameOver, "assets/game-over.png");
  }

  create() {
    this.scene.start(SCENES_KEYS.playScene);
  }
}

export default PreloadScene;
