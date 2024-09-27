using System.Globalization;
using System.Text;
using CsvHelper;
using CsvHelper.Configuration;

namespace Faker.Application.Users.ExportFakeData;

public class ExportDataHandler
{
    public async Task<byte[]> Handle<T>(IEnumerable<T> records)
    {
        var enumerable = records as T[] ?? records.ToArray();
        
        if (records == null || !enumerable.Any())
        {
            throw new ArgumentException("No data available for export");
        }
        
        var csvConfig = new CsvConfiguration(CultureInfo.InvariantCulture)
        {
            Delimiter = ";"
        };

        using var memoryStream = new MemoryStream();
        
        await using var streamWriter = new StreamWriter(memoryStream, Encoding.UTF8);
        await using var csvWriter = new CsvWriter(streamWriter, csvConfig);
        
        await csvWriter.WriteRecordsAsync(enumerable);
        await streamWriter.FlushAsync();

        return memoryStream.ToArray();
    }
}