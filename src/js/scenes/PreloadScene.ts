import {
  AUDIO_KEYS,
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
      startFrame: 0,
      endFrame: 3,
    });

    this.load.image(SPRITE_KEYS.pattern, "assets/pattern.png");
    this.load.image(SPRITE_KEYS.logo, "assets/flappy-bird-logo.png");
    this.load.image(SPRITE_KEYS.flapBadge, "assets/flap-badge.png");
    this.load.image(SPRITE_KEYS.playButton, "assets/play-button.png");
    this.load.image(SPRITE_KEYS.pauseButton, "assets/pause-button.png");

    this.load.audio(AUDIO_KEYS.jump, "assets/jump.wav");
    this.load.audio(AUDIO_KEYS.fall, "assets/fall.wav");
    this.load.audio(AUDIO_KEYS.passed, "assets/pickupCoin.wav");
    this.load.audio(AUDIO_KEYS.themeMusic, "assets/theme-music.mp3");
  }

  create() {
    this.scene.start(SCENES_KEYS.startScene);
  }
}

export default PreloadScene;
