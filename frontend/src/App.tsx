import { type FC } from "react";
import { POKEDEX_DICT_PATH } from "../env";
import { useFetchPokemons } from "./hooks/useFetchPokemons";

export const App: FC = () => {
  const { data: pokemons } = useFetchPokemons(POKEDEX_DICT_PATH);

  return (
    <div>
      <p>.NET JavaScript interop on WebAssembly Demo</p>
      <p>Listing Kanto Pokemons!</p>
      <ul>
        {pokemons?.map((v) => (
          <li style={{ listStyleType: "none" }} key={v.id}>
            {("000" + v.id).slice(-3)}: {v.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
