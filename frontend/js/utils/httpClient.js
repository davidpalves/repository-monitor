import axios from 'axios';
import cookie from 'react-cookies';


const baseURL = 'http://mogitor.herokuapp.com/api/v1/'

const axiosInstance = axios.create({
    baseURL,
    timeout: 1000*60,
});

axiosInstance.interceptors.request.use(async (config) => {
    config.headers['X-CSRFToken'] = cookie.load('csrftoken');
    return config
}, error => Promise.reject(error));

export default axiosInstance;