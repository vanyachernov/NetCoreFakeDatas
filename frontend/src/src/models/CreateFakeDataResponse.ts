export interface CreateFakeDataResponse {
    number: number;
    id: string;
    fullName: { 
        firstName: string;
        lastName: string;
    };
    address: {
        streetAddress: string;
        streetName: string;
        city: string;
        state: string;
        country: string;
    };
    phoneNumber: string;
}