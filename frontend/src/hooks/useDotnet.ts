import { useQuery } from "react-query";

const is_browser = typeof window != "undefined";
if (!is_browser) throw new Error(`Expected to be running in a browser`);

export const useDotnet = (runtimeUrl: string) => {
  // TODO: Support multi runtime
  return useQuery(
    [],
    () =>
      import(runtimeUrl).then((v: typeof import("@microsoft/dotnet-runtime")) =>
        v.dotnet.withDiagnosticTracing(false).create()
      ),
    {}
  );
};
