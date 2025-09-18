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

    await prisma.orderStatus.createMany({
        data: [
            {
                id: 1,
                description: "aguardando pagamento",
            },
            {
                id: 2,
                description: "falha no pagamento",
            },
            {
                id: 3,
                description: "cancelado",
            },
            {
                id: 4,
                description: "pago",
            },
        ]
    })
        .then(() => console.log("Status de ordens semeados com sucesso"))
        .catch(ex => console.log(`Erro ao semear status de ordens. Erro: ${ (ex as Error).message }`))

    await prisma.client.createMany({
        data: [
            {
                name: "Usuário",
                email: "usuario@email.com",
            },
        ]
    })
        .then(() => console.log("Clientes semeados com sucesso"))
        .catch(ex => console.log(`Erro ao semear clientes. Erro: ${ (ex as Error).message }`))

    await prisma.paymentMethod.createMany({
        data: [
            {
                id: 1,
                description: "dinheiro",
            },
            {
                id: 2,
                description: "boleto",
            },
            {
                id: 3,
                description: "cartão de crédito",
            },
        ]
    })
        .then(() => console.log("Métodos de pagamento semeados com sucesso"))
        .catch(ex => console.log(`Erro ao semear métodos de pagamento. Erro: ${ (ex as Error).message }`))
}

seedDb()
