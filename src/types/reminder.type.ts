// types/reminder.types.ts

export interface ReminderDTO {
    title: string;
    description: string;
    timestamp: number;
}

export interface ReminderResponse {
    reminderId: string;
    title: string;
    description: string;
    timestamp: string;
    userId: string;
}

export interface RemindersResponse {
    reminders: ReminderResponse[];
    count: number;
}
