import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const [categories, resources, users, collections] = await prisma.$transaction(
        async (prisma) => {
            const categories = await prisma.skillCategory.createMany()
            const resources = await prisma.skill.createMany()
            const users = await prisma.user.createMany()
            const collections = await prisma.skillCollection.createMany()

            return [categories, resources, users, collections]
        }
    );
    console.log({ categories, resources, users, collections })
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })