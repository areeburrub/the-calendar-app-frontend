import {CalendarComponent} from "@/components/calendar";
import EventService from "@/services/event.service";

const DashboardPage = async () => {
    const eventService = new EventService();

    const allEvents = await eventService.getAllEvents();

    return (
        <>
            <div className={"h-[90vh]"}>
                <CalendarComponent all_events={allEvents}/>
            </div>

        </>
    )
}

export default DashboardPage