'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertCircle, Plus, Trash, Edit2 } from "lucide-react"
import ReminderService from "@/services/reminder.service"
import {addReminder} from "@/_actions/addReminder";

type Reminder = {
    id?: string
    title: string
    description: string
    timestamp: number
    timeValue: number
    timeUnit: 'minutes' | 'hours' | 'days'
}

type EventReminderProps = {
    eventId: string
    eventTitle: string
    eventStartTime: number
}

export default function AddReminderBtn({ eventId, eventTitle, eventStartTime }: EventReminderProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [reminders, setReminders] = useState<Reminder[]>([])
    const [timeValue, setTimeValue] = useState('')
    const [timeUnit, setTimeUnit] = useState<'minutes' | 'hours' | 'days'>('minutes')
    const [editingReminderId, setEditingReminderId] = useState<string | null | undefined>(null)

    const handleAddReminder = () => {
        if (!timeValue) return

        const time = parseInt(timeValue)
        let milliseconds = 0

        switch (timeUnit) {
            case 'minutes':
                milliseconds = time * 60 * 1000
                break
            case 'hours':
                milliseconds = time * 60 * 60 * 1000
                break
            case 'days':
                milliseconds = time * 24 * 60 * 60 * 1000
                break
        }

        const newReminder: Reminder = {
            id: Date.now().toString(), // Temporary ID for frontend use
            title: `Reminder for ${eventTitle}`,
            description: `Event starts in ${timeValue} ${timeUnit}`,
            timestamp: eventStartTime - milliseconds,
            timeValue: time,
            timeUnit: timeUnit
        }

        if (editingReminderId) {
            setReminders(reminders.map(r => r.id === editingReminderId ? newReminder : r))
            setEditingReminderId(null)
        } else {
            setReminders([...reminders, newReminder])
        }
        setTimeValue('')
        setTimeUnit('minutes')
    }

    const handleEdit = (reminder: Reminder) => {
        setTimeValue(reminder.timeValue.toString())
        setTimeUnit(reminder.timeUnit)
        setEditingReminderId(reminder.id)
    }

    const handleDelete = (id: string) => {
        setReminders(reminders.filter(r => r.id !== id))
        if (editingReminderId === id) {
            setEditingReminderId(null)
            setTimeValue('')
            setTimeUnit('minutes')
        }
    }

    const handleSave = async () => {
        for (const reminder of reminders) {
            await addReminder(reminder)
        }
        setIsOpen(false)
    }

    const handleCancel = () => {
        setIsOpen(false)
        setReminders([])
        setEditingReminderId(null)
        setTimeValue('')
        setTimeUnit('minutes')
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Add Reminder
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Reminders for {eventTitle}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex items-center gap-4">
                        <Input
                            type="number"
                            placeholder="Time"
                            value={timeValue}
                            onChange={(e) => setTimeValue(e.target.value)}
                            className="w-24"
                        />
                        <Select value={timeUnit} onValueChange={(value: 'minutes' | 'hours' | 'days') => setTimeUnit(value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select unit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="minutes">Minutes</SelectItem>
                                <SelectItem value="hours">Hours</SelectItem>
                                <SelectItem value="days">Days</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button onClick={handleAddReminder} size="sm">
                            {editingReminderId ? <Edit2 className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        </Button>
                    </div>
                    <div className="space-y-2">
                        {reminders.map((reminder) => (
                            <div key={reminder.id} className="flex items-center justify-between text-sm">
                <span>
                  Notification {reminder.timeValue} {reminder.timeUnit} Before
                </span>
                                <div>
                                    <Button variant="ghost" size="sm" onClick={() => handleEdit(reminder)}>
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => handleDelete(reminder.id!)}>
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleSave}>Save Reminders</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}