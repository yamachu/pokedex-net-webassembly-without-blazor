import { type RuntimeAPI } from "@microsoft/dotnet-runtime";
import { useEffect, useSyncExternalStore } from "react";
import { EventEmitMap } from "../utils/EventEmitMap";

const is_browser = typeof window != "undefined";
if (!is_browser) throw new Error(`Expected to be running in a browser`);

const dotnetRuntimeMap = new EventEmitMap<
  string,
  | { isLoaded: false }
  | { isLoaded: true; runtime: RuntimeAPI; error: undefined }
  | { isLoaded: true; runtime: undefined; error: Error }
>();

const subscribe = (onStoreChange: () => void) => {
  dotnetRuntimeMap.addEventListener("set", onStoreChange);
  dotnetRuntimeMap.addEventListener("delete", onStoreChange);
  return () => {
    dotnetRuntimeMap.removeEventListener("set", onStoreChange);
    dotnetRuntimeMap.removeEventListener("delete", onStoreChange);
  };
};

export const useDotnet = (runtimeUrl: string) => {
  const runtime = useSyncExternalStore(subscribe, () =>
    dotnetRuntimeMap.get(runtimeUrl)
  );

  // TODO: Support multi runtime
  useEffect(() => {
    const mapKey = runtimeUrl;
    const prev = dotnetRuntimeMap.get(mapKey);
    if (prev !== undefined) {
      return;
    }

    dotnetRuntimeMap.set(mapKey, { isLoaded: false });

    import(runtimeUrl)
      .then((v: typeof import("@microsoft/dotnet-runtime")) =>
        v.dotnet.withDiagnosticTracing(false).create()
      )
      .then((v) => {
        dotnetRuntimeMap.set(mapKey, {
          isLoaded: true,
          runtime: v,
          error: undefined,
        });
      })
      .catch((e) => {
        dotnetRuntimeMap.set(mapKey, {
          isLoaded: true,
          error: e,
          runtime: undefined,
        });
      });
  }, [runtimeUrl]);

  return runtime ?? { isLoaded: false };
};
