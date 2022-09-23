import { join } from "path";
import { v4 as uuid } from "uuid";
import { DotnetRuntimeRealDir } from "./Contract";

export const generateRuntimeUrl = () =>
  join(DotnetRuntimeRealDir, "dotnet.js") + `?${uuid()}`;
