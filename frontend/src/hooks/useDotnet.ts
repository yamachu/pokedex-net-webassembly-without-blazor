import { type RuntimeAPI } from "@microsoft/dotnet-runtime";
import { useEffect, useState } from "react";

const is_browser = typeof window != "undefined";
if (!is_browser) throw new Error(`Expected to be running in a browser`);

const dotnetRuntimeMap = new Map<
  string,
  | { isLoaded: false }
  | { isLoaded: true; runtime: RuntimeAPI; error: undefined }
  | { isLoaded: true; runtime: undefined; error: Error }
>();

export const useDotnet = (runtimeUrl: string) => {
  const [, forceUpdate] = useState({});

  // TODO: Support multi runtime
  useEffect(() => {
    const mapKey = runtimeUrl;
    const prev = dotnetRuntimeMap.get(mapKey);
    if (prev !== undefined) {
      return;
    }

    dotnetRuntimeMap.set(mapKey, { isLoaded: false });
    forceUpdate({});

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
        forceUpdate({});
      })
      .catch((e) => {
        dotnetRuntimeMap.set(mapKey, {
          isLoaded: true,
          error: e,
          runtime: undefined,
        });
        forceUpdate({});
      });
  }, [runtimeUrl]);

  return dotnetRuntimeMap.get(runtimeUrl) ?? { isLoaded: false };
};
