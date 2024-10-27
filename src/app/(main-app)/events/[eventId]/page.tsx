import EventService from "@/services/event.service";
import {Button} from "@/components/ui/button";
import { PenBoxIcon, Trash} from "lucide-react";
import {format, formatDistanceToNow} from "date-fns";
import Link from "next/link";
import GoBackButton from "@/components/goBackButton";


const SingleEventPage = async ({ params }: { params: { eventId: string } }) => {
    const eventService = new EventService();

    const event = await eventService.getEventById(params.eventId)

    const isUpdated = new Date(event.updatedAt) > new Date(event.createdAt)
    const timeAgo = formatDistanceToNow(isUpdated ? new Date(event.updatedAt) : new Date(event.createdAt), {addSuffix: true})

    return(
        <div className={"p-4 container max-w-screen-lg mx-auto"}>
            <div className={"flex flex-row justify-between w-full py-4"}>
                <GoBackButton/>
                <div className={"flex flex-row gap-4"}>
                    <Link href={`/events/${event.id}/delete`} passHref={true}>
                        <Button variant={"destructive"}><Trash/>Delete</Button>
                    </Link>
                    <Link href={`/events/${event.id}/update`} passHref={true}>
                        <Button ><PenBoxIcon/>Edit</Button>
                    </Link>
                </div>
            </div>
            <div className={"flex justify-between items-center flex-row py-4"}>
                <div>
                    <h1 className={"text-4xl font-bold my-2"}>{event.title}</h1>
                    <p className="text-muted-foreground">
                        {isUpdated ? 'Updated' : 'Created'} {timeAgo}
                    </p>
                </div>
                <div className={"w-24 border-2 border-black"}>
                    <div className={"w-full p-1 uppercase text-white font-bold bg-red-500 text-xl flex items-center justify-center"}>
                        {format(new Date(event.startTime), 'MMM')}
                    </div>
                    <div className={"w-24 h-16 flex items-center justify-center text-3xl font-bold"}>
                        {format(new Date(event.startTime), 'dd')}
                    </div>
                </div>
            </div>
            <h2 className={"font-bold text-xl"}>Event Description:</h2>
            <p className={"whitespace-pre-wrap text-lg"}>
                {event.description}
            </p>
        </div>
    )
}

export default SingleEventPage