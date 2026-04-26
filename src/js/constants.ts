export const SPRITE_KEYS = {
  ground: "ground",
  clouds: "clouds",
  bird: "bird",
  pipe: "pipe",
  gameOver: "game-over",
  pattern: "pattern",
  logo: "logo",
  flapBadge: "flap-badge",
  playButton: "play-button",
  pauseButton: "pause-button",
} as const;

export const AUDIO_KEYS = {
  jump: "jump",
  fall: "fall",
  passed: "passed",
} as const;

export const SCENES_KEYS = {
  preloadScene: "PreloadScene",
  playScene: "PlayScene",
  startScene: "StartScene",
} as const;

export const WIDTH = 600;
export const HEIGHT = 1080;
export const GROUND_WIDTH = 120;
export const GROUND_HEIGHT = 120;
export const CLOUDS_WIDTH = 209;
export const CLOUDS_HEIGHT = 618;
export const BIRD_WIDTH = 90;
export const BIRD_HEIGHT = 60;
export const PIPE_WIDTH = 102;
export const PIPE_HEIGHT = 604;
export const LOOK_UP_ANGLE = 20;
export const PATTERN_HEIGHT = 38;
