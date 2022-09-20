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
}