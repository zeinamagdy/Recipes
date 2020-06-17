import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://95.217.221.62:6001/',
    headers: {
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJkZXZpY2UiOiIwMDAwMDAwMCIsInR5cGUiOjEsImlhdCI6MTU5MjIzMDk0NiwiZXhwIjoxNjIzMzM0OTQ2fQ.Ys6Y3_46tDTwn9GD_UpZgmQ4UOOuM4Ydlgquns8dn9A',
        'Accept-Language': 'en'
    }
})

export default axiosInstance;