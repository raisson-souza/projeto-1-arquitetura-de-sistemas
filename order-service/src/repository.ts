import { NotFoundException } from "./customException"
import { Order, OrderInput, OrderStatusTypesEnum, Product } from "./types"
import { OrderModel } from "./mongoose"

type CreateProps = {
    orderModel: OrderInput
}

type GetProps = {
    id: string
}

type UpdateProps = {
    orderModel: Order
}

type DeleteProps = GetProps

type ListProps = {}

export default abstract class Repository {
    static async Create({ orderModel }: CreateProps): Promise<Order> {
        const orderId = new Date().getTime()

        return await OrderModel.insertOne({
            ...orderModel,
            id: orderId,
            status: OrderStatusTypesEnum.Open,
        })
            .then(result => this.parseOrder(result))
    }

    static async Get({ id }: GetProps): Promise<Order | null> {
        return await OrderModel.findById(id, { deleted: false })
            .then(result => {
                if (result.deleted)
                    return null
                return this.parseOrder(result)
            })
            .catch(ex => {
                if ((ex as Error).message === 'Cast to ObjectId failed for value "adfssvwv" (type string) at path "_id" for model "Order"')
                    throw new NotFoundException()
                throw new Error((ex as Error).message)
            })
    }

    static async Update({ orderModel }: UpdateProps): Promise<Order> {
        return OrderModel.findOneAndUpdate(
            {
                _id: orderModel.id,
                deleted: false,
            },
            { ...orderModel },
            { returnDocument: "after" }
        )
            .then(result => this.parseOrder(result))
    }

    static async Delete({ id }: DeleteProps): Promise<void> {
        await OrderModel.findOneAndUpdate(
            { _id: id },
            { deleted: true },
        )
    }

    static async List({}: ListProps): Promise<Order[]> {
        return await OrderModel.find({ deleted: false })
            .then(result => result.map(r => this.parseOrder(r)))
    }

    private static parseOrder(result: any): Order {
        return {
            id: result["_id"].toString(),
            clientId: result["clientId"],
            status: result["status"],
            total: result["total"],
            products: result["products"] as Product[],
            deleted: result["deleted"],
            createdAt: result["createdAt"],
        }
    }
}
