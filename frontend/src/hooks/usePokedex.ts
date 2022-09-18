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

  const { data } = useDotnet(POKEDEX_DOTNET_RUNTIME);

  // NOTE: 1st, Add dict to runtime
  useEffect(() => {
    fetch(dictUrl)
      .then((v) => v.arrayBuffer())
      .then((v) => {
        data?.Module.FS_createPath("/", "work", true, true);
        data?.Module.FS_createDataFile(
          "/work",
          "pokedex.db",
          new Uint8Array(v),
          true,
          true
        );
      })
      .then(() => setDictLoaded(true));
  }, [dictUrl, data]);

  // NOTE: 2nd, Load dict in runtime
  useEffect(() => {
    data?.setModuleImports("main.mjs", {
      sqlite: {
        connection: () => "Data Source=/work/pokedex.db",
      },
    });
    if (dictLoaded) {
      const config = data?.getConfig();
      if (config === undefined) {
        throw new Error();
      }
      (async () => {
        exported.current = await data?.getAssemblyExports(
          config.mainAssemblyName!
        );
        exported.current.MyClass.Initialize();
        setInitialized(true);
      })();
    }
  }, [data, dictLoaded]);

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
