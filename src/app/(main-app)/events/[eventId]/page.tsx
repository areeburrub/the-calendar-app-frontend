import EventService from "@/services/event.service"
import { Button } from "@/components/ui/button"
import {PenBoxIcon, Trash, Calendar, Clock, AlertCircle} from "lucide-react"
import { format, formatDistanceToNow } from "date-fns"
import Link from "next/link"
import GoBackButton from "@/components/goBackButton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import DeleteEventButton from "@/components/confirm-deletion";
import AddReminderBtn from "@/components/add-reminder";

import {CalendarElement, StartAndEndDate} from "./components/localTimeFormatedDate"

const SingleEventPage = async ({ params }: { params: { eventId: string } }) => {
    const eventService = new EventService()
    const event = await eventService.getEventById(params.eventId)

    const isUpdated = new Date(event.updatedAt) > new Date(event.createdAt)
    const timeAgo = formatDistanceToNow(isUpdated ? new Date(event.updatedAt) : new Date(event.createdAt), { addSuffix: true })

    return (
        <div className="container max-w-3xl mx-auto py-8 px-4">
            <Card className="shadow-lg">
                <CardHeader className="flex flex-row justify-between items-center">
                    <GoBackButton />
                    <div className="flex space-x-2">
                        <AddReminderBtn eventId={event.id} eventTitle={event.title} eventStartTime={new Date(event.startTime).getTime()}/>
                        <Link href={`/events/${event.id}/update`} passHref>
                            <Button variant="outline" size="sm">
                                <PenBoxIcon className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                        </Link>
                        <DeleteEventButton eventId={event.id}/>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex justify-between items-start gap-5">
                        <div className="space-y-1">
                            <h1 className="text-3xl font-bold">{event.title}</h1>
                            <p className="text-sm text-muted-foreground">
                                {isUpdated ? 'Updated' : 'Created'} {timeAgo}
                            </p>
                        </div>
                        <div className="text-center">
                            {/* Converted to client component in order to get local time from UTC */}
                            <CalendarElement time={event.startTime}/>
                        </div>
                    </div>
                    <Separator />

                    {/* Converted to client component in order to get local time from UTC */}
                    <StartAndEndDate startTime={event.startTime} endTime={event.endTime}/>

                    <Separator />
                    <div className="space-y-2">
                        <h2 className="font-semibold">Event Description</h2>
                        <p className="text-muted-foreground whitespace-pre-wrap">{event.description}</p>
                    </div>
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">
                    Event ID: {event.id}
                </CardFooter>
            </Card>
        </div>
    )
}

export default SingleEventPage