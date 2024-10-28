"use client"

import { EventForm } from "@/components/event-form";
import { format, parse } from "date-fns";
import { fromZonedTime  } from 'date-fns-tz';
import { createEvent } from "@/_actions/createEvent";
import { ToastAction } from "@/components/ui/toast";
import { z } from "zod";
import { createEventSchema } from "@/schema/eventForm.schema";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type CreateEventFormValues = z.infer<typeof createEventSchema>;

export const CreateEventForm = () => {
    const router = useRouter();

    const convertToUtc = (date: Date) => {
        // Get the user's timezone
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        // Convert the local time to UTC while preserving the intended time
        return fromZonedTime(date, userTimeZone);
    };

    const onSubmit = async (data: CreateEventFormValues) => {
        try {
            // Parse the local datetime strings to Date objects
            const startDateTime = parse(
                `${format(data.startDate, 'yyyy-MM-dd')} ${data.startTime}`,
                'yyyy-MM-dd hh:mm a',
                new Date()
            );
            const endDateTime = parse(
                `${format(data.endDate, 'yyyy-MM-dd')} ${data.endTime}`,
                'yyyy-MM-dd hh:mm a',
                new Date()
            );

            // Convert local dates to UTC
            const utcStartDateTime = convertToUtc(startDateTime);
            const utcEndDateTime = convertToUtc(endDateTime);

            const eventData = {
                title: data.title,
                description: data.description,
                startTime: utcStartDateTime.toISOString(),
                endTime: utcEndDateTime.toISOString(),
                fullDay: data.fullDay,
            };

            // Clerk Auth only works on server side so have to create an action for validation on server side
            const response = await createEvent(eventData);

            if ("error" in response) throw new Error(response.message);

            toast({
                title: "Event Created"
            });

            router.push(`/events/${response?.id}`);

        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Ugh, unable to create event",
                description: error?.message,
                action: <ToastAction onClick={() => { router.push("/events") }} altText="Check Events">
                    Check Events
                </ToastAction>
            });
        }
    };

    return (
        <>
            <EventForm onSubmit={onSubmit} />
        </>
    );
};