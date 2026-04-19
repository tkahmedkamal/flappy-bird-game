import { SPRITE_KEYS } from "../constants";

class PreloadScene extends Phaser.Scene {
  #ground: TileSprite = null;
  #clouds: TileSprite = null;
  #config: GameConfig = null;

  constructor(config: GameConfig) {
    super("PreloadScene");
    this.#config = config;
  }

  preload() {
    this.load.spritesheet(SPRITE_KEYS.ground, "assets/grounds.png", {
      frameWidth: 120,
      frameHeight: 120,
      startFrame: 0,
      endFrame: 2,
    });

    this.load.spritesheet(SPRITE_KEYS.clouds, "assets/clouds.png", {
      frameWidth: 209,
      frameHeight: 450,
      startFrame: 0,
    });
  }

  create() {
    const configWidth = Number(this.#config.width || 0);
    const configHeight = Number(this.#config.height || 0);

    this.#ground = this.createScrollingBg({
      key: SPRITE_KEYS.ground,
      x: 0,
      y: configHeight,
      width: configWidth,
      height: 120,
      depth: 2,
    });

    this.#clouds = this.createScrollingBg({
      key: SPRITE_KEYS.clouds,
      x: 0,
      y: configHeight,
      width: configWidth,
      height: 450,
    });
  }

  update() {
    this.#ground.tilePositionX += 1;
    this.#clouds.tilePositionX += 0.4;
  }

  createScrollingBg({
    key,
    x,
    y,
    width,
    height,
    depth = 1,
  }: TileSpriteParams): TileSprite {
    const tileSprite = this.add
      .tileSprite(x, y, width, height, key)
      .setOrigin(0, 1)
      .setDepth(depth);

    return tileSprite;
  }
}

export default PreloadScene;
