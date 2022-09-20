using System;
using System.Threading.Tasks;
using Microsoft.Data.Sqlite;

namespace PokedexNetWebassembly.Shared.Infrastructures;

public class SqliteHelper
{
    private SqliteConnection connection;
    private Func<string> GetSqliteConnectionString { get; init; }

    public SqliteHelper(Func<string> getSqliteConnectionString)
    {
        GetSqliteConnectionString = getSqliteConnectionString;
    }

    public async Task<T> AsyncBindConnection<T>(Func<SqliteConnection, Task<T>> fn, Task<T> onFailConnection)
    {
        if (!await OpenSqlite())
        {
            return await onFailConnection;
        }
        try
        {
            var result = await fn(connection);
            await connection.CloseAsync();
            return result;
        }
        catch (Exception e)
        {
            return await Task.FromException<T>(e);
        }
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
                var conn = new SqliteConnection(GetSqliteConnectionString());
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
