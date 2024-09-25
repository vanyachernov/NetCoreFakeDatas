namespace Faker.Application.Users.CreateFakeData.Errors;

public static class ErrorsHandler
{
    public static void SetErrors(
        CreateDataResponse model,
        double errorCount)
    {
        var random = new Random();

        var allErrors = (int)errorCount;
        var unCertainty = errorCount - allErrors;

        for (var k = 0; k < allErrors; k++)
        {
            SetErrorType(model, random);
        }

        if (random.NextDouble() < unCertainty)
        {
            SetErrorType(model, random);
        }
    }

    private static void SetErrorType(
        CreateDataResponse model,
        Random random)
    {
        var fieldType = random.Next(1, 4);
        var errorType = random.Next(1, 4);

        switch (fieldType)
        {
            case 1:
                var editingFullNameResult = SetErrorToField(
                    model.FullName.FirstName, 
                    errorType, 
                    random);
                model.FullName = model.FullName with { FirstName = editingFullNameResult };
                break;
            case 2:
                var editingAddressResult = SetErrorToField(
                    model.Address.StreetAddress, 
                    errorType, 
                    random);
                model.Address = model.Address with { StreetAddress = editingAddressResult };
                break;
            case 3:
                model.PhoneNumber = SetErrorToField(
                    model.PhoneNumber,
                    errorType,
                    random);
                break;
        }
    }
    
    private static string SetErrorToField(
        string field,
        int errorType,
        Random random)
    {
        return errorType switch
        {
            1 => RemoveRandomCharacter(field, random),
            2 => AddRandomCharacter(field, random),
            3 => SwapRandomCharacters(field, random),
            _ => field
        };
    }

    private static string SwapRandomCharacters(string input, Random random)
    {
        if (input.Length < 2)
        {
            return input;
        }

        var index = random.Next(0, input.Length - 1);
        var characters = input.ToCharArray();
        
        (characters[index], characters[index + 1]) = (characters[index + 1], characters[index]);

        return new string(characters);
    }

    private static string AddRandomCharacter(string input, Random random)
    {
        var randomCharacter = (char)random.Next('a', 'z');
        var index = random.Next(0, input.Length);
        
        return input.Insert(index, randomCharacter.ToString());
    }

    private static string RemoveRandomCharacter(string input, Random random)
    {
        if (input.Length == 0)
        {
            return input;
        }

        var index = random.Next(0, input.Length);

        return input.Remove(index, 1);
    }
}