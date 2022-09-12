using System;
using System.Runtime.InteropServices.JavaScript;
using Microsoft.Data.Sqlite;
using Dapper;

var conn = new SqliteConnection("Data Source=:memory:");
conn.Open();
var result = conn.QueryFirst<int>("select 1");
Console.WriteLine(result);
conn.Close();

Console.WriteLine("Hello, Console!");

return 0;

public partial class MyClass
{
    [JSExport]
    internal static string Greeting()
    {
        var text = $"Hello, World! Greetings from node version: {GetNodeVersion()}";
        return text;
    }

    [JSImport("node.process.version", "main.mjs")]
    internal static partial string GetNodeVersion();
}
