namespace Faker.Domain.UserManagement;

public class User
{
    public int Number { get; set; }
    public Guid Id { get; set; }
    public string FullName { get; set; } = default!;
    public string Address { get; set; } = default!;
    public string PhoneNumber { get; set; } = default!;
}