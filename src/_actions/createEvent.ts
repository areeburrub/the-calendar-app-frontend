'use server'
import EventService from "@/services/event.service";

interface eventData  {
    title: string,
    description?: string,
    startTime: string,
    endTime: string,
    fullDay: boolean,
}

export async function createEvent(eventData:eventData) {
    try {
        const eventService = new EventService();
        return eventService.createEvent(eventData);
    }catch (e){
        throw e
    }
}