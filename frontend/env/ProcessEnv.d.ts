/// <reference types="node" />
declare namespace NodeJS {
  interface ProcessEnv {
    readonly POKEDEX_DOTNET_RUNTIME: string;
    readonly POKEDEX_DICT_PATH: string;
  }
}
