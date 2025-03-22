import AsyncStorage from '@react-native-async-storage/async-storage';
import GENERAL_CONFIG from '../config/AppConfig';

class LoginService {

    constructor() {}

    async isLoggedIn(){
        const SERVER_BASE_URL = GENERAL_CONFIG.BASE_URL;
        console.log('Inside login');
        const accessToken = await AsyncStorage.getItem('accessToken');
        console.log('Token is ' + accessToken);
        console.log({SERVER_BASE_URL})
        const response = await fetch(`${SERVER_BASE_URL}/auth/v1/ping`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
            'X-Requested-With': 'XMLHttpRequest',
          },
        });
        console.log({response})

        if(response.status === 401){
            return false;
        }
        const responseBody = await response.text();
        console.log("Response body in isLoggedIn(): ", responseBody);
        await AsyncStorage.setItem('userId', responseBody)
        return true;
      };

}

export default LoginService;