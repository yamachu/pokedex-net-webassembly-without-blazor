import { renderHook, waitFor } from "@testing-library/react";
import assert from "assert";
import { beforeEach, describe, expect, it as _it, TestAPI } from "vitest";
import { useDotnet } from "../../src/hooks/useDotnet";
import { generateRuntimeUrl } from "../utils";

describe("useDotnet", () => {
  interface LocalDotnetRuntimeContext {
    runtimeUrl: string;
  }

  const it = _it as TestAPI<LocalDotnetRuntimeContext>;

  beforeEach<LocalDotnetRuntimeContext>(async (context) => {
    // NOTE: For ignoring to share state between each test case
    context.runtimeUrl = generateRuntimeUrl();
  });

  it(`can load DotnetRuntime`, async (ctx) => {
    const { result } = renderHook(() => useDotnet(ctx.runtimeUrl));

    expect(result.current.isLoaded).toBe(false);

    // dynamic import...
    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true);
    });
    assert(result.current.isLoaded);

    expect(result.current.error).toBeUndefined();
    assert(result.current.error === undefined);

    expect(result.current.runtime).toBeDefined();
  });
});
