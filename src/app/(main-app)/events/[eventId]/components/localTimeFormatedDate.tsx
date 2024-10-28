"use client"

import {format} from "date-fns";
import {Calendar, Clock} from "lucide-react";

export const CalendarElement = ({time}: { time:any }) => {

    return(
        <>
            <div className="bg-primary text-primary-foreground text-xl font-bold uppercase p-2 rounded-t-md">
                {format(new Date(time), 'MMM')}
            </div>
            <div className="bg-secondary text-secondary-foreground text-3xl font-bold p-4 rounded-b-md">
                {format(new Date(time), 'dd')}
            </div>
        </>
    )
}


export const StartAndEndDate = ({startTime, endTime}:{startTime:any,endTime:any}) => {

    return(
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <h2 className="font-semibold flex items-center">
                        <Calendar className="mr-2 h-4 w-4"/> Start Date & Time
                    </h2>
                    <p className="text-muted-foreground">
                        {format(new Date(startTime), 'MMMM d, yyyy - h:mm a')}
                    </p>
                </div>
                <div className="space-y-2">
                    <h2 className="font-semibold flex items-center">
                        <Clock className="mr-2 h-4 w-4"/> End Date & Time
                    </h2>
                    <p className="text-muted-foreground">
                        {format(new Date(endTime), 'MMMM d, yyyy - h:mm a')}
                    </p>
                </div>
            </div>
        </>
    )
}