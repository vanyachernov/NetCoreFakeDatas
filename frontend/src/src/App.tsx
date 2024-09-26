import './App.css'
import Header from "./components/Header.tsx";
import {Box} from "@chakra-ui/react";
import FakerDataTable from "./components/FakerDataTable.tsx";
import {useState} from "react";
import {CreateFakeDataResponse} from "./models/CreateFakeDataResponse.ts";
import {FetchFakeUsers} from "./services/userService.ts";
import FakerDataTableControls from "./components/FakerDataTableControls.tsx";

interface GenerateParams {
    region: string;
    errorsCount: number;
    seed: number;
}

function App() {
    const [data, setData] = 
        useState<CreateFakeDataResponse[]>([]);

    const handleGenerate = async ({ region, errorsCount, seed } : GenerateParams) => {
        try {
            const users = await FetchFakeUsers({ 
                region, 
                errorCount: 
                errorsCount, 
                seed, 
                page: 1 
            });
            setData(users);
        } catch (error) {
            console.error("Ошибка при получении фейковых пользователей:", error);
        }
    };


    const handleExport = () => {
        console.log("Export data:", data);
    };
    
    return (
        <>
          <Header />
          <Box>
                <FakerDataTableControls onGenerate={handleGenerate} onExport={handleExport} />
                <FakerDataTable data={data} />
          </Box>
        </>
    )
}

export default App
