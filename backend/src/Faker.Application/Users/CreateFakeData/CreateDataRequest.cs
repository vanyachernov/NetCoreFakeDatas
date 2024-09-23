namespace Faker.Application.Users.CreateFakeData;

public record CreateDataRequest(
    string Region, 
    double ErrorCount, 
    int Seed, 
    int Page);