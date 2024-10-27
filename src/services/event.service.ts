import axios, { AxiosError } from "axios";
import { auth } from "@clerk/nextjs/server";
import { CreateEventDTO, UpdateEventDTO, EventResponse } from "@/types/event.type";

// Backend URL
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
    (response) => response, // If response is successful, return it as-is
    (error: AxiosError) => {

        if (error.response && error.response.data && (error.response.data as any).message) {

            error.message = (error.response.data as any).message;
        }
        return Promise.reject(error);
    }
);

class EventService {
    async getAllEvents(): Promise<EventResponse[]> {
        const response = await axiosInstance.get(`/event`);
        return response.data;
    }

    async getEventById(id: string): Promise<EventResponse> {
        const response = await axiosInstance.get(`/event/${id}`);
        return response.data;
    }

    async createEvent(data: CreateEventDTO): Promise<EventResponse> {
        const response = await axiosInstance.post(`/event`, data);
        return response.data;
    }

    async updateEvent(id: string, data: UpdateEventDTO): Promise<EventResponse> {
        const response = await axiosInstance.put(`/event/${id}`, data);
        return response.data;
    }

    async deleteEvent(id: string): Promise<void> {
        await axiosInstance.delete(`/event/${id}`);
    }

    async getUpcomingEvents(): Promise<EventResponse[]> {
        const response = await axiosInstance.get(`/event/upcoming`);
        return response.data;
    }

    async getEventsInRange(start: string, end: string): Promise<EventResponse[]> {
        const response = await axiosInstance.get(`/event/range`, { params: { start, end } });
        return response.data;
    }
}

export default EventService;
