import EventService from "@/services/event.service";
import {UpdateEventForm} from "@/app/(main-app)/events/[eventId]/update/components/updateEventForm";

const UpdateEventPage = async ({ params }: { params: { eventId: string } }) => {
    const eventService = new EventService();

    const event = await eventService.getEventById(params.eventId)

    return(
        <div className="flex flex-col gap-4 w-full h-[90vh] justify-center items-center">

            <div className={"max-w-3xl mx-auto p-4"}>
                <h1 className={"text-3xl font-bold py-2"}>Update Event</h1>
                <UpdateEventForm event={event}/>
            </div>
        </div>
    )
}

export default UpdateEventPage