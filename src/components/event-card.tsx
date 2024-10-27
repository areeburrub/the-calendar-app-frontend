import {formatDistanceToNow, format} from 'date-fns'
import {MoreVertical, Edit} from 'lucide-react'

import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {EventResponse} from "@/types/event.type";

export function EventCardComponent({event}: {
    event: EventResponse
}) {


    const isUpdated = new Date(event.updatedAt) > new Date(event.createdAt)
    const timeAgo = formatDistanceToNow(isUpdated ? new Date(event.updatedAt) : new Date(event.createdAt), {addSuffix: true})
    const formattedDate = format(new Date(event.startTime), 'MMMM d, yyyy')
    const formattedStartTime = format(new Date(event.startTime), 'h:mm a')
    const formattedEndTime = format(new Date(event.endTime), 'h:mm a')

    return (
            <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold">{event.title}</CardTitle>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem >
                            <Edit className="mr-2 h-4 w-4"/>
                            <span>Edit</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-2">{formattedDate}</p>
                {event.fullDay ? (
                    <Badge>Full Day</Badge>
                ) : (
                    <p className="text-sm font-medium">
                        {formattedStartTime} - {formattedEndTime}
                    </p>
                )}
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3 h-10">{event.description}</p>
            </CardContent>
            <CardFooter>
                <p className="text-xs text-muted-foreground">
                    {isUpdated ? 'Updated' : 'Created'} {timeAgo}
                </p>
            </CardFooter>
        </Card>
    )
}