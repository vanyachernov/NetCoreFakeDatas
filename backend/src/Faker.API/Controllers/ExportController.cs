using Faker.Application.Users.ExportFakeData;
using Microsoft.AspNetCore.Mvc;

namespace Faker.API.Controllers;

[ApiController]
[Route("[controller]")]
public class ExportController : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> ExportToCsv(
        [FromBody] IEnumerable<ExportDataRequest> visibleUsers,
        [FromServices] ExportDataHandler handler,
        CancellationToken cancellationToken = default)
    {
        if (!visibleUsers.Any())
        {
            return BadRequest("No data to export.");
        }
        
        try
        {
            var csvData = await handler.Handle(visibleUsers);

            var fileName = $"ExportedData_{DateTime.UtcNow:yyyyMMdd_HHmmss}.csv";

            return File(csvData, "text/csv", fileName);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}