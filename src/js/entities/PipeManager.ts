import { PIPES_VELOCITY, PIPE_HEIGHT } from "../constants";
class PipeManager {
  #scene: Phaser.Scene;
  #x: number;
  #y: number;
  #texture: string;
  #levels: DifficultyLevels = {
    easy: {
      pipeVerticalDistanceRange: [200, 250],
      pipeHorizontalTimeRangeSec: [3.4, 4.0],
    },
    normal: {
      pipeVerticalDistanceRange: [150, 180],
      pipeHorizontalTimeRangeSec: [2.9, 3.5],
    },
    hard: {
      pipeVerticalDistanceRange: [120, 140],
      pipeHorizontalTimeRangeSec: [2.4, 3.0],
    },
  };
  #currentLevel: DifficultyLevel = "easy";
  #pipesNumber = 4;
  #groundHeight = 0;
  #pipesTemp: Sprite[] = [];
  pipesGroup: Phaser.Physics.Arcade.Group;
  pipesVelocity = PIPES_VELOCITY;

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
    this.pipesGroup.setVelocityX(this.pipesVelocity);
  }

  private pipesPlacement(pipeUp: Sprite, pipeDown: Sprite, i: number) {
    const maxRightPosition = this.getMaxRightPosition();
    const levelConfig = this.#levels[this.#currentLevel];
    const speedPxPerSec = Math.abs(this.pipesVelocity);
    const [tMin, tMax] = levelConfig.pipeHorizontalTimeRangeSec;
    const pipeHorizontalDistance = Phaser.Math.Between(
      Math.round(tMin * speedPxPerSec),
      Math.round(tMax * speedPxPerSec),
    );
    const pipeVerticalDistance = Phaser.Math.Between(
      levelConfig.pipeVerticalDistanceRange[0],
      levelConfig.pipeVerticalDistanceRange[1],
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
    pipeUp.setData("passed", false);
    pipeDown.setData("passed", false);
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

  get currentLevel() {
    return this.#currentLevel;
  }

  setDifficulty(level: DifficultyLevel) {
    this.#currentLevel = level;
  }

  updateSpeed(nextSpeed: number) {
    this.pipesVelocity = nextSpeed;
    this.pipesGroup.setVelocityX(nextSpeed);
  }
}
export default PipeManager;
