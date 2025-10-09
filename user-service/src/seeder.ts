import { PrismaClient } from '../generated/prisma'
import dotenv from 'dotenv'

dotenv.config();

const prisma = new PrismaClient()

const seedDb = async () => {
    const seedUserTypes = (await prisma.userType.findMany()).length === 0

    if (seedUserTypes) {
        await prisma.userType.createMany({
            data: [
                {
                    id: 1,
                    description: "administrador",
                },
                {
                    id: 2,
                    description: "client",
                },
                {
                    id: 3,
                    description: "vendedor",
                },
            ]
        })
            .then(() => console.log("Tipos de usuários criados."))
            .catch(ex => console.log(`Erro em tipos de usuários. Erro: ${ (ex as Error).message }`))
    }

    const seedUsers = (await prisma.user.findMany()).length === 0

    if (seedUsers) {
        await prisma.user.createMany({
            data: [
                {
                    id: 1,
                    name: "Administrador",
                    email: "administrador@gmail.com",
                    typeId: 1,
                },
            ]
        })
            .then(() => console.log("Usuários criados."))
            .catch(ex => console.log(`Erro em usuários. Erro: ${ (ex as Error).message }`))
    }
}

seedDb()
