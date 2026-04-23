import { CLOUDS_HEIGHT, GROUND_HEIGHT, SPRITE_KEYS } from "../constants";

class MainScene extends Phaser.Scene {
  protected ground!: TileSprite;
  protected clouds!: TileSprite;

  constructor(key: string) {
    super(key);
  }

  create() {
    this.ground = this.createScrollingBg({
      key: SPRITE_KEYS.ground,
      x: 0,
      y: this.scale.height,
      width: this.scale.width,
      height: GROUND_HEIGHT,
      depth: 2,
    });

    this.clouds = this.createScrollingBg({
      key: SPRITE_KEYS.clouds,
      x: 0,
      y: this.scale.height,
      width: this.scale.width,
      height: Math.min(this.scale.height * 0.6, CLOUDS_HEIGHT),
    });

    this.clouds.displayHeight = Math.min(
      this.scale.height * 0.6,
      CLOUDS_HEIGHT,
    );
    this.clouds.scaleX = this.clouds.scaleY;

    this.physics.add.existing(this.ground, true);
    this.createBirdAnimations();
  }

  private createBirdAnimations() {
    this.anims.create({
      key: "fly",
      delay: 1000,
      frames: this.anims.generateFrameNumbers(SPRITE_KEYS.bird, {
        start: 0,
        end: 5,
      }),
      frameRate: 8,
      repeat: -1,
    });
  }

  update() {
    this.ground.tilePositionX += 1;
    this.clouds.tilePositionX += 0.4;
  }

  private createScrollingBg({
    key,
    x,
    y,
    width,
    height,
    depth = 1,
  }: TileSpriteParams): TileSprite {
    return this.add
      .tileSprite(x, y, width, height, key)
      .setOrigin(0, 1)
      .setDepth(depth);
  }
}

export default MainScene;
