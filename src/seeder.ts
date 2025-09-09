import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient()

const seedDb = async () => {
    await prisma.product.createMany({
        data: [
            {
                name: "Cadeira",
                price: 15,
                stock: 20,
            },
            {
                name: "Mesa",
                price: 30,
                stock: 1,
            },
            {
                name: "Prato",
                price: 10,
                stock: 50,
            },
            {
                name: "Copo",
                price: 5,
                stock: 120,
            },
            {
                name: "Faca",
                price: 3,
                stock: 200,
            },
        ]
    })
        .then(() => console.log("Produtos semeados com sucesso"))
        .catch(ex => console.log(`Erro ao semear produtos. Erro: ${ (ex as Error).message }`))

    await prisma.order.createMany({
        data: [
            // 2 cadeiras
            { total: 30 },
            // 1 copo e uma faca
            { total: 8 },
        ]
    })
        .then(() => console.log("Ordens semeados com sucesso"))
        .catch(ex => console.log(`Erro ao semear ordens. Erro: ${ (ex as Error).message }`))

    await prisma.productOrder.createMany({
        data: [
            {
                orderId: 1,
                productId: 1,
                quantity: 2,
                value: 30,
            },
            {
                orderId: 2,
                productId: 4,
                quantity: 1,
                value: 5,
            },
            {
                orderId: 2,
                productId: 5,
                quantity: 1,
                value: 3,
            },
        ]
    })
        .then(() => console.log("Ordens x Pedidos semeados com sucesso"))
        .catch(ex => console.log(`Erro ao semear ordens x pedidos. Erro: ${ (ex as Error).message }`))
}

seedDb()
