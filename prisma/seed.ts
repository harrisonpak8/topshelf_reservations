import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const userData = [
    {
        id: 'user1',
        email: 'user1@example.com',
        password: 'password123',
        orders: 'order1',
    },
    {
        id: 'user2',
        email: 'user2@example.com',
        password: 'password123',
        orders: 'order2',
    },
    {
        id: 'user3',
        email: 'user3@example.com',
        password: 'password123',
        orders: 'order3',
    },
];

async function main() {
    console.log(`Start seeding ...`);
    for (const u of userData) {
        const hashedPassword = await bcrypt.hash(u.password, 10);
        // create user if not exists
        const user = await prisma.user.upsert({
            where: { email: u.email },
            create: {
                id: u.id,
                email: u.email,
                password: hashedPassword,
                orders: u.orders,
            },
            update: {},
        });
        console.log(`Upserted User with email: ${user.email}`);
    }
    console.log(`Seeding finished.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });