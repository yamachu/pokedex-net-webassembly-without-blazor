/// <reference types="node" />
import "@testing-library/jest-dom";
import { readFile } from "fs/promises";
import { join } from "path";

process.env.POKEDEX_DOTNET_RUNTIME = join(
  "node_modules",
  "@microsoft",
  "dotnet-runtime",
  "dotnet.js"
);

const fetchWrapper = (url: string) => {
  return readFile(url).then((v) => {
    return {
      arrayBuffer: (): ArrayBuffer => v,
    };
  });
};
window.fetch = window.fetch ?? fetchWrapper;
