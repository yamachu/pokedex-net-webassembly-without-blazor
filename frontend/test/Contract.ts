import { join } from "path";

export const DotnetRuntimeRealDir = join(
  "node_modules",
  "@microsoft",
  "dotnet-runtime"
);
export const FixtureDir = "file://" + join("..", "fixtures");
