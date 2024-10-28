'use server'
import EventService from "@/services/event.service";

interface eventData  {
    title: string,
    description?: string,
    startTime: string,
    endTime: string,
    fullDay: boolean,
}

export async function deleteEvent(id:string) {
    try {
        const eventService = new EventService();
        return await eventService.deleteEvent(id);
    }catch (error:any){
        console.error("Error creating event:", error.message || error);

        return {
            error: true,
            message: error.message || "An unexpected error occurred while creating the event.",
        };
    }
}