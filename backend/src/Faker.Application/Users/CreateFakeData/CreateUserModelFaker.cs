using Bogus;
using Faker.Application.DTOs;
using Faker.Domain.UserManagement;

namespace Faker.Application.Users.CreateFakeData;

public sealed class CreateUserModelFaker : Faker<CreateDataResponse>
{
    private CreateUserModelFaker(string locale) : base(locale)
    {
        RuleFor(u => u.Id, f => Guid.NewGuid());
        RuleFor(u => u.Number, f => f.IndexFaker + 1);
        RuleFor(u => u.FullName, f => new FullNameDto(
            f.Name.FirstName(),
            f.Name.LastName()
        ));
        RuleFor(u => u.Address, f => new AddressDto(
            f.Address.StreetAddress(),
            f.Address.StreetName(),
            f.Address.City(),
            f.Address.State(),
            f.Address.Country()
        ));
        RuleFor(u => u.PhoneNumber, f => f.Phone.PhoneNumber());
    }
    
    public static CreateUserModelFaker Create(string region)
    {
        var locale = region.ToLower() switch
        {
            "us" => "en",
            "ru" => "ru",
            "ua" => "uk",
            _ => "en"
        };

        return new CreateUserModelFaker(locale);
    }
}