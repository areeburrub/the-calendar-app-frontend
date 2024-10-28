'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {AlertCircle, Loader, LoaderCircle, Trash} from "lucide-react"
import Link from "next/link"
import {deleteEvent} from "@/_actions/deleteEvent";
import {useRouter} from "next/navigation";
import {toast} from "@/hooks/use-toast";

interface EventDeleteConfirmationProps {
    eventId: string
}

export default function DeleteEventButton({ eventId }: EventDeleteConfirmationProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const router = useRouter()

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open)
    }

    const handleCancel = () => {
        setIsOpen(false)
    }

    return (
        <Popover open={isOpen} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
                <Button variant="destructive" size="sm">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none flex items-center">
                            <AlertCircle className="mr-2 h-4 w-4 text-destructive" />
                            Confirm Deletion
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            Are you sure you want to delete this event? This action cannot be undone.
                        </p>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={async () => {
                                setIsDeleting(true)
                                await deleteEvent(eventId)
                                setIsOpen(false)
                                toast({
                                    title: "Event Deleted Successfully"
                                })
                                router.push("/events")
                            }}>
                            Delete
                            {
                                isDeleting &&
                                <LoaderCircle className={"animate-spin"}/>
                            }
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}