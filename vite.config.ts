import type { UserConfig } from "vite";

export default {
  define: {
    CANVAS_RENDERER: true,
    WEBGL_RENDERER: true,
  },
  server: {
    port: 3000,
  },
} satisfies UserConfig;
