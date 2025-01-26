import { z } from 'zod';

export const ImageObjectSchema = z.object({
    secure_url: z.string().url({message: 'La url de la imagen no es válida'}),
    public_id: z.string(),
    altText: z.string().min(3,{
        message: 'El texto alternativo de la imagen debe tener al menos 3 caracteres'
    }).max(255, {
        message: 'El texto alternativo de la imagen debe tener como máximo 255 caracteres'
    }),
    width: z.number().int().positive(),
    height: z.number().int().positive()
});