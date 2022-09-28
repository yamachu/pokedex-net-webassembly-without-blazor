using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Data.Sqlite;
using PokedexNetWebassembly.Shared.Infrastructures;

namespace PokedexNetWebassembly.Shared.Usecases;

public class TrainerPokedex
{
    public static async Task<int> Migration(SqliteConnection c)
    {
        // TODO: move to trainer_db_migration.sql
        var result = await c.ExecuteAsync("CREATE TABLE IF NOT EXISTS captured_pokemons (id integer unique);");
        return result;
    }

    public static Task<int[]> FetchCapturedPokemons(SqliteHelper dbHelper)
    {
        return dbHelper.AsyncBindConnection(
            async (c) =>
            {
                var result = await c.QueryAsync<int>("select id from captured_pokemons");
                return result.ToArray();
            },
            Task.FromException<int[]>(new Exception("Cannot fetch captured pokemons"))
        );
    }

    public static Task<int /* affected rows */> PutCapturedPokemon(SqliteHelper dbHelper, int id)
    {
        return dbHelper.AsyncBindConnection(
            async (c) =>
            {
                using var command = c.CreateCommand();
                command.CommandText = "insert or ignore into captured_pokemons (id) values (@ID)";
                command.Parameters.Add(new SqliteParameter { SqliteType = SqliteType.Integer, Value = id, ParameterName = "@ID" });
                var result = await command.ExecuteNonQueryAsync();
                return result;
            },
            Task.FromException<int>(new Exception("Cannot put captured pokemons"))
        );
    }

    public static Task<int /* affected rows */> DeleteCapturedPokemon(SqliteHelper dbHelper, int id)
    {
        return dbHelper.AsyncBindConnection(
            async (c) =>
            {
                using var command = c.CreateCommand();
                command.CommandText = "delete from captured_pokemons where id = @ID";
                command.Parameters.Add(new SqliteParameter { SqliteType = SqliteType.Integer, Value = id, ParameterName = "@ID" });
                var result = await command.ExecuteNonQueryAsync();
                return result;
            },
            Task.FromException<int>(new Exception("Cannot delete captured pokemons"))
        );
    }
}
