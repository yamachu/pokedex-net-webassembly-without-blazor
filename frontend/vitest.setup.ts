/// <reference types="node" />
import "@testing-library/jest-dom";
import { join } from "path";

process.env.POKEDEX_DOTNET_RUNTIME = join(
  "node_modules",
  "@microsoft",
  "dotnet-runtime",
  "dotnet.js"
);
