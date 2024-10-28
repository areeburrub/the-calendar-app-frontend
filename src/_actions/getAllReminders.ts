'use server'
import ReminderService from "@/services/reminder.service";

export async function getAllReminders() {
    try {
        const reminderService = new ReminderService();
        return reminderService.getAllReminders();
    }catch (e){
        throw e
    }
}