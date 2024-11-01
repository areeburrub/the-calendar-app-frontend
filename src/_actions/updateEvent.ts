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
        return await eventService.updateEvent(id,eventData);
    }catch (error:any){
        console.error("Error creating event:", error.message || error);

        return {
            error: true,
            message: error.message || "An unexpected error occurred while creating the event.",
        };
    }
}