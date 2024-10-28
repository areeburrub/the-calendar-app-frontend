import EventService from "@/services/event.service";
import {EventCardComponent} from "@/components/event-card";
import Link from "next/link";

const EventsPage = async () => {

    const eventService = new EventService();

    const allEvents = await eventService.getAllEvents();

    return (
        <div className={"p-4"}>
            <h1 className={"text-3xl font-bold py-2"}>Your Events</h1>
            {allEvents.length === 0 && (
                <p className="text-center text-muted-foreground">No Events found.</p>
            )}
            <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4"}>
                {
                    allEvents.map((event) => {
                        return (
                            <Link key={event.id} passHref={true} href={`/events/${event.id}`}>
                                <EventCardComponent
                                    event={event}
                                />
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default EventsPage