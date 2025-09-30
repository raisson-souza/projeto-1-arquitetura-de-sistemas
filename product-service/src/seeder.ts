import { PrismaClient } from '../generated/prisma'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

const seedDb = async () => {
    await prisma.product.createMany({
        data: [
            {
                name: "Notebook Samsung Odyssey",
                price: 5000,
                stock: 5,
            },
            {
                name: "Teclado Mecânico Redragon",
                price: 200,
                stock: 10,
            },
            {
                name: "Mouse Gamer",
                price: 100,
                stock: 5,
            },
            {
                name: "Headseat Gamer Anti-ruído",
                price: 300,
                stock: 1,
            },
        ]
    })
        .then(() => console.log("Produtos criados."))
        .catch(ex => console.log(`Erro em produtos. Erro: ${ (ex as Error).message }`))
}

seedDb()
