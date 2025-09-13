using PokedexNetWebassembly.Shared.Infrastructures;
using PokedexNetWebassembly.Shared.Usecases;

namespace PokedexNetWebassembly.Shared.Test;

public class PokedexNetWebassemblySharedTest
{
    [Fact]
    public async Task TestFetchPokemons()
    {
        var dbHelper = new SqliteHelper(() => "Data Source=./fixtures/0-152.db");
        var pokemons = await QueryPokemon.FetchPokemons(dbHelper);
        Assert.Equal(
            new Pokemon[] {
                new Pokemon(0, "ヤマチュウ"),
                new Pokemon(152, "けつばん")
            },
            pokemons
        );
    }

    [Fact]
    public async Task TestFetchPokemonsWithMapping()
    {
        var dbHelper = new SqliteHelper(() => "Data Source=./fixtures/0-152.db");
        var pokemons = await QueryPokemon.FetchPokemons(dbHelper);
        Assert.Equal(
            new Pokemon[] {
                new Pokemon(0, "ヤマチュウ"),
                new Pokemon(152, "けつばん")
            },
            pokemons
        );
    }

    [Fact]
    public async Task FetchPokemon()
    {
        var dbHelper = new SqliteHelper(() => "Data Source=./fixtures/0-152.db");
        var pokemon0 = await QueryPokemon.FetchPokemons(dbHelper, "0");
        Assert.Equal(
            new Pokemon[] {
                new Pokemon(0, "ヤマチュウ")
            },
            pokemon0
        );

        var pokemon00 = await QueryPokemon.FetchPokemons(dbHelper, "けつ");
        Assert.Equal(
            new Pokemon[] {
                new Pokemon(152, "けつばん")
            },
            pokemon00
        );
    }

    [Fact]
    public async Task FetchPokemonWithMapping()
    {
        var dbHelper = new SqliteHelper(() => "Data Source=./fixtures/0-152.db");
        var pokemon0 = await QueryPokemon.FetchPokemonsWithMapping(dbHelper, "0");
        Assert.Equal(
            new Pokemon[] {
                new Pokemon(0, "ヤマチュウ")
            },
            pokemon0
        );

        var pokemon00 = await QueryPokemon.FetchPokemonsWithMapping(dbHelper, "%ヤマチュ%");
        Assert.Equal(
            new Pokemon[] {
                new Pokemon(0, "ヤマチュウ")
            },
            pokemon00
        );
    }

    [Fact]
    public async Task TestTrainerPokedexMigration()
    {
        var tempDbPath = Path.GetTempFileName();
        try
        {
            var dbHelper = new SqliteHelper(() => $"Data Source={tempDbPath}");
            
            // Test migration creates the table
            var result = await dbHelper.AsyncBindConnection(
                async (c) => await TrainerPokedex.Migration(c),
                Task.FromException<int>(new Exception("Migration failed"))
            );
            
            Assert.True(result >= 0); // Should return 0 or positive for successful table creation
            
            // Verify table was created by trying to query it
            var pokemons = await TrainerPokedex.FetchCapturedPokemons(dbHelper);
            Assert.NotNull(pokemons);
            Assert.Empty(pokemons); // Should be empty initially
        }
        finally
        {
            if (File.Exists(tempDbPath))
                File.Delete(tempDbPath);
        }
    }

    [Fact]
    public async Task TestFetchCapturedPokemonsEmpty()
    {
        var tempDbPath = Path.GetTempFileName();
        try
        {
            var dbHelper = new SqliteHelper(() => $"Data Source={tempDbPath}");
            
            // Create table first
            await dbHelper.AsyncBindConnection(
                async (c) => await TrainerPokedex.Migration(c),
                Task.FromException<int>(new Exception("Migration failed"))
            );
            
            var pokemons = await TrainerPokedex.FetchCapturedPokemons(dbHelper);
            Assert.NotNull(pokemons);
            Assert.Empty(pokemons);
        }
        finally
        {
            if (File.Exists(tempDbPath))
                File.Delete(tempDbPath);
        }
    }

    [Fact]
    public async Task TestPutAndFetchCapturedPokemon()
    {
        var tempDbPath = Path.GetTempFileName();
        try
        {
            var dbHelper = new SqliteHelper(() => $"Data Source={tempDbPath}");
            
            // Create table first
            await dbHelper.AsyncBindConnection(
                async (c) => await TrainerPokedex.Migration(c),
                Task.FromException<int>(new Exception("Migration failed"))
            );
            
            // Add a pokemon
            var affectedRows = await TrainerPokedex.PutCapturedPokemon(dbHelper, 25); // Pikachu ID
            Assert.Equal(1, affectedRows); // Should insert 1 row
            
            // Verify it was added
            var pokemons = await TrainerPokedex.FetchCapturedPokemons(dbHelper);
            Assert.Equal(new[] { 25 }, pokemons);
        }
        finally
        {
            if (File.Exists(tempDbPath))
                File.Delete(tempDbPath);
        }
    }

