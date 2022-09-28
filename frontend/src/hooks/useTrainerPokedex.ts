import {
  getTypedAssemblyExports,
  setTypedModuleImports,
} from "dotnet-webassembly-type-helper";
import { useEffect, useMemo, useRef, useState } from "react";
import { POKEDEX_DOTNET_RUNTIME } from "../../env";
import type { FileSystemType, FS } from "../types/emscripten";
import { useDotnet } from "./useDotnet";

type PokedexAssemblyExported = Awaited<
  ReturnType<typeof getTypedAssemblyExports>
>;
type UsePokedexReturnType =
  | { ok: false }
  | { ok: true; value: Pick<PokedexAssemblyExported, "TrainerPokedex"> };

const pokedexRuntimeDictInitializedSet = new Set<string>();

const usePermanentFileSystemIfRuntimeSupported = (
  fileSystems: FS["filesystems"]
): FileSystemType => {
  if (fileSystems.IDBFS !== undefined) {
    return fileSystems.IDBFS;
  }
  console.warn(`cannot use PermanentFileSystems like IDBFS, fallback MEMFS`);
  return fileSystems.MEMFS;
};

export const useTrainerPokedex = (): UsePokedexReturnType => {
  const [initialized, setInitialized] = useState(false);

  const exported = useRef<Pick<PokedexAssemblyExported, "TrainerPokedex">>();

  const dotnetRuntime = useDotnet(POKEDEX_DOTNET_RUNTIME);

  useEffect(() => {
    if (!dotnetRuntime.isLoaded) {
      return;
    }
    if (dotnetRuntime.isLoaded && dotnetRuntime.runtime === undefined) {
      // TODO: Error handling
      console.error("Cannot use dotnet runtime");
      return;
    }

    const { setModuleImports, getConfig, getAssemblyExports, Module } =
      dotnetRuntime.runtime;

    const _FS: FS = (Module as any).FS;

    try {
      // FIXME: 2回以上走るとCrashする
      Module.FS_createPath("/", "data", true, true);
      _FS.mount(
        usePermanentFileSystemIfRuntimeSupported(_FS.filesystems),
        {},
        "/data"
      );
    } catch (e) {
      console.error(e);
    }

    new Promise((resolve, reject) =>
      // FIXME: 同時に実行するのを一つに制限したい
      _FS.syncfs(true, (err) => {
        if (err !== null) {
          console.error(err);
          reject(err);
        } else {
          pokedexRuntimeDictInitializedSet.add(POKEDEX_DOTNET_RUNTIME);
          resolve({});
        }
      })
    )
      .then(() => {
        setTypedModuleImports(setModuleImports, "user.mjs", {
          sqlite: {
            connection: () => "Data Source=/data/trainer.db",
          },
          filesystem: {
            operation: {
              sync: () =>
                new Promise((resolve, reject) =>
                  _FS.syncfs(false, (err) => {
                    if (err !== null) {
                      console.error(err);
                      reject(err);
                    } else {
                      resolve({});
                    }
                  })
                ),
            },
          },
        });
      })
      .then(async () => {
        const config = getConfig();
        if (config === undefined) {
          throw new Error();
        }

        exported.current = await getTypedAssemblyExports(
          getAssemblyExports(config.mainAssemblyName!)
        );
        await exported.current.TrainerPokedex.Initialize();
        setInitialized(true);
      });
  }, [dotnetRuntime]);

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
