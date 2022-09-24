using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Data.Sqlite;
using PokedexNetWebassembly.Shared.Infrastructures;
using PokedexNetWebassembly.Shared.Util;

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

    public static Task<Pokemon[]> FetchPokemons(SqliteHelper dbHelper, string query)
    {
        return dbHelper.AsyncBindConnection(
            async (c) =>
            {
                var command = c.CreateCommand();
                command.CommandText= "select id, name from pokemons where id = @queryMaybeId or name like '%@queryMaybeName%'";
                var maybeId = -1;
                _ = int.TryParse(query, out maybeId);
                command.Parameters.Add(new SqliteParameter { SqliteType = SqliteType.Integer, Value = maybeId, ParameterName = "queryMaybeId" });
                command.Parameters.Add(new SqliteParameter { SqliteType = SqliteType.Text, Value = query, ParameterName = "queryMaybeName" });
                var reader = await command.ExecuteReaderAsync();
                return reader.ToEnumerable().Select(v => {
                    var id = Convert.ToInt32(v["id"]);
                    var name = (string)v["name"];
                    return new Pokemon(id, name);
                }).ToArray();
            },
            Task.FromException<Pokemon[]>(new Exception("Cannot fetch pokemons"))
        );
    }

    #region DO NOT USE ON BROWSER-WASM
    // FIXME: if passed parameters to QueryAsync, Query, and more operations, it will crash
    // ManagedError: Error occurred during a cryptographic operation.
    // FIXME: if passed type argument for mapping return values, it will crash
    // ManagedError: Error occurred during a cryptographic operation.
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
    #endregion
}
