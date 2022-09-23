import { renderHook, waitFor } from "@testing-library/react";
import assert from "assert";
import { sep } from "path";
import { beforeEach, describe, expect, it as _it, TestAPI } from "vitest";
import { usePokedex } from "../../src/hooks/usePokedex";
import { FixtureDir } from "../Contract";

describe("usePokedex", () => {
  interface LocalDotnetRuntimeContext {}

  const it = _it as TestAPI<LocalDotnetRuntimeContext>;

  beforeEach<LocalDotnetRuntimeContext>(async () => {});

  it(`can fetchPokemons`, async () => {
    const { result } = renderHook(() =>
      // NOTE: join remove `file://`
      usePokedex(FixtureDir + sep + "0-152.db")
    );

    expect(result.current.ok).toBe(false);

    // dynamic import...
    await waitFor(() => {
      expect(result.current.ok).toBe(true);
    });
    assert(result.current.ok);

    expect(result.current.value).toBeDefined();

    const fetchedPokemons: string =
      await result.current.value.MyClass.FetchPokemons();

    expect(fetchedPokemons).toBeTypeOf("string");
  });
});
