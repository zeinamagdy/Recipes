import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://online-shop-4d9ce.firebaseio.com',

})
export const axiosRecipes = axios.create({
    baseURL: 'https://api.spoonacular.com'
})
export default axiosInstance;