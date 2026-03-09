import axios from 'axios';
import { API_URL } from './constant';

const BASE_URL = import.meta.env.VITE_MODE === "development" ? API_URL : "/"

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
});

export default api;