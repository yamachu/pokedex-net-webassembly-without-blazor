using System;
using System.Runtime.InteropServices.JavaScript;
using System.Threading.Tasks;
using Microsoft.Data.Sqlite;
using Dapper;

Console.WriteLine("Hello, Console!");

return 0;

public partial class MyClass
{
    private static SqliteConnection connection;

    [JSExport]
    internal static Task<int> ConnectionTest()
    {
        return AsyncBindConnection(
            (c) => {
                return c.QueryFirst<int>("select 1");
            },
            Task.FromException<int>(new Exception("Cannot open connection sqlite"))
        );
    }

    [JSImport("sqlite.connection", "main.mjs")]
    internal static partial string GetSqliteConnectionString();

    private static async Task<T> AsyncBindConnection<T>(Func<SqliteConnection, T> fn, Task<T> onFailConnection)
    {
        if (!await OpenSqlite())
        {
            return await onFailConnection;
        }
        var result = fn(connection);
        await connection.CloseAsync();
        return result;
    }

    private static async Task<bool> OpenSqlite()
    {
        if (!_Initialize())
        {
            return false;
        }
        if (connection.State != System.Data.ConnectionState.Open)
        {
            await connection.OpenAsync();
        }
        return true;
    }

    private static bool _Initialize()
    {
        if (connection == null)
        {
            try
            {
                connection = new SqliteConnection($"Data {MyClass.GetSqliteConnectionString()}");
            }
            catch
            {
                return false;
            }
        }
        return true;
    }

}
