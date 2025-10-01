import { PrismaClient } from '../generated/prisma'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

const seedDb = async () => {
    await prisma.paymentOrderStatus.createMany({
        data: [
            {
                id: 1,
                description: "Em Aberto",
            },
            {
                id: 2,
                description: "Finalizado",
            },
            {
                id: 3,
                description: "Cancelado",
            },
            {
                id: 4,
                description: "Reembolsado",
            },
        ]
    })
        .then(() => console.log("Status de Pedidos de Pagamento criados."))
        .catch(ex => console.log(`Erro em status de pedidos de pagamento. Erro: ${ (ex as Error).message }`))

    await prisma.paymentStatus.createMany({
        data: [
            {
                id: 1,
                description: "Em Aberto",
            },
            {
                id: 2,
                description: "Finalizado",
            },
            {
                id: 3,
                description: "Cancelado",
            },
            {
                id: 4,
                description: "Reembolsado",
            },
            {
                id: 5,
                description: "Aguardando Confirmação Externa",
            },
            {
                id: 6,
                description: "Erro",
            },
            {
                id: 7,
                description: "Recusado",
            },
        ]
    })
        .then(() => console.log("Status de Pagamentos criados."))
        .catch(ex => console.log(`Erro em status de pagamentos. Erro: ${ (ex as Error).message }`))

    await prisma.paymentMethod.createMany({
        data: [
            {
                id: 1,
                description: "Dinheiro",
            },
            {
                id: 2,
                description: "Cartão de Débito",
            },
            {
                id: 3,
                description: "Cartão de Crédito",
            },
            {
                id: 4,
                description: "Boleto",
            },
            {
                id: 5,
                description: "Pix",
            },
        ]
    })
        .then(() => console.log("Métodos de pagamento criados."))
        .catch(ex => console.log(`Erro em métodos de pagamento. Erro: ${ (ex as Error).message }`))
}

seedDb()
