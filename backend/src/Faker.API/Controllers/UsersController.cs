using Faker.Application.Users.CreateFakeData;
using Faker.Domain.UserManagement;
using Microsoft.AspNetCore.Mvc;

namespace Faker.API.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<CreateDataResponse>>> GetFakesData(
        [FromQuery] CreateDataRequest request,
        [FromServices] CreateDataHandler handler,
        CancellationToken cancellationToken = default)
    {
        var data = handler.Handle(request, cancellationToken);

        await Task.Delay(0, cancellationToken);
        
        return data.Result.Value;
    }
}