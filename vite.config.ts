import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "showcase",
  publicDir: "../public",
  plugins: [react()],
  build: {
    outDir: "../showcase-dist",
    emptyOutDir: true,
  },
});
