import DataExtractionService from "../api/DataExtractionService"

export const headlessNotificationListener = async ({ notification }) => {
    
    if (notification) {
        const parsedNotification = JSON.parse(notification);
        const message = parsedNotification.text;
        
        new DataExtractionService().sendToDES(message);
    }
    
}
