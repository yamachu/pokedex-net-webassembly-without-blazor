import { useQuery } from "@tanstack/react-query";
import type { Pokemon, Pokemons } from "../types/DotnetTypes.Pokemon";
import { usePokedex } from "./usePokedex";

export const useFetchPokemonsWithQuery = (dictUrl: string, query: string) => {
  const pokedexClient = usePokedex(dictUrl);
  return useQuery<Pokemon[]>(
    ["pokemons", pokedexClient, query],
    ({ queryKey }) => {
      const client = queryKey[1] as ReturnType<typeof usePokedex>;
      const _query = queryKey[2];
      if (!client.ok) {
        return Promise.resolve([]);
      }
      return client.value.MyClass.FetchPokemonsWithQuery(_query)
        .then((v: string) => JSON.parse(v))
        .then((v: Pokemons) => v.pokemons);
    },
    {
      enabled: query.trim() !== "",
    }
  );
};
