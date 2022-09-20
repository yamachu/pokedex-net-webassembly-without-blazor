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

    public static Task<Pokemon[]> FetchPokemonsWithMapping(SqliteHelper dbHelper)
    {
        return dbHelper.AsyncBindConnection(
            async (c) =>
            {
                var result = await c.QueryAsync<Pokemon>("select id, name from pokemons");
                return result.ToArray();
            },
            Task.FromException<Pokemon[]>(new Exception("Cannot fetch pokemons"))
        );
    }

    public static Task<Pokemon[]> FetchPokemonsWithMapping(SqliteHelper dbHelper, string query)
    {
        return dbHelper.AsyncBindConnection(
            async (c) =>
            {
                var result = await c.QueryAsync<Pokemon>("select id, name from pokemons where id = @query or name like @query", new { query });
                return result.ToArray();
            },
            Task.FromException<Pokemon[]>(new Exception("Cannot fetch pokemons"))
        );
    }
}
