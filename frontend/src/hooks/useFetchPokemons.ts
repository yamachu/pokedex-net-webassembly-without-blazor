import { useQuery } from "@tanstack/react-query";
import { usePokedex } from "./usePokedex";

type Pokemon = { id: number; name: string };
type Pokemons = { pokemons: Pokemon[] };

export const useFetchPokemons = (dictUrl: string) => {
  const pokedexClient = usePokedex(dictUrl);
  return useQuery<Pokemon[]>(["pokemons", pokedexClient], ({ queryKey }) => {
    const client = queryKey[1] as ReturnType<typeof usePokedex>;
    if (!client.ok) {
      return Promise.resolve([]);
    }
    return client.value.MyClass.FetchPokemons()
      .then((v: string) => JSON.parse(v))
      .then((v: Pokemons) => v.pokemons);
  });
};
