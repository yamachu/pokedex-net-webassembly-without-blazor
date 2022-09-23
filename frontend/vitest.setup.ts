/// <reference types="node" />
import "@testing-library/jest-dom";
import { readFile } from "fs/promises";
import fetch from "node-fetch";
import { join } from "path";

process.env.POKEDEX_DOTNET_RUNTIME = join(
  "node_modules",
  "@microsoft",
  "dotnet-runtime",
  "dotnet.js"
);

const fetchWrapper = (url: string) => {
  // Hack
  if (url.startsWith("file://")) {
    return readFile(url.replace("file://", "")).then((v) => {
      return {
        arrayBuffer: (): ArrayBuffer => v,
      };
    });
  }
  return fetch(url);
};
window.fetch = window.fetch ?? fetchWrapper;
