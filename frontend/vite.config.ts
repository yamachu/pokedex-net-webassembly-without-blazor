/// <reference path="./env/ProcessEnv.d.ts" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.POKEDEX_DOTNET_RUNTIME": JSON.stringify(
      process.env.POKEDEX_DOTNET_RUNTIME ?? "/AppBundle/dotnet.js"
    ),
  },
});
