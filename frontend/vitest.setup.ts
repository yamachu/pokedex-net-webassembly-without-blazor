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

// NOTE: Node v18 provides fetch impl, but it does not support `file://`
//       So we override it by using own fetchWrapper
window.fetch = fetchWrapper as any as typeof fetch;
