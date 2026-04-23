import { PIPE_HEIGHT } from "../constants";

class PipeManager {
  #scene: Phaser.Scene;
  #x: number;
  #y: number;
  #texture: string;
  #pipeHorizontalDistanceRange = [350, 400];
  #pipeVerticalDistanceRange = [200, 250];
  #pipesNumber = 4;
  #groundHeight = 0;
  #pipesTemp: Sprite[] = [];
  pipesGroup: Phaser.Physics.Arcade.Group;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    groundHeight?: number,
  ) {
    this.#scene = scene;
    this.#x = x;
    this.#y = y;
    this.#texture = texture;
    this.#groundHeight = groundHeight ?? 0;

    this.init();
  }

  private init() {
    this.pipesGroup = this.#scene.physics.add.group();

    for (let i = 0; i < this.#pipesNumber; i++) {
      const pipeUp = this.pipesGroup
        .create(this.#x, this.#y, this.#texture)
        .setOrigin(0, 1)
        .setImmovable(true)
        .setDepth(3)
        .setFlipY(true);

      const pipeDown = this.pipesGroup
        .create(0, 0, this.#texture)
        .setOrigin(0, 0)
        .setImmovable(true)
        .setDepth(1);

      this.pipesPlacement(pipeUp, pipeDown, i);
    }

    this.pipesGroup.setVelocityX(-100);
  }

  private pipesPlacement(pipeUp: Sprite, pipeDown: Sprite, i: number) {
    const maxRightPosition = this.getMaxRightPosition();

    const pipeHorizontalDistance = Phaser.Math.Between(
      this.#pipeHorizontalDistanceRange[0],
      this.#pipeHorizontalDistanceRange[1],
    );

    const pipeVerticalDistance = Phaser.Math.Between(
      this.#pipeVerticalDistanceRange[0],
      this.#pipeVerticalDistanceRange[1],
    );

    const minVerticalPos = 100;
    const maxUpperPipePos = PIPE_HEIGHT;
    const minLowerPipePos =
      this.#scene.scale.height - this.#groundHeight - PIPE_HEIGHT;

    const finalMaxVerticalPos = Math.min(
      maxUpperPipePos,
      this.#scene.scale.height - this.#groundHeight - pipeVerticalDistance,
    );

    const finalMinVerticalPos = Math.max(minVerticalPos, minLowerPipePos);

    const safeMinVerticalPos = Math.min(
      finalMinVerticalPos,
      finalMaxVerticalPos,
    );
    const safeMaxVerticalPos = Math.max(
      finalMinVerticalPos,
      finalMaxVerticalPos,
    );

    const pipeVerticalPosition = Phaser.Math.Between(
      safeMinVerticalPos,
      safeMaxVerticalPos,
    );

    pipeUp.x =
      i === 0
        ? this.#scene.scale.width + 50
        : maxRightPosition + pipeHorizontalDistance;
    pipeDown.x = pipeUp.x;
    pipeUp.y = pipeVerticalPosition;
    pipeDown.y = pipeUp.y + pipeVerticalDistance;
  }

  private getMaxRightPosition() {
    let maxRight = 0;

    this.pipesGroup.getChildren().forEach((pipe: Sprite) => {
      if (pipe.x > maxRight) {
        maxRight = pipe.x;
      }
    });

    return maxRight;
  }

  recycle() {
    this.pipesGroup.getChildren().forEach((pipe: Sprite, index) => {
      if (pipe.getBounds().right <= 0) {
        this.#pipesTemp.push(pipe);
        if (this.#pipesTemp.length === 2) {
          this.pipesPlacement(this.#pipesTemp[0], this.#pipesTemp[1], index);
          this.#pipesTemp.length = 0;
        }
      }
    });
  }
}

export default PipeManager;
