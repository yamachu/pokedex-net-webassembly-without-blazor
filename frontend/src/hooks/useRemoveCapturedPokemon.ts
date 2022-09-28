import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTrainerPokedex } from "./useTrainerPokedex";

export const useRemoveCapturedPokemon = () => {
  const trainerPokedexClient = useTrainerPokedex();
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, { capturedId: number }>(
    ({ capturedId }) => {
      if (!trainerPokedexClient.ok) {
        throw new Error("Pokedex client is not ready");
      }
      return trainerPokedexClient.value.TrainerPokedex.RemoveCapturedPokemon(
        capturedId
      );
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(["captured_pokemons"]);
      },
    }
  );
};
