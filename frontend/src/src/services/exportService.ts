import axios from "axios";
import {saveAs} from 'file-saver';
import {CreateFakeDataResponse} from "../models/CreateFakeDataResponse.ts";
import {urls} from "../shared/constants/urls.ts";

export const ExportDataToCsv = async (visibleUsers : CreateFakeDataResponse[]) => {
    try {
        const response = await axios.post(
            urls.EXPORTS, 
            visibleUsers, 
            {
                responseType: 'blob',
            }
        );
        
        console.log(visibleUsers);
        
        const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
        
        const fileName = response.headers['content-disposition']
            ? response.headers['content-disposition'].split('filename=')[1]
            : 'exported_data.csv';

        saveAs(blob, fileName);
    } catch (error) {
        console.error('Failed to export CSV:', error);
    }
};