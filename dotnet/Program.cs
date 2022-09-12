using System;
using System.Runtime.InteropServices.JavaScript;
using System.Threading.Tasks;
using Dapper;
using PokedexNetWebassembly.Infrastructures;

Console.WriteLine("Hello, Console!");

return 0;

public partial class MyClass
{
    private static SqliteHelper? dbHelper;

    [JSExport]
    internal static Task<int> ConnectionTest()
    {
        return dbHelper?.AsyncBindConnection(
            (c) => {
                return c.QueryFirst<int>("select 1");
            },
            Task.FromException<int>(new Exception("Cannot open connection sqlite"))
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