    [Fact]
    public async Task TestPutMultipleCapturedPokemons()
    {
        var tempDbPath = Path.GetTempFileName();
        try
        {
            var dbHelper = new SqliteHelper(() => $"Data Source={tempDbPath}");
            
            // Create table first
            await dbHelper.AsyncBindConnection(
                async (c) => await TrainerPokedex.Migration(c),
                Task.FromException<int>(new Exception("Migration failed"))
            );
            
            // Add multiple pokemons
            await TrainerPokedex.PutCapturedPokemon(dbHelper, 0);  // ヤマチュウ
            await TrainerPokedex.PutCapturedPokemon(dbHelper, 152); // けつばん
            await TrainerPokedex.PutCapturedPokemon(dbHelper, 25); // Pikachu
            
            // Verify all were added and returned in order
            var pokemons = await TrainerPokedex.FetchCapturedPokemons(dbHelper);
            Assert.Equal(3, pokemons.Length);
            Assert.Contains(0, pokemons);
            Assert.Contains(152, pokemons);
            Assert.Contains(25, pokemons);
        }
        finally
        {
            if (File.Exists(tempDbPath))
                File.Delete(tempDbPath);
        }
    }

    [Fact]
    public async Task TestPutDuplicateCapturedPokemon()
    {
        var tempDbPath = Path.GetTempFileName();
        try
        {
            var dbHelper = new SqliteHelper(() => $"Data Source={tempDbPath}");
            
            // Create table first
            await dbHelper.AsyncBindConnection(
                async (c) => await TrainerPokedex.Migration(c),
                Task.FromException<int>(new Exception("Migration failed"))
            );
            
            // Add a pokemon twice
            var firstResult = await TrainerPokedex.PutCapturedPokemon(dbHelper, 25);
            Assert.Equal(1, firstResult); // First insert should affect 1 row
            
            var secondResult = await TrainerPokedex.PutCapturedPokemon(dbHelper, 25);
            Assert.Equal(0, secondResult); // Second insert should affect 0 rows due to "insert or ignore"
            
            // Verify only one instance exists
            var pokemons = await TrainerPokedex.FetchCapturedPokemons(dbHelper);
            Assert.Equal(new[] { 25 }, pokemons);
        }
        finally
        {
            if (File.Exists(tempDbPath))
                File.Delete(tempDbPath);
        }
    }

    [Fact]
    public async Task TestDeleteCapturedPokemon()
    {
        var tempDbPath = Path.GetTempFileName();
        try
        {
            var dbHelper = new SqliteHelper(() => $"Data Source={tempDbPath}");
            
            // Create table and add pokemons
            await dbHelper.AsyncBindConnection(
                async (c) => await TrainerPokedex.Migration(c),
                Task.FromException<int>(new Exception("Migration failed"))
            );
            
            await TrainerPokedex.PutCapturedPokemon(dbHelper, 25);
            await TrainerPokedex.PutCapturedPokemon(dbHelper, 152);
            
            // Delete one pokemon
            var affectedRows = await TrainerPokedex.DeleteCapturedPokemon(dbHelper, 25);
            Assert.Equal(1, affectedRows); // Should delete 1 row
            
            // Verify it was removed
            var pokemons = await TrainerPokedex.FetchCapturedPokemons(dbHelper);
            Assert.Equal(new[] { 152 }, pokemons);
        }
        finally
        {
            if (File.Exists(tempDbPath))
                File.Delete(tempDbPath);
        }
    }

    [Fact]
    public async Task TestDeleteNonExistentCapturedPokemon()
    {
        var tempDbPath = Path.GetTempFileName();
        try
        {
            var dbHelper = new SqliteHelper(() => $"Data Source={tempDbPath}");
            
            // Create table first
            await dbHelper.AsyncBindConnection(
                async (c) => await TrainerPokedex.Migration(c),
                Task.FromException<int>(new Exception("Migration failed"))
            );
            
            // Try to delete a pokemon that doesn't exist
            var affectedRows = await TrainerPokedex.DeleteCapturedPokemon(dbHelper, 999);
            Assert.Equal(0, affectedRows); // Should affect 0 rows
            
            // Verify database is still empty
            var pokemons = await TrainerPokedex.FetchCapturedPokemons(dbHelper);
            Assert.Empty(pokemons);
        }
        finally
        {
            if (File.Exists(tempDbPath))
                File.Delete(tempDbPath);
        }
    }

    [Fact]
    public async Task TestTrainerPokedexWorkflow()
    {
        var tempDbPath = Path.GetTempFileName();
        try
        {
            var dbHelper = new SqliteHelper(() => $"Data Source={tempDbPath}");
            
            // Create table
            await dbHelper.AsyncBindConnection(
                async (c) => await TrainerPokedex.Migration(c),
                Task.FromException<int>(new Exception("Migration failed"))
            );
            
            // Start with empty database
            var initialPokemons = await TrainerPokedex.FetchCapturedPokemons(dbHelper);
            Assert.Empty(initialPokemons);
            
            // Capture some pokemons
            await TrainerPokedex.PutCapturedPokemon(dbHelper, 0);   // ヤマチュウ
            await TrainerPokedex.PutCapturedPokemon(dbHelper, 152); // けつばん
            await TrainerPokedex.PutCapturedPokemon(dbHelper, 25);  // Pikachu
            
            // Verify captured pokemons
            var capturedPokemons = await TrainerPokedex.FetchCapturedPokemons(dbHelper);
            Assert.Equal(3, capturedPokemons.Length);
            
            // Release one pokemon
            await TrainerPokedex.DeleteCapturedPokemon(dbHelper, 152);
            
            // Verify pokemon was released
            var remainingPokemons = await TrainerPokedex.FetchCapturedPokemons(dbHelper);
            Assert.Equal(2, remainingPokemons.Length);
            Assert.Contains(0, remainingPokemons);
            Assert.Contains(25, remainingPokemons);
            Assert.DoesNotContain(152, remainingPokemons);
        }
        finally
        {
            if (File.Exists(tempDbPath))
                File.Delete(tempDbPath);
        }
    }
}