'use server'
import NotificationService from "@/services/notification.service";

export async function subscribeToNotifications(subscriptionString: string) {
    try {
        const subscription = JSON.parse(subscriptionString) as PushSubscription
        const notification = new NotificationService();
        return await notification.subscribe(subscription);
    }catch (error:any){
        console.error("Error creating event:", error.message || error);

        return {
            error: true,
            message: error.message || "An unexpected error occurred while creating the event.",
        };
    }
}