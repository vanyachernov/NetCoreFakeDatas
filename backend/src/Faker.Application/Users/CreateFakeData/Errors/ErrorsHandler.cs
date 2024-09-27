namespace Faker.Application.Users.CreateFakeData.Errors;

public static class ErrorsHandler
{
    public static void SetErrors(
        CreateDataResponse model,
        string locale,
        double errorCount,
        Random random)
    {
        var allErrors = (int)errorCount;
        var unCertainty = errorCount - allErrors;

        for (var k = 0; k < allErrors; k++)
        {
            SetErrorType(model, locale, random);
        }

        if (random.NextDouble() < unCertainty)
        {
            SetErrorType(model, locale, random);
        }
    }

    private static void SetErrorType(
        CreateDataResponse model,
        string locale,
        Random random)
    {
        var fieldType = random.Next(1, 4);
        var errorType = random.Next(1, 4);

        switch (fieldType)
        {
            case 1:
                var editingFullNameResult = SetErrorToField(
                    model.FullName.FirstName, 
                    locale,
                    errorType, 
                    random);
                model.FullName = model.FullName with { FirstName = editingFullNameResult };
                break;
            case 2:
                var editingAddressResult = SetErrorToField(
                    model.Address.StreetAddress, 
                    locale,
                    errorType, 
                    random);
                model.Address = model.Address with { StreetAddress = editingAddressResult };
                break;
            case 3:
                model.PhoneNumber = SetErrorToField(
                    model.PhoneNumber,
                    locale,
                    errorType,
                    random);
                break;
        }
    }
    
    private static string SetErrorToField(
        string field,
        string locale,
        int errorType,
        Random random)
    {
        return errorType switch
        {
            1 => RemoveRandomCharacter(field, random),
            2 => AddRandomCharacter(field, locale, random),
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

    private static string AddRandomCharacter(string input, string locale, Random random)
    {
        var randomCharacter = locale switch
        {
            "en" => (char)random.Next('a', 'z'),
            "ru" => (char)random.Next('а', 'я'),
            "ua" => (char)random.Next('а', 'я'),
            _ => (char)random.Next('a', 'z')
        };
        
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