import {
  getTypedAssemblyExports,
  setTypedModuleImports,
} from "dotnet-webassembly-type-helper";
import { useEffect, useMemo, useRef, useState } from "react";
import { POKEDEX_DOTNET_RUNTIME } from "../../env";
import { useDotnet } from "./useDotnet";

type PokedexAssemblyExported = Awaited<
  ReturnType<typeof getTypedAssemblyExports>
>;
type UsePokedexReturnType =
  | { ok: false }
  | { ok: true; value: Pick<PokedexAssemblyExported, "PokedexMaster"> };

const separator = "__POKEDEX_SEPARATOR__";
const pokedexRuntimeDictInitializedSet = new Set<string>();

export const usePokedex = (dictUrl: string): UsePokedexReturnType => {
  const [dictLoaded, setDictLoaded] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const exported = useRef<PokedexAssemblyExported>();

  const dotnetRuntime = useDotnet(POKEDEX_DOTNET_RUNTIME);

  // NOTE: 1st, Add dict to runtime
  useEffect(() => {
    if (!dotnetRuntime.isLoaded) {
      return;
    }
    if (dotnetRuntime.isLoaded && dotnetRuntime.runtime === undefined) {
      // TODO: Error handling
      console.error("Cannot use dotnet runtime");
      return;
    }
    if (
      pokedexRuntimeDictInitializedSet.has(
        POKEDEX_DOTNET_RUNTIME + separator + dictUrl
      )
    ) {
      setDictLoaded(true);
      return;
    }
    const { Module } = dotnetRuntime.runtime;
    fetch(dictUrl)
      .then((v) => v.arrayBuffer())
      .then((v) => {
        Module.FS_createPath("/", "work", true, true);
        if (
          !pokedexRuntimeDictInitializedSet.has(
            POKEDEX_DOTNET_RUNTIME + separator + dictUrl
          )
        ) {
          pokedexRuntimeDictInitializedSet.add(
            POKEDEX_DOTNET_RUNTIME + separator + dictUrl
          );
          Module.FS_createDataFile(
            "/work",
            "pokedex.db",
            new Uint8Array(v),
            true,
            true
          );
        }
      })
      .then(() => setDictLoaded(true));
  }, [dictUrl, dotnetRuntime]);

  // NOTE: 2nd, Load dict in runtime
  useEffect(() => {
    if (!dotnetRuntime.isLoaded) {
      return;
    }
    if (dotnetRuntime.isLoaded && dotnetRuntime.runtime === undefined) {
      // TODO: Error handling
      console.error("Cannot use dotnet runtime");
      return;
    }
    const { setModuleImports, getConfig, getAssemblyExports } =
      dotnetRuntime.runtime;
    setTypedModuleImports(setModuleImports, "main.mjs", {
      sqlite: {
        connection: () => "Data Source=/work/pokedex.db",
      },
    });
    if (dictLoaded) {
      const config = getConfig();
      if (config === undefined) {
        throw new Error();
      }
      (async () => {
        exported.current = await getTypedAssemblyExports(
          getAssemblyExports(config.mainAssemblyName!)
        );
        exported.current.PokedexMaster.Initialize();
        setInitialized(true);
      })();
    }
  }, [dotnetRuntime, dictLoaded]);

  const result: UsePokedexReturnType = useMemo(() => {
    if (!initialized) {
      return {
        ok: false,
      };
    }
    return {
      ok: true,
      value: exported.current!,
    };
  }, [initialized]);

  return result;
};
