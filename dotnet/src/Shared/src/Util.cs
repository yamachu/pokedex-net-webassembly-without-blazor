using Microsoft.Data.Sqlite;

namespace PokedexNetWebassembly.Shared.Util;

public static class SqliteDataReaderExt
{
    internal static IEnumerable<SqliteDataReader> ToEnumerable(this SqliteDataReader reader)
    {
        while (reader.Read()) {
            yield return reader;
        }
    }
}
