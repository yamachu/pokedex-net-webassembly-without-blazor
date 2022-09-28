import { useQuery } from "@tanstack/react-query";
import { useTrainerPokedex } from "./useTrainerPokedex";

export const useFetchCapturedPokemons = () => {
  const trainerPokedexClient = useTrainerPokedex();
  return useQuery<number[]>(
    ["captured_pokemons", trainerPokedexClient],
    ({ queryKey }) => {
      const client = queryKey[1] as ReturnType<typeof useTrainerPokedex>;
      if (!client.ok) {
        return Promise.resolve([]);
      }
      return client.value.TrainerPokedex.FetchCapturedPokemons()
        .then((v: string) => JSON.parse(v))
        .then((v: { capturedPokemonIds: number[] }) => v.capturedPokemonIds);
    }
  );
};
