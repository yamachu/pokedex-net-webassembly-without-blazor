import { Suspense, type FC } from "react";
import { POKEDEX_DICT_PATH } from "../../env";
import { useFetchPokemons } from "../hooks/useFetchPokemons";

export const Basic: FC = () => {
  return (
    <div>
      <h2>Basic demo</h2>
      <p>This demonstration does the following</p>
      <ol>
        <li>Run .NET WebAssembly runtime</li>
        <li>Fetch sqlite db file (pokedex.db)</li>
        <li>
          Mount db file to Virtual File System on .NET WebAssembly runtime
        </li>
        <li>Fetch db data from .NET Program by using JavaScript API</li>
      </ol>
      <p>Listing Kanto Pokemons!</p>
      <Suspense fallback={<p>Now loading</p>}>
        <PokemonList />
      </Suspense>
    </div>
  );
};

const PokemonList: FC = () => {
  const { data: pokemons } = useFetchPokemons(POKEDEX_DICT_PATH);

  return (
    <ul>
      {pokemons?.map((v) => (
        <li style={{ listStyleType: "none" }} key={v.id}>
          {("000" + v.id).slice(-3)}: {v.name}
        </li>
      ))}
    </ul>
  );
};
