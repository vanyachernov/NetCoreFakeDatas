using Faker.Application.DTOs;

namespace Faker.Application.Users.CreateFakeData;

public record CreateDataResponse
{
    public int Number { get; set; } 
    public Guid Id { get; set; } 
    public FullNameDto FullName { get; set; } 
    public AddressDto Address { get; set; } 
    public string PhoneNumber { get; set; }
};