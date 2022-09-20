using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using PokedexNetWebassembly.Shared.Infrastructures;

namespace PokedexNetWebassembly.Shared.Usecases;

public class QueryPokemon
{
    public static Task<Pokemon[]> FetchPokemons(SqliteHelper dbHelper)
    {
        return dbHelper.AsyncBindConnection(
            async (c) =>
            {
                var result = await c.QueryAsync("select id, name from pokemons");
                var mapped = result.OfType<IDictionary<string, object>>().Select(v =>
                {
                    return new Pokemon(
                        Convert.ToInt32(v["id"]),
                        Convert.ToString(v["name"])
                    );
                });

                return mapped.ToArray();
            },
            Task.FromException<Pokemon[]>(new Exception("Cannot fetch pokemons"))
        );
    }
}
