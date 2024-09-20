import axios from "axios";

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const username = process.env.REACT_APP_API_USERNAME;
        const password = process.env.REACT_APP_API_PASSWORD;
        if(username && password){
            config.auth = {
                username: username,
                password: password
            };
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
);

export default axiosInstance