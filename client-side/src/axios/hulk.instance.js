import axios from 'axios';
import appConfig from '../config/appConfig';

const instance = axios.create({ 
    baseURL: appConfig.apiURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
});

export default instance;