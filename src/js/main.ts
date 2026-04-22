import Phaser from "phaser";
import { PreloadScene } from "./scenes";
import { GameScene } from "./scenes";
import { HEIGHT, WIDTH } from "./constants";

const config = {
  width: WIDTH,
  height: HEIGHT,
};

new Phaser.Game({
  ...config,
  type: Phaser.AUTO,
  backgroundColor: "#5DC7FD",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: process.env.NODE_ENV !== "production",
    },
  },
  scene: [PreloadScene, GameScene],
});
