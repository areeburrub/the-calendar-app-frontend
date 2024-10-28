"use client";

import { useEffect } from "react";
import { subscribeToNotifications } from "@/_actions/subscribeNotification";

const ServiceWorkerRegister = () => {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            const handleServiceWorker = async () => {
                const register = await navigator.serviceWorker.register("/sw.js");

                // Check for existing subscription
                let subscription = await register.pushManager.getSubscription();

                if (!subscription) {
                    // If there is no subscription, create one
                    subscription = await register.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
                    });

                    // Subscribe the new subscription to your server
                    const data = await subscribeToNotifications(JSON.stringify(subscription));
                    console.log(data);
                } else {
                    // Subscription already exists, you might want to handle it (e.g., update on your server if needed)
                    console.log("Already subscribed:", subscription);
                }
            };

            handleServiceWorker();
        }
    }, []);

    return <></>;
}

export default ServiceWorkerRegister;
