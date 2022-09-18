import { useEffect, useMemo, useRef, useState } from "react";
import { POKEDEX_DOTNET_RUNTIME } from "../../env";
import { useDotnet } from "./useDotnet";

type PokedexAssemblyExported = any;
type UsePokedexReturnType =
  | { ok: false }
  | { ok: true; value: PokedexAssemblyExported };

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
    const { Module } = dotnetRuntime.runtime;
    fetch(dictUrl)
      .then((v) => v.arrayBuffer())
      .then((v) => {
        Module.FS_createPath("/", "work", true, true);
        Module.FS_createDataFile(
          "/work",
          "pokedex.db",
          new Uint8Array(v),
          true,
          true
        );
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
    setModuleImports("main.mjs", {
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
        exported.current = await getAssemblyExports(config.mainAssemblyName!);
        exported.current.MyClass.Initialize();
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
      value: exported.current,
    };
  }, [initialized]);

  return result;
};
