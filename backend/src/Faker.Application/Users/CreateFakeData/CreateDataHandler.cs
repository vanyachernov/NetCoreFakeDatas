using Bogus;
using CSharpFunctionalExtensions;
using Faker.Domain.UserManagement;

namespace Faker.Application.Users.CreateFakeData;

public class CreateDataHandler
{
    public Task<Result<List<User>>> Handle(
        CreateDataRequest request,
        CancellationToken cancellationToken = default)
    {
        var userDataRecords = new List<User>();

        Randomizer.Seed = new Random(request.Seed + request.Page);

        var faker = new Faker<User>();

        faker.Locale = request.Region switch
        {
            "us" => "en",
            "pl" => "pl",
            "uz" => "uz",
            _ => "en"
        };

        faker.RuleFor(u => u.Id, f => Guid.NewGuid());
        faker.RuleFor(u => u.Number, f => f.IndexFaker + 1);
        faker.RuleFor(u => u.FullName, f => f.Name.FullName());
        faker.RuleFor(u => u.Address, f => f.Address.FullAddress());
        faker.RuleFor(u => u.PhoneNumber, f => f.Phone.PhoneNumber());

        for (var k = 0; k < 20; k++)
        {
            var newRecord = faker.Generate();
            
            // errors will add here
            
            userDataRecords.Add(newRecord);
        }

        return Task.FromResult(Result.Success(userDataRecords));
    }
}