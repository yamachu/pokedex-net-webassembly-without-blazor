import { type FC } from "react";
import { useFetchPokemons } from "./hooks/useFetchPokemons";

export const App: FC = () => {
  const { data: pokemons } = useFetchPokemons("/resources/pokedex.db");

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
