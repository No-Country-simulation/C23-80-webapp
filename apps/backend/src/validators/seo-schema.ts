import { z } from 'zod';
import { ImageObjectSchema } from './image-schema';

export const SeoSchema = z.object({
    title: z.string().min(3,{
        message: 'El título debe tener al menos 3 caracteres'
    }).max(255, {
        message: 'El título debe tener como máximo 255 caracteres'
    }),
    description: z.string().min(3, {
        message: 'La descripción debe tener al menos 3 caracteres'
    }).max(654, {
        message: 'La descripción debe tener como máximo 654 caracteres'
    }),
    image: ImageObjectSchema.optional(),
    keywords: z.array(z.string().min(3, {
        message: 'La palabra clave debe tener al menos 3 caracteres'
    }).max(255, {
        message: 'La palabra clave debe tener como máximo 255 caracteres'
    }))
});