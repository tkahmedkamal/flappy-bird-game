import type { SPRITE_KEYS } from "./js/constants";

declare global {
  type TileSprite = Phaser.GameObjects.TileSprite;

  type GameConfig = Phaser.Types.Core.GameConfig;

  type SpriteKey = (typeof SPRITE_KEYS)[keyof typeof SPRITE_KEYS];

  type TileSpriteParams = {
    key: SpriteKey;
    x: number;
    y: number;
    width: number;
    height: number;
    depth?: number;
  };
}

export {};
