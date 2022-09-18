/// <reference path="./env/ProcessEnv.d.ts" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  define: {
    "process.env.POKEDEX_DOTNET_RUNTIME": JSON.stringify(
      process.env.POKEDEX_DOTNET_RUNTIME ?? "/AppBundle/dotnet.js"
    ),
    "process.env.POKEDEX_DICT_PATH": JSON.stringify(
      process.env.POKEDEX_DICT_PATH ?? "/resources/pokedex.db"
    ),
  },
});
