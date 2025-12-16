import axios from "axios"

export const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'https://x8wzk6t6-3000.inc1.devtunnels.ms/'
})