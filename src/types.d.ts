import type { SPRITE_KEYS } from "./js/constants";

declare global {
  type TileSprite = Phaser.GameObjects.TileSprite;

  type Sprite = Phaser.Physics.Arcade.Sprite;

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

  interface DifficultyTierConfig {
    pipeVerticalDistanceRange: [number, number];
    pipeHorizontalTimeRangeSec: [number, number];
  }

  interface DifficultyLevels {
    easy: DifficultyTierConfig;
    normal: DifficultyTierConfig;
    hard: DifficultyTierConfig;
  }

  type DifficultyLevel = keyof DifficultyLevels;
}

export {};
