import AsyncStorage from '@react-native-async-storage/async-storage';
import { getHeaders } from '../utils/ApiUtils';
import GENERAL_CONFIG from '../config/AppConfig';

class DataExtractionService {
    
    constructor() {}

    async sendToDES(message: string) {
        const SERVER_BASE_URL = GENERAL_CONFIG.BASE_URL;

        try {
            const userId = await AsyncStorage.getItem('userId');
            
            if (!userId) {
                throw new Error("User ID not found in AsyncStorage.");
            }

            const response = await fetch(`${SERVER_BASE_URL}/extract/v1/analyze`, {
                method: 'POST',
                headers: { "X-User-Id": userId, ...(await getHeaders()) },
                body: JSON.stringify({ message })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server Error: ${errorText}`);
            }

            return await response.json();
            
        } catch (error) {
            console.error("sendToDES Error:", error);
            throw error;
        }
    }
}

export default DataExtractionService;
