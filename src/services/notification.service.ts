import axios from "axios";
import { auth } from "@clerk/nextjs/server";

// Backend URL
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

const axiosInstance = axios.create({
    baseURL: BACKEND_URL,
});

// Add request interceptor to include Clerk token in headers
axiosInstance.interceptors.request.use(
    async (config) => {
        const { getToken } = await auth();
        const token = await getToken();

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

class NotificationService {

    async subscribe(subscription: PushSubscription): Promise<void> {
        const res = await axiosInstance.post(`/notification/subscribe`, subscription, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.data;
        return data;
    }
}

export default NotificationService;
