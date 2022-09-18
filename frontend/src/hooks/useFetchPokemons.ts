import { useQuery } from "react-query";
import { usePokedex } from "./usePokedex";

type Pokemon = { id: number; name: string };
type Pokemons = { pokemons: Pokemon[] };

export const useFetchPokemons = (dictUrl: string) => {
  const pokedexClient = usePokedex(dictUrl);
  return useQuery<Pokemon[]>(["client", pokedexClient], () => {
    if (!pokedexClient.ok) {
      return [];
    }
    return pokedexClient.value.MyClass.FetchPokemons()
      .then((v: string) => JSON.parse(v))
      .then((v: Pokemons) => v.pokemons);
  });
};
