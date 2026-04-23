import { PIPE_HEIGHT } from "../constants";

class Pipe extends Phaser.Physics.Arcade.Sprite {
  pipesGroup: Phaser.Physics.Arcade.Group;
  #pipeHorizontalDistanceRange = [350, 400];
  #pipeVerticalDistanceRange = [200, 250];
  #pipesNumber = 4;
  #groundHeight = 0;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number,
    groundHeight?: number,
  ) {
    super(scene, x, y, texture, frame);

    this.#groundHeight = groundHeight;

    this.init();
  }

  private init() {
    this.pipesGroup = this.scene.physics.add.group();

    for (let i = 0; i < this.#pipesNumber; i++) {
      const pipeUp = this.pipesGroup
        .create(this.x, this.y, this.texture.key)
        .setOrigin(0, 1)
        .setImmovable(true)
        .setDepth(3)
        .setFlipY(true);

      const pipeDown = this.pipesGroup
        .create(0, 0, this.texture.key)
        .setOrigin(0, 0)
        .setImmovable(true)
        .setDepth(1);

      this.pipesPlacement(pipeUp, pipeDown, i);
    }

    this.pipesGroup.setVelocityX(-100);
  }

  private pipesPlacement(pipeUp: Pipe, pipeDown: Pipe, i: number) {
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
      this.scene.scale.height - this.#groundHeight - PIPE_HEIGHT;

    const finalMaxVerticalPos = Math.min(
      maxUpperPipePos,
      this.scene.scale.height - this.#groundHeight - pipeVerticalDistance,
    );

    const finalMinVerticalPos = Math.max(minVerticalPos, minLowerPipePos);

    const pipeVerticalPosition = Phaser.Math.Between(
      finalMinVerticalPos,
      finalMaxVerticalPos,
    );

    pipeUp.x =
      i === 0
        ? this.scene.scale.width + 50
        : maxRightPosition + pipeHorizontalDistance;
    pipeDown.x = pipeUp.x;
    pipeUp.y = pipeVerticalPosition;
    pipeDown.y = pipeUp.y + pipeVerticalDistance;
  }

  private getMaxRightPosition() {
    let maxRight = 0;

    this.pipesGroup.getChildren().forEach((pipe: Pipe) => {
      maxRight = Math.max(pipe.x, maxRight);
    });

    return maxRight;
  }

  recycle() {
    const pipesTemp: Pipe[] = [];

    this.pipesGroup.getChildren().forEach((pipe: Pipe, index) => {
      if (pipe.getBounds().right <= 0) {
        pipesTemp.push(pipe);
        if (pipesTemp.length === 2) {
          this.pipesPlacement(pipesTemp[0], pipesTemp[1], index);
        }
      }
    });
  }
}

export default Pipe;
