using System;
using System.Runtime.InteropServices.JavaScript;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Dapper;
using PokedexNetWebassembly.Shared;
using PokedexNetWebassembly.Shared.Infrastructures;
using PokedexNetWebassembly.Shared.Usecases;

public partial class PokedexMaster
{
    private static SqliteHelper? dbHelper;

    internal record FetchPokemonsReturnJsonType(Pokemon[] Pokemons);

    [JsonSourceGenerationOptions(PropertyNamingPolicy = JsonKnownNamingPolicy.CamelCase)]
    [JsonSerializable(typeof(FetchPokemonsReturnJsonType))]
    internal partial class PokemonsJsonSerializerContext : JsonSerializerContext { }

    [JSExport]
    [return: JSMarshalAs<JSType.Promise<JSType.String>>]
    internal async static Task<string> FetchPokemons()
    {
        if (dbHelper == null)
        {
            return await Task.FromException<string>(new Exception("Must Initialize"));
        }
        var result = await QueryPokemon.FetchPokemonsWithMapping(dbHelper);

        return JsonSerializer.Serialize(new FetchPokemonsReturnJsonType(result), typeof(FetchPokemonsReturnJsonType), PokemonsJsonSerializerContext.Default);
    }

    [JSExport]
    [return: JSMarshalAs<JSType.Promise<JSType.String>>]
    internal async static Task<string> FetchPokemonsWithQuery(string query)
    {
        if (dbHelper == null)
        {
            return await Task.FromException<string>(new Exception("Must Initialize"));
        }
        var result = await QueryPokemon.FetchPokemonsWithMapping(dbHelper, query);

        return JsonSerializer.Serialize(new FetchPokemonsReturnJsonType(result), typeof(FetchPokemonsReturnJsonType), PokemonsJsonSerializerContext.Default);
    }

    [JSExport]
    internal static Task<int> ConnectionTest()
    {
        return dbHelper?.AsyncBindConnection(
            (c) =>
            {
                return c.QueryFirstAsync<int>("select 1");
            },
            Task.FromException<int>(new Exception("Cannot open connection sqlite"))
        );
    }

    [JSExport]
    internal static Task<int /* affected row */> ExecuteQuery(string query)
    {
        return dbHelper?.AsyncBindConnection(
            (c) =>
            {
                return c.ExecuteAsync(query);
            },
            Task.FromException<int>(new Exception("Failed to execute query"))
        );
    }

    [JSImport("sqlite.connection", "main.mjs")]
    internal static partial string GetSqliteConnectionString();

    [JSExport]
    private static void Initialize()
    {
        if (dbHelper == null)
        {
            dbHelper = new SqliteHelper(GetSqliteConnectionString);
        }
    }
}