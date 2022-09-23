import { QueryClient } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { assert } from "console";
import { sep } from "path";
import { beforeEach, describe, expect, it as _it, TestAPI } from "vitest";
import { useFetchPokemons } from "../../src/hooks/useFetchPokemons";
import { FixtureDir } from "../Contract";
import { ReactQueryClientProviderWrapper } from "./wrapper";

describe("useFetchPokemon", async () => {
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

    const { result } = renderHook(
      () =>
        // NOTE: join remove `file://`
        useFetchPokemons(FixtureDir + sep + "0-152.db"),
      {
        wrapper,
      }
    );

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toStrictEqual([]);

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
        id: 0,
        name: "ヤマチュウ",
      },
      {
        id: 152,
        name: "けつばん",
      },
    ]);
  });
});
