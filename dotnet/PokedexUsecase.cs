using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using PokedexNetWebassembly.Infrastructures;

namespace PokedexNetWebassembly.Usecases;

public class QueryPokemon
{
    internal static Task<Pokemon[]> FetchPokemons(SqliteHelper dbHelper)
    {
        return dbHelper.AsyncBindConnection(
            async (c) =>
            {
                // FIXME: if passed parameters to QueryAsync, Query, and more operations, it will crash
                // ManagedError: Error occurred during a cryptographic operation.
                // FIXME: if passed type argument for mapping return values, it will crash
                // ManagedError: Error occurred during a cryptographic operation.
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
