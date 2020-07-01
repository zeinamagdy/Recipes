import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://online-shop-4d9ce.firebaseio.com',
  
})

export default axiosInstance;