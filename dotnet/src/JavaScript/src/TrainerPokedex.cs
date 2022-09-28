using System;
using System.Linq;
using System.Runtime.InteropServices.JavaScript;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using PokedexNetWebassembly.Shared.Infrastructures;

public partial class TrainerPokedex
{
    private static SqliteHelper? dbHelper;

    internal record FetchPokemonsReturnJsonType(int[] CapturedPokemonIds);

    [JsonSourceGenerationOptions(PropertyNamingPolicy = JsonKnownNamingPolicy.CamelCase)]
    [JsonSerializable(typeof(FetchPokemonsReturnJsonType))]
    internal partial class CapturedPokemonsJsonSerializerContext : JsonSerializerContext { }

    [JSExport]
    [return: JSMarshalAs<JSType.Promise<JSType.String>>]
    internal async static Task<string> FetchCapturedPokemons()
    {
        if (dbHelper == null)
        {
            return await Task.FromException<string>(new Exception("Must Initialize"));
        }
        var result = await PokedexNetWebassembly.Shared.Usecases.TrainerPokedex.FetchCapturedPokemons(dbHelper);

        return JsonSerializer.Serialize(new FetchPokemonsReturnJsonType(result), typeof(FetchPokemonsReturnJsonType), CapturedPokemonsJsonSerializerContext.Default);
    }

    [JSExport]
    internal async static Task<bool> IsCapturedPokemon(int capturedId)
    {
        if (dbHelper == null)
        {
            return await Task.FromException<bool>(new Exception("Must Initialize"));
        }
        var result = await PokedexNetWebassembly.Shared.Usecases.TrainerPokedex.FetchCapturedPokemons(dbHelper);

        return result.Count(v => v == capturedId) > 0;
    }

    [JSExport]
    internal async static Task<int> AddCapturedPokemon(int capturedId)
    {
        if (dbHelper == null)
        {
            return await Task.FromException<int>(new Exception("Must Initialize"));
        }
        var result = await PokedexNetWebassembly.Shared.Usecases.TrainerPokedex.PutCapturedPokemon(dbHelper, capturedId);
        await SyncFS();

        return result;
    }

    [JSExport]
    internal async static Task<int> RemoveCapturedPokemon(int capturedId)
    {
        if (dbHelper == null)
        {
            return await Task.FromException<int>(new Exception("Must Initialize"));
        }
        var result = await PokedexNetWebassembly.Shared.Usecases.TrainerPokedex.DeleteCapturedPokemon(dbHelper, capturedId);
        await SyncFS();

        return result;
    }

    [JSImport("sqlite.connection", "user.mjs")]
    internal static partial string GetSqliteConnectionString();

    [JSImport("filesystem.operation.sync", "user.mjs")]
    internal static partial Task SyncFS();

    [JSExport]
    private static async Task Initialize()
    {
        if (dbHelper == null)
        {
            dbHelper = new SqliteHelper(GetSqliteConnectionString);
            await dbHelper.AsyncBindConnection(
                (c) => PokedexNetWebassembly.Shared.Usecases.TrainerPokedex.Migration(c),
                Task.FromException<int>(new Exception("Failed to migration"))
            );
        }
    }
}