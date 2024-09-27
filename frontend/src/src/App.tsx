import './App.css';
import Header from "./components/Header.tsx";
import FakerDataTable from "./components/FakerDataTable.tsx";
import { useState } from "react";
import { CreateFakeDataResponse } from "./models/CreateFakeDataResponse.ts";
import { FetchFakeUsers } from "./services/userService.ts";

interface GenerateParams {
    region: string;
    errorsCount: number;
    seed: number;
}

function App() {
    const [data, setData] = useState<CreateFakeDataResponse[]>([]);

    const handleGenerate = async ({ region, errorsCount, seed }: GenerateParams): Promise<CreateFakeDataResponse[]> => {
        try {
            const users = await FetchFakeUsers({
                region,
                errorCount: errorsCount,
                seed,
                page: 1
            });

            setData(users);
            return users;
        } catch (error) {
            console.error("Error fetching users:", error);
            return [];
        }
    };

    const handleExport = () => {
        console.log("Export data:", data);
    };

    return (
        <>
            <Header />
            <FakerDataTable data={data} onGenerate={handleGenerate} />
        </>
    );
}

export default App;
