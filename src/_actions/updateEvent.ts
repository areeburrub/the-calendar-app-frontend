'use server'
import EventService from "@/services/event.service";

interface eventData  {
    title: string,
    description?: string,
    startTime: string,
    endTime: string,
    fullDay: boolean,
}

export async function updateEvent(id:string,eventData:eventData) {
    try {
        const eventService = new EventService();
        return eventService.updateEvent(id,eventData);
    }catch (e){
        throw e
    }
}