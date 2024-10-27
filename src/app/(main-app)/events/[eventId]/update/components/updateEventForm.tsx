"use client"

import {EventForm} from "@/components/event-form";
import {format, parse} from "date-fns";
import {ToastAction} from "@/components/ui/toast";
import {z} from "zod";
import { updateEventSchema} from "@/schema/eventForm.schema";
import {toast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";
import {EventResponse} from "@/types/event.type";
import {updateEvent} from "@/_actions/updateEvent";

type UpdateEventFormValues = z.infer<typeof updateEventSchema>;


export const UpdateEventForm = ({event}:{event:EventResponse}) => {

    const router = useRouter()

    const onSubmit = async (data: UpdateEventFormValues) => {
        try {
            const startDateTime = parse(`${format(data.startDate, 'yyyy-MM-dd')} ${data.startTime}`, 'yyyy-MM-dd hh:mm a', new Date());
            const endDateTime = parse(`${format(data.endDate, 'yyyy-MM-dd')} ${data.endTime}`, 'yyyy-MM-dd hh:mm a', new Date());

            const eventData = {
                title: data.title,
                description: data.description,
                startTime: startDateTime.toISOString(),
                endTime: endDateTime.toISOString(),
                fullDay: data.fullDay,
            };

            // Clerk Auth only works on server side so have to create an action for validation on server side
            const response = await updateEvent(event.id,eventData)

            if ("error" in response) throw new Error(response.message)

            toast({
                title: "Event Updated"
            })
            router.push(`/events/${response.id}`)
        } catch (error:any) {
            toast({
                variant: "destructive",
                title: "Ugh, unable to create event",
                description: error?.message,
                action: <ToastAction onClick={()=>{router.push("/events")}} altText="Check Events">Check Events</ToastAction>
            })
            console.error('Error creating event:', error);
        }
    };
    return(
        <>
            <EventForm onSubmit={onSubmit} event={event}/>
        </>
    )
}