import axios, { AxiosError } from "axios";
import { auth } from "@clerk/nextjs/server";
import {ReminderDTO,RemindersResponse,ReminderResponse} from "@/types/reminder.type"


const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";


const axiosInstance = axios.create({
    baseURL: BACKEND_URL,
});


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


axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.data && (error.response.data as any).message) {
            error.message = (error.response.data as any).message;
        }
        return Promise.reject(error);
    }
);

class ReminderService {
    /**
     * Get all reminders for the authenticated user
     */
    async getAllReminders(): Promise<RemindersResponse> {
        const response = await axiosInstance.get('/reminder');
        return response.data;
    }

    /**
     * Create a new reminder
     */
    async createReminder(data: ReminderDTO): Promise<ReminderResponse> {
        const response = await axiosInstance.post('/reminder', data);
        return response.data;
    }

    /**
     * Get upcoming reminders for the authenticated user
     */
    async getUpcomingReminders(): Promise<RemindersResponse> {
        const response = await axiosInstance.get('/reminder/upcoming');
        return response.data;
    }

    /**
     * Delete a specific reminder
     */
    async deleteReminder(reminderId: string): Promise<void> {
        await axiosInstance.delete(`/reminder/${reminderId}`);
    }
}

export default ReminderService;