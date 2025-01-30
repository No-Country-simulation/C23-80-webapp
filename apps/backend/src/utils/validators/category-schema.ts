import { z } from 'zod';

export const CategorySchema = z.object({
    title: z.string().min(3).max(255),
    description: z.string().min(3).max(255),
    featuredImage: z.string().optional()
})