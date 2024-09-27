using Bogus;
using CSharpFunctionalExtensions;
using Faker.Application.Users.CreateFakeData.Errors;

namespace Faker.Application.Users.CreateFakeData;

public class CreateDataHandler
{
    public Task<Result<List<CreateDataResponse>>> Handle(
        CreateDataRequest request,
        CancellationToken cancellationToken = default)
    {
        var userDataRecords = new List<CreateDataResponse>();

        var random = new Random();

        Randomizer.Seed = new Random(request.Seed + request.Page);

        var faker = CreateUserModelFaker.Create(request.Region);

        for (var k = 0; k < 20; k++)
        {
            var newRecord = faker.Generate();

            var newUserResponse = new CreateDataResponse
            {
                Number = newRecord.Number,
                Id = newRecord.Id,
                FullName = newRecord.FullName,
                Address = newRecord.Address,
                PhoneNumber = newRecord.PhoneNumber
            };
            
            ErrorsHandler.SetErrors(newUserResponse, request.Region, request.ErrorCount, random);
            
            userDataRecords.Add(newUserResponse);
        }

        return Task.FromResult(Result.Success(userDataRecords));
    }
}