import { z } from "zod";

// Base Event Schema
const baseEventSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    description: z.string().max(500).optional(),
    startTime: z.string().datetime(),
    endTime: z.string().datetime(),
    fullDay: z.boolean().optional().default(false),
});

// Schemas for Create and Update
export const createEventSchema = baseEventSchema.refine(
    (data) => new Date(data.startTime) < new Date(data.endTime),
    { message: "End time must be after start time", path: ["endTime"] }
);

export const updateEventSchema = baseEventSchema.partial().refine(
    (data) => !data.startTime || !data.endTime || new Date(data.startTime) < new Date(data.endTime),
    { message: "End time must be after start time", path: ["endTime"] }
);

// DTO Types
export type CreateEventDTO = z.infer<typeof createEventSchema>;
export type UpdateEventDTO = z.infer<typeof updateEventSchema>;

// Event Response Type
export interface EventResponse {
    id: string;
    title: string;
    description?: string;
    startTime: Date;
    endTime: Date;
    userId: string;
    fullDay?: boolean;
    createdAt: Date;
    updatedAt: Date;
}
