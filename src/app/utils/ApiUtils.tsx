import AsyncStorage from "@react-native-async-storage/async-storage";

  // Helper function to get headers with accessToken
  export const getHeaders = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) throw new Error('Access token not found');

    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
  };