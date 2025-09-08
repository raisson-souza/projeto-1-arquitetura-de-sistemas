import { CreateOrder, DeleteOrder, GetOrder, ListOrders, PutOrder } from "./props/orders"
import CustomException from "../classes/CustomException"
import prisma from "../prisma"

export default abstract class OrdersService {
    static async Create(props: CreateOrder) {
        throw new CustomException(500, "Método não implementado.")
        // return await prisma.order.create({
        //     data: {
        //         ...props,
        //     },
        // })
    }

    static async Get(props: GetOrder) {
        throw new CustomException(500, "Método não implementado.")
        return await prisma.order.findUnique({
            where: {
                id: props.id,
            },
        })
    }

    static async Put(props: PutOrder) {
        throw new CustomException(500, "Método não implementado.")
        return await prisma.order.update({
            data: {
                ...props,
            },
            where: {
                id: props.id,
            },
        })
    }

    static async Delete(props: DeleteOrder) {
        throw new CustomException(500, "Método não implementado.")
        return await prisma.order.delete({
            where: {
                id: props.id,
            },
        })
    }

    static async List(_: ListOrders) {
        throw new CustomException(500, "Método não implementado.")
        return await prisma.order.findMany({
            orderBy: {
                id: "asc",
            },
        })
    }
}
