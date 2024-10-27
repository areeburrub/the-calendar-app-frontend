import {z} from "zod";
import {format, parse} from "date-fns";

const baseEventSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    description: z.string().max(500).optional(),
    startDate: z.date(),
    endDate: z.date(),
    startTime: z.string().regex(/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/),
    endTime: z.string().regex(/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/),
    fullDay: z.boolean().default(false),
});

export const createEventSchema = baseEventSchema.refine(
    (data) => {
        if (data.fullDay) return true;
        const start = parse(`${format(data.startDate, 'yyyy-MM-dd')} ${data.startTime}`, 'yyyy-MM-dd hh:mm a', new Date());
        const end = parse(`${format(data.endDate, 'yyyy-MM-dd')} ${data.endTime}`, 'yyyy-MM-dd hh:mm a', new Date());
        return start < end;
    },
    {message: "End time must be after start time", path: ["endTime"]}
);

export const updateEventSchema = baseEventSchema.refine(
    (data) => {
        if (data.fullDay) return true;
        const start = parse(`${format(data.startDate, 'yyyy-MM-dd')} ${data.startTime}`, 'yyyy-MM-dd hh:mm a', new Date());
        const end = parse(`${format(data.endDate, 'yyyy-MM-dd')} ${data.endTime}`, 'yyyy-MM-dd hh:mm a', new Date());
        return !start || !end || start < end;
    },
    {message: "End time must be after start time", path: ["endTime"]}
);
