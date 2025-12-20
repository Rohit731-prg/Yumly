import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";


export const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'https://x8wzk6t6-3000.inc1.devtunnels.ms/'
})

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }, (error) => {
        Promise.reject(error);
    }
)