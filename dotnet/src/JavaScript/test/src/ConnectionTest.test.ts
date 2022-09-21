import { type RuntimeAPI } from "@microsoft/dotnet-runtime";
import {
  getTypedAssemblyExports,
  setTypedModuleImports,
} from "dotnet-webassembly-type-helper";
import { v4 as uuid } from "uuid";
import { beforeEach, describe, expect, it as _it, TestAPI } from "vitest";

describe("ConnectionTest", () => {
  interface LocalDotnetRuntimeContext {
    runtimeAPI: RuntimeAPI;
  }

  const it = _it as TestAPI<LocalDotnetRuntimeContext>;

  beforeEach<LocalDotnetRuntimeContext>(async (context) => {
    // NOTE: For ignoring to share state between each test case
    const m = `../node_modules/@microsoft/dotnet-runtime/dotnet.js?${uuid()}`;
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

  it(`return 1`, async (ctx) => {
    const { getAssemblyExports, setModuleImports, getConfig } = ctx.runtimeAPI;

    const config = getConfig();
    const exported = await getTypedAssemblyExports(
      getAssemblyExports(config.mainAssemblyName!)
    );
    setTypedModuleImports(setModuleImports, "main.mjs", {
      sqlite: {
        connection: () => "Data Source=:memory:",
      },
    });

    exported.MyClass.Initialize();
    expect(await exported.MyClass.ConnectionTest()).toBe(1);
  });

  it("return null when without Initialize", async (ctx) => {
    const { getAssemblyExports, setModuleImports, getConfig } = ctx.runtimeAPI;

    const config = getConfig();
    const exported = await getTypedAssemblyExports(
      getAssemblyExports(config.mainAssemblyName!)
    );
    setTypedModuleImports(setModuleImports, "main.mjs", {
      sqlite: {
        connection: () => "Data Source=:memory:",
      },
    });

    expect(await exported.MyClass.ConnectionTest()).toBe(null);
  });
});
