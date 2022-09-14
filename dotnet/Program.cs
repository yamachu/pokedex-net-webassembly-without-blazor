using System;
using System.Runtime.InteropServices.JavaScript;
using System.Text.Json;
using System.Threading.Tasks;
using Dapper;
using PokedexNetWebassembly.Infrastructures;
using PokedexNetWebassembly.Usecases;

Console.WriteLine("Hello, Console!");

return 0;

public partial class MyClass
{
    private static SqliteHelper? dbHelper;

    [JSExport]
    [return: JSMarshalAs<JSType.Promise<JSType.String>>]
    internal async static Task<string> FetchPokemons()
    {
        if (dbHelper == null)
        {
            return await Task.FromException<string>(new Exception("Must Initialize"));
        }
        var result = await QueryPokemon.FetchPokemons(dbHelper);
        return JsonSerializer.Serialize(new { pokemons = result }, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        });
    }

    [JSExport]
    internal static Task<int> ConnectionTest()
    {
        return dbHelper?.AsyncBindConnection(
            (c) => {
                return c.QueryFirstAsync<int>("select 1");
            },
            Task.FromException<int>(new Exception("Cannot open connection sqlite"))
        );
    }

    [JSExport]
    internal static Task<int /* affected row */> ExecuteQuery(string query)
    {
        return dbHelper?.AsyncBindConnection(
            (c) => {
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
