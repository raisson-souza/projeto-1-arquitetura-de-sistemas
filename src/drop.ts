import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient()

const dropDb = async () => {
    await prisma.$executeRaw`DROP TABLE product_orders`
        .then(() => console.log("product_orders DROPADA"))
        .catch(() => console.log("product_orders JÁ DROPADA"))

    await prisma.$executeRaw`DROP TABLE orders`
        .then(() => console.log("orders DROPADA"))
        .catch(() => console.log("orders JÁ DROPADA"))

    await prisma.$executeRaw`DROP TABLE products`
        .then(() => console.log("products DROPADA"))
        .catch(() => console.log("products JÁ DROPADA"))

    await prisma.$executeRaw`DROP TABLE _prisma_migrations`
        .then(() => console.log("_prisma_migrations DROPADA"))
        .catch(() => console.log("_prisma_migrations JÁ DROPADA"))
}

dropDb()
