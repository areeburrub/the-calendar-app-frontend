
import { NextResponse } from 'next/server';
import EventService from "@/services/event.service";

export async function GET(
    request: Request,
    { params }: { params: { eventId: string } }
) {
    const { eventId } = params;
    const eventService = new EventService();

    try {

        await eventService.deleteEvent(eventId);


        return NextResponse.redirect(new URL('/events', request.url));
    } catch (error) {

        console.error('Error deleting event:', error);
        return NextResponse.json({ message: 'Failed to delete event' }, { status: 500 });
    }
}
