'use server'
import EventService from "@/services/event.service";

export async function getAllEvents() {
    try {
        const eventService = new EventService();
        return eventService.getAllEvents();
    }catch (e){
        throw e
    }
}