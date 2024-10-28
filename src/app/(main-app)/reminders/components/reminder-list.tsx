'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { format } from 'date-fns'
import { getAllReminders } from '@/_actions/getAllReminders'
import { deleteReminder } from '@/_actions/deleteReminder'

type Reminder = {
    reminderId: string
    title: string
    description: string
    timestamp: string
    userId: string
}

export default function RemindersListComponent() {
    const [reminders, setReminders] = useState<Reminder[]>([])

    useEffect(() => {
        fetchReminders()
    }, [])

    const fetchReminders = async () => {
        try {
            const result = await getAllReminders()
            setReminders(result.reminders)
        } catch (error) {
            console.error('Failed to fetch reminders:', error)
        }
    }

    const handleDelete = async (reminderId: string) => {
        try {
            await deleteReminder(reminderId)
            setReminders(reminders.filter(reminder => reminder.reminderId !== reminderId))
        } catch (error) {
            console.error('Failed to delete reminder:', error)
        }
    }

    return (
        <div className="space-y-4">
            {reminders.map((reminder) => (
                <Card key={reminder.reminderId} className="hover:shadow-md transition-shadow">
                    <CardContent className="flex items-center justify-between p-4">
                        <div className="flex-grow">
                            <h3 className="text-lg font-semibold">{reminder.title}</h3>
                            <p className="text-sm text-muted-foreground">
                                Reminder set for: {format(new Date(parseInt(reminder.timestamp)), 'PPpp')}
                            </p>
                        </div>
                        <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDelete(reminder.reminderId)}
                            className="ml-4"
                        >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete reminder</span>
                        </Button>
                    </CardContent>
                </Card>
            ))}
            {reminders.length === 0 && (
                <p className="text-center text-muted-foreground">No reminders found.</p>
            )}
        </div>
    )
}