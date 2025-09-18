import { CreateClient, GetClient, ListClient } from "./props/clients"
import CustomException from "../classes/CustomException"
import prisma from "../prisma"

export default abstract class ClientsService {
    static async Create(props: CreateClient) {
        await prisma.client.findMany({
            where: {
                email: props.email,
                AND: {
                    name: props.name,
                },
            },
            select: { id: true },
        })
            .then(result => {
                if (result.length > 0)
                    throw new CustomException(400, "Cliente com informações similares já cadastrado.")
            })

        return await prisma.client.create({
            data: {
                name: props.name,
                email: props.email,
            },
        })
    }

    static async Get(props: GetClient) {
        const client = await prisma.client.findUnique({
            where: {
                id: props.id,
            },
        })

        if (client === null)
            throw new CustomException(404, "Cliente não encontrado.")

        return client
    }

    static async List(_: ListClient) {
        return await prisma.client.findMany({
            orderBy: {
                id: "asc",
            },
        })
    }
}
