"use client"

import React, {useState} from "react"
import {ChevronLeft, ChevronRight} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {EventResponse} from "@/types/event.type";
import {useRouter} from "next/navigation";



const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

interface CalendarHeaderProps {
    currentDate: Date
    view: "week" | "month"
    onDateChange: (date: Date) => void
    onViewChange: (view: "week" | "month") => void
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({currentDate, view, onDateChange, onViewChange}) => {
    const handlePrevious = () => {
        const newDate = new Date(currentDate)
        if (view === "week") {
            newDate.setDate(newDate.getDate() - 7)
        } else {
            newDate.setMonth(newDate.getMonth() - 1)
        }
        onDateChange(newDate)
    }

    const handleNext = () => {
        const newDate = new Date(currentDate)
        if (view === "week") {
            newDate.setDate(newDate.getDate() + 7)
        } else {
            newDate.setMonth(newDate.getMonth() + 1)
        }
        onDateChange(newDate)
    }

    return (
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" onClick={handlePrevious}>
                    <ChevronLeft className="h-4 w-4"/>
                </Button>
                <Button variant="outline" size="icon" onClick={handleNext}>
                    <ChevronRight className="h-4 w-4"/>
                </Button>
                <h2 className="text-xl font-semibold">
                    {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
            </div>
            <Select value={view} onValueChange={(value: "week" | "month") => onViewChange(value)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select view"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="month">Month</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

interface WeeklyViewProps {
    currentDate: Date
    events: EventResponse[]
    onEventClick: (eventId: string, eventTitle: string) => void
}

const WeeklyView: React.FC<WeeklyViewProps> = ({currentDate, events, onEventClick}) => {
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

    const weekDays = Array.from({length: 7}, (_, i) => {
        const day = new Date(startOfWeek)
        day.setDate(startOfWeek.getDate() + i)
        return day
    })

    const hours = Array.from({length: 24}, (_, i) => i)

    const getFullDayEvents = (day: Date) => {
        return events.filter(event =>
            event.fullDay &&
            new Date(event.startTime).toDateString() === day.toDateString()
        )
    }

    const getRegularEvents = (day: Date) => {
        return events.filter(event =>
            !event.fullDay &&
            new Date(event.startTime).toDateString() === day.toDateString()
        )
    }

    return (
        <div className="flex flex-col h-full">
            <div className="grid grid-cols-8 gap-1 border-b">
                <div className="col-span-1 h-18"></div>
                {weekDays.map((day, index) => (
                    <div key={index} className="col-span-1 h-18 font-semibold text-center flex flex-col justify-center">
                        <div>{daysOfWeek[day.getDay()]}</div>
                        <div>{day.getDate()}</div>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-8 gap-1 border-b">
                <div className="col-span-1 h-6"></div>
                {weekDays.map((day, index) => (
                    <div key={index} className="col-span-1 h-6 overflow-hidden">
                        {getFullDayEvents(day).map(event => (
                            <div
                                key={event.id}
                                className="bg-blue-200 text-xs p-1 mb-1 truncate cursor-pointer hover:bg-blue-300"
                                title={event.title}
                                onClick={() => onEventClick(event.id, event.title)}
                            >
                                {event.title}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="flex-grow overflow-y-auto">
                <div className="grid grid-cols-8 gap-1 relative"
                     style={{height: "1440px"}}> {/* 24 hours * 60px per hour */}
                    <div className="col-span-1">
                        {hours.map((hour) => (
                            <div key={hour}
                                 className="h-[60px] border-t flex items-start justify-end pr-2 text-xs text-gray-500">
                                {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                            </div>
                        ))}
                    </div>
                    {weekDays.map((day, dayIndex) => (
                        <div key={dayIndex} className="col-span-1 relative">
                            {hours.map((hour) => (
                                <React.Fragment key={hour}>
                                    <div className="absolute w-full h-[30px] border-t border-gray-200"
                                         style={{top: `${hour * 60}px`}}></div>
                                    <div className="absolute w-full h-[30px] border-t border-gray-100"
                                         style={{top: `${hour * 60 + 30}px`}}></div>
                                </React.Fragment>
                            ))}
                            {getRegularEvents(day).map(event => {
                                const startMinutes = new Date(event.startTime).getHours() * 60 + new Date(event.startTime).getMinutes()
                                const endMinutes = new Date(event.endTime).getHours() * 60 + new Date(event.endTime).getMinutes()
                                const top = startMinutes
                                const height = endMinutes - startMinutes
                                return (
                                    <div
                                        key={event.id}
                                        className="absolute w-full bg-blue-100 p-1 rounded text-xs overflow-hidden z-10 cursor-pointer hover:bg-blue-200"
                                        style={{
                                            top: `${top}px`,
                                            height: `${height}px`,
                                        }}
                                        onClick={() => onEventClick(event.id, event.title)}
                                    >
                                        {event.title}
                                    </div>
                                )
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

interface MonthlyViewProps {
    currentDate: Date
    events: EventResponse[]
    onEventClick: (eventId: string, eventTitle: string) => void
}

const MonthlyView: React.FC<MonthlyViewProps> = ({currentDate, events, onEventClick}) => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
    const startDate = new Date(firstDayOfMonth)
    startDate.setDate(startDate.getDate() - startDate.getDay())

    const days = []
    let day = new Date(startDate)

    while (day <= lastDayOfMonth || days.length % 7 !== 0) {
        days.push(new Date(day))
        day.setDate(day.getDate() + 1)
    }

    return (
        <>
            <div className="grid grid-cols-7 gap-1 h-fit">
            {daysOfWeek.map(day => (
                <div key={day}
                     className="font-semibold text-center p-4 h-fit items-center justify-center">{day}</div>
            ))}
            </div>
            <div className="grid grid-cols-7 gap-1 max-h-[75vh] h-full">
                {days.map((day, index) => (
                    <div key={index}
                         className={`border p-2 overflow-hidden ${day.getMonth() !== currentDate.getMonth() ? 'bg-gray-100' : ''}`}>
                        <div className="font-semibold mb-1">{day.getDate()}</div>
                        {events
                            .filter(event => new Date(event.startTime).toDateString() === day.toDateString())
                            .slice(0, 5) // Limit to 5 events per day
                            .map(event => (
                                <div
                                    key={event.id}
                                    className={`p-1 mb-1 rounded text-xs truncate cursor-pointer ${event.fullDay ? 'bg-blue-200 hover:bg-blue-300' : 'bg-blue-100 hover:bg-blue-200'}`}
                                    onClick={() => onEventClick(event.id, event.title)}
                                >
                                    {event.title}
                                </div>
                            ))}
                        {events.filter(event => new Date(event.startTime).toDateString() === day.toDateString()).length > 3 && (
                            <div className="text-xs text-gray-500">+ more</div>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}

export function CalendarComponent({all_events}: {
    all_events: EventResponse[]
    }) {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [view, setView] = useState<"week" | "month">("month")
    const [events, setEvents] = useState<EventResponse[]>(all_events || [])

    const handleDateChange = (date: Date) => {
        setCurrentDate(date)
        setEvents(all_events)
    }

    const router = useRouter()

    const handleEventClick = (eventId: string) => {
        router.push(`/events/${eventId}`)
    }

    return (
        <div className="container mx-auto p-4 h-full flex flex-col">
            <CalendarHeader
                currentDate={currentDate}
                view={view}
                onDateChange={handleDateChange}
                onViewChange={setView}
            />
            <div className="flex-grow overflow-hidden">
                {view === "week" ? (
                    <WeeklyView currentDate={currentDate} events={events} onEventClick={handleEventClick}/>
                ) : (
                    <MonthlyView currentDate={currentDate} events={events} onEventClick={handleEventClick}/>
                )}
            </div>
        </div>
    )
}