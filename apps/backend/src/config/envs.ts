import "dotenv/config";
import { z } from 'zod';

const envSchema = z.object({
    PORT: z.string().refine((value) => !isNaN(parseInt(value)), {
        message: 'PORT must be a number',
    }),
    DATABASE_URL: z.string()
});

const validatedData = envSchema.safeParse(process.env);

if (validatedData.error) {
    throw new Error(`Invalid environment variables: ${validatedData.error.errors[0].message}`);
}

export const envs = validatedData.data;