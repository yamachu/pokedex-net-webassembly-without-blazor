using System;
using System.Threading.Tasks;
using Microsoft.Data.Sqlite;

namespace PokedexNetWebassembly.Infrastructures;

public class SqliteHelper
{
    private SqliteConnection connection;
    private Func<string> GetSqliteConnectionString { get; init; }

    public SqliteHelper(Func<string> getSqliteConnectionString)
    {
        GetSqliteConnectionString = getSqliteConnectionString;
    }

    internal async Task<T> AsyncBindConnection<T>(Func<SqliteConnection, T> fn, Task<T> onFailConnection)
    {
        if (!await OpenSqlite())
        {
            return await onFailConnection;
        }
        var result = fn(connection);
        await connection.CloseAsync();
        return result;
    }

    private async Task<bool> OpenSqlite()
    {
        if (!Initialize())
        {
            return false;
        }
        if (connection.State != System.Data.ConnectionState.Open)
        {
            await connection.OpenAsync();
        }
        return true;
    }

    private bool Initialize()
    {
        if (connection == null)
        {
            try
            {
                var conn = new SqliteConnection($"Data {GetSqliteConnectionString()}");
                connection = conn;
            }
            catch
            {
                return false;
            }
        }
        return true;
    }

}
