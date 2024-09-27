using Faker.Application.Users.CreateFakeData;
using Faker.Application.Users.ExportFakeData;
using Microsoft.Extensions.DependencyInjection;

namespace Faker.Application;

public static class Inject
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<CreateDataHandler>();
        
        services.AddScoped<ExportDataHandler>();
        
        return services;
    }
}