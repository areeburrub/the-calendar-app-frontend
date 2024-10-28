'use server'
import ReminderService from "@/services/reminder.service";
import {ReminderDTO} from "@/types/reminder.type";

interface eventData  {
    title: string,
    description?: string,
    startTime: string,
    endTime: string,
    fullDay: boolean,
}

export async function addReminder(reminderData:ReminderDTO) {
    try {
        const reminderService = new ReminderService();
        return await reminderService.createReminder(reminderData)
    }catch (error:any){
        console.error("Error adding reminder:", error.message || error);

        return {
            error: true,
            message: error.message || "An unexpected error occurred while creating the event.",
        };
    }
}