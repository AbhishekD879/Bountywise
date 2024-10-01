import { z } from "zod";

export const bountySchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title must be 100 characters or less"),
    description: z.string().min(50, "Description must be at least 50 characters"),
    tags: z.array(z.string()).min(1, "At least one tag is required"),
    communicationMethod: z.enum(['video', 'audio', 'chat']),
    budget: z.number().nullable(),
    currency: z.string(),
    deadline: z.date().optional(),
    attachments: z.array(z.object({
      name: z.string(),
      size: z.number(),
      type: z.string(),
    })).optional(),
  })