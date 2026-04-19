import Phaser from "phaser";
import { PreloadScene } from "./scenes";

const config = {
  width: 600,
  height: 850,
};

new Phaser.Game({
  ...config,
  type: Phaser.AUTO,
  backgroundColor: "#5DC7FD",
  scene: [new PreloadScene(config)],
});
