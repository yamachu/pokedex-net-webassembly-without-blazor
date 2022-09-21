import { type RuntimeAPI } from "@microsoft/dotnet-runtime";
import {
  getTypedAssemblyExports,
  setTypedModuleImports,
} from "dotnet-webassembly-type-helper";
import { readFile } from "fs/promises";
import { join } from "path";
import { v4 as uuid } from "uuid";
import { beforeEach, describe, expect, it as _it, TestAPI } from "vitest";
import { DotnetRuntimeRealDir, FixtureDir } from "./Contract.js";

describe("ConnectionTest", () => {
  interface LocalDotnetRuntimeContext {
    runtimeAPI: RuntimeAPI;
  }

  const it = _it as TestAPI<LocalDotnetRuntimeContext>;

  beforeEach<LocalDotnetRuntimeContext>(async (context) => {
    // NOTE: For ignoring to share state between each test case
    const m = join(DotnetRuntimeRealDir, "dotnet.js") + `?${uuid()}`;
    const { dotnet, exit } = await import(m).then(
      (v: typeof import("@microsoft/dotnet-runtime")) => v
    );
    const runtimeAPI = await dotnet.create();

    context.runtimeAPI = runtimeAPI;

    return () => {
      exit(0);
      context.runtimeAPI = null as any as RuntimeAPI;
    };
  });

  it(`return id 0 and 152 pokemons as string`, async (ctx) => {
    const { getAssemblyExports, setModuleImports, getConfig, Module } =
      ctx.runtimeAPI;

    const config = getConfig();
    const exported = await getTypedAssemblyExports(
      getAssemblyExports(config.mainAssemblyName!)
    );
    setTypedModuleImports(setModuleImports, "main.mjs", {
      sqlite: {
        connection: () => "Data Source=/work/pokedex.db",
      },
    });

    Module.FS_createPath("/", "work", true, true);
    const dbFixture = await readFile(join(FixtureDir, "0-152.db"));
    Module.FS_createDataFile(
      "/work",
      "pokedex.db",
      dbFixture,
      true,
      true,
      true
    );

    exported.MyClass.Initialize();
    expect(
      await exported.MyClass.FetchPokemons().then((v: string) => JSON.parse(v))
    ).toStrictEqual({
      pokemons: [
        {
          id: 0,
          name: "ヤマチュウ",
        },
        { id: 152, name: "けつばん" },
      ],
    });
  });
});
