import axios from "axios";
import {CreateFakeDataResponse} from "../models/CreateFakeDataResponse.ts";
import {urls} from "../shared/constants/urls.ts";

export const FetchFakeUsers = async ({
    region,
    errorCount,
    seed,
    page
}: {
    region: string;
    errorCount: number;
    seed: number;
    page: number;
}): Promise<CreateFakeDataResponse[]> => {
    try {
        const response = await axios.get<CreateFakeDataResponse[]>(
            urls.USERS,
            {
                params: {
                    region,
                    errorCount,
                    seed,
                    page
                },
            }
        );

        if (!response.data) {
            console.error("No user data");
            return [];
        }

        return response.data;
    } catch (exception) {
        console.error(exception);
        throw exception;
    }
};