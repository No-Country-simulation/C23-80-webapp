import { PrismaClient } from "@prisma/client";
import { users as usrs } from "./def-users";
import { categories, categories as cats, resources as resours } from "./initial-data";

const prisma = new PrismaClient();

async function main() {
    /* const [
        //categories,
        resources, 
        //users, 
        //collections
    ] = await prisma.$transaction(
        async (prisma) => {
            const users = await prisma.user.createMany({ data: usrs.map(user => ({
                ...user,
                role: user.role as "ADMIN" | "USER",
                profile: {
                    create: {}
                }
            })) });
            //const categories = await prisma.skillCategory.createMany({
            //    data: cats.map(cat => ({
            //        ...cat,
            //        featuredImage: cat.featuredImage,
            //        handle: createSlug(cat.title)
            //    }))
            //})
            const resources = {categories: {count: 0}};
            for(const res of resours) {
                const handle = createSlug(res.title);
                await prisma.skill.upsert({
                    where: { handle },
                    update: {
                        ...res,
                        categories: {
                            connect: res.categories.map(cat => ({ id: cat }))
                        }
                    },
                    create: {
                        ...res,
                        handle,
                        categories: {
                            connect: res.categories.map(cat => ({ id: cat }))
                        }
                    }
                });
                resources.categories.count++;
            }
            //const collections = await prisma.skillCollection.createMany()

            return [
                //categories,
                resources, 
                //users, 
                //collections
            ]
        },
        { timeout: 10000 }
    );
    console.log({
        //categories,
        resources, 
        //users, 
        //collections 
    }) */
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })


/**
 * Crea un slug a partir de un nombre.
 * @param name Nombre a convertir en slug.
 * @returns El slug generado.
 */
export function createSlug(name: string): string | undefined {
    try {
        return name
            .toLowerCase() // Convierte a minúsculas
            .normalize("NFD") // Normaliza los caracteres a su forma más simple
            .replace(/[\u0300-\u036f]/g, "") // Elimina diacríticos
            .replace(/&/g, 'y') // Reemplaza la & por 'y'
            .replace(/ñ/g, "n") // Reemplaza la ñ por 'n'
            .trim() // Elimina espacios al inicio y al final
            .replace(/[^a-z0-9\s]/g, '') // Elimina caracteres no alfanuméricos (excepto espacios)
            .replace(/\s+/g, '-') // Reemplaza los espacios por guiones
            .replace(/^-+|-+$/g, ''); // Elimina guiones al inicio y al final
    } catch (error) {
        return undefined;
    }
}