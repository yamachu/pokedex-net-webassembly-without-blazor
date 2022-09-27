import { QueryClient } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { assert } from "console";
import { join } from "path";
import { beforeEach, describe, expect, it as _it, TestAPI } from "vitest";
import { useFetchPokemonsWithQuery } from "../../src/hooks/useFetchPokemonsWithQuery";
import { FixtureDir } from "../Contract";
import { ReactQueryClientProviderWrapper } from "./wrapper";

describe("useFetchPokemonWithQuery", async () => {
  interface LocalDotnetRuntimeContext {}

  const it = _it as TestAPI<LocalDotnetRuntimeContext>;

  beforeEach<LocalDotnetRuntimeContext>(async () => {});

  it(`can fetch pokemons`, async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          suspense: true,
        },
      },
    });
    const wrapper = ReactQueryClientProviderWrapper(queryClient);

    const { result, rerender } = renderHook(
      ({ query }) =>
        useFetchPokemonsWithQuery(join(FixtureDir, "0-152.db"), query),
      {
        wrapper,
        initialProps: { query: "" },
      }
    );

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toBeUndefined();

    rerender({ query: "けつ" });

    await waitFor(
      () => {
        const fetchedDataLength = result.current.data?.length ?? 0;
        expect(fetchedDataLength > 0).toBe(true);
      },
      { timeout: 5000 }
    );
    assert(result.current.data !== undefined);
    expect(result.current.data).toStrictEqual([
      {
        id: 152,
        name: "けつばん",
      },
    ]);
  });
});
