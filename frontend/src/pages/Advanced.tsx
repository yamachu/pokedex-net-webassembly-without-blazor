import { Suspense, useState, type FC } from "react";
import { POKEDEX_DICT_PATH } from "../../env";
import { useFetchPokemonsWithQuery } from "../hooks/useFetchPokemonsWithQuery";

export const Advanced: FC = () => {
  const [query, setQuery] = useState("");
  return (
    <div>
      <h2>Advanced demo</h2>
      <p>This demonstration does the following</p>
      <ol>
        <li>Pass Query</li>
      </ol>
      <p>Listing Kanto Pokemons!</p>
      <input
        value={query}
        type="search"
        placeholder="Search pokemons..."
        onChange={(e) => setQuery(e.currentTarget.value)}
      />
      <p
        style={{
          marginTop: "4px",
          fontSize: "small",
        }}
      >
        Query Example: 25, ピカ
      </p>
      <Suspense fallback={<p>Now loading</p>}>
        <PokemonList query={query} />
      </Suspense>
    </div>
  );
};

const PokemonList: FC<{ query: string }> = ({ query }) => {
  const { data: pokemons } = useFetchPokemonsWithQuery(
    POKEDEX_DICT_PATH,
    query
  );

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
