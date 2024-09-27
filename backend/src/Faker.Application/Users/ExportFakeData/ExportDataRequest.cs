using Faker.Application.DTOs;

namespace Faker.Application.Users.ExportFakeData;

public record ExportDataRequest
{
    public int Number { get; set; }
    public string Id { get; set; }
    public FullNameDto FullName { get; set; }
    public AddressDto Address { get; set; }
    public string PhoneNumber { get; set; }
}