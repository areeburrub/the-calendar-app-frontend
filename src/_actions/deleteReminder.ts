'use server'
import ReminderService from "@/services/reminder.service";

export async function deleteReminder(reminderId:string) {
    try {
        const reminderService = new ReminderService();
        return await reminderService.deleteReminder(reminderId);
    }catch (error:any){
        console.error("Error creating event:", error.message || error);

        return {
            error: true,
            message: error.message || "An unexpected error occurred while creating the event.",
        };
    }
}