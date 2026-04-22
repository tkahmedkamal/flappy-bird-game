import {
  BIRD_HEIGHT,
  BIRD_WIDTH,
  CLOUDS_HEIGHT,
  GROUND_HEIGHT,
  GROUND_WIDTH,
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
      frameWidth: 209,
      frameHeight: Math.min(this.scale.height * 0.6, CLOUDS_HEIGHT),
      startFrame: 0,
    });

    this.load.spritesheet(SPRITE_KEYS.bird, "assets/birds.png", {
      frameWidth: BIRD_WIDTH,
      frameHeight: BIRD_HEIGHT,
      startFrame: 0,
      endFrame: 5,
    });
  }

  create() {
    this.scene.start(SCENES_KEYS.playScene);
  }
}

export default PreloadScene;
