import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

export default defineConfig({
  // index.html out file will start with a relative path for script
  base: "./",
  server: {
    port: 3001,
  },
  build: {
    // disable this for low bundle sizes
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          kaplay: ["kaplay"],
        },
      },
    },
  },
  plugins: [
    checker({
      typescript: {
        tsconfigPath: "./tsconfig.json",
      },
    }),
  ],
});
