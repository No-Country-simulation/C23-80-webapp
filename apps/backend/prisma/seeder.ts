import { PrismaClient } from "@prisma/client";
import { users, users as usrs } from "./def-users";

const prisma = new PrismaClient();

async function main() {
    const [
        categories, 
        resources, 
        users, 
        collections
    ] = await prisma.$transaction(
        async (prisma) => {
            const users = await prisma.user.createMany({ data: usrs.map(user => ({
                ...user,
                role: user.role as "ADMIN" | "USER",
                profile: {
                    create: {}
                }
            })) });
            const categories = await prisma.skillCategory.createMany()
            const resources = await prisma.skill.createMany()
            const collections = await prisma.skillCollection.createMany()

            return [
                categories, 
                resources, 
                users, 
                collections
            ]
        }
    );
    console.log({ 
        categories, 
        resources, 
        users, 
        collections 
    })
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })