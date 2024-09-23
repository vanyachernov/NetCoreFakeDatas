using Faker.Application.Users.CreateFakeData;
using Microsoft.Extensions.DependencyInjection;

namespace Faker.Application;

public static class Inject
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<CreateDataHandler>();
        
        return services;
    }
}