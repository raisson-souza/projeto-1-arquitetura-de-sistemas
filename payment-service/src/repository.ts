import { PaymentOrder, PaymentOrderInput } from "./types"
import prisma from "./prisma"

type CreateProps = {
    paymentOrderModel: PaymentOrderInput
}

type GetProps = {
    id: number
}

type UpdateProps = {
    paymentOrderModel: PaymentOrder
}

type DeleteProps = GetProps

type ListProps = {}

export default abstract class Repository {
    static async Create({ paymentOrderModel }: CreateProps): Promise<PaymentOrder> {
        return await prisma.paymentOrder.create({
            data: {
                total: paymentOrderModel.total,
                orderId: paymentOrderModel.orderId,
                statusId: paymentOrderModel.statusId,
            },
        })
    }

    static async Get({ id }: GetProps): Promise<PaymentOrder | null> {
        return await prisma.paymentOrder.findFirst({
            where: { id: id, deleted: false },
        })
            .then(result => {
                if (result === null)
                    return null
                return result
            })
    }

    static async Update({ paymentOrderModel }: UpdateProps): Promise<PaymentOrder> {
        return await prisma.paymentOrder.update({
            where: { id: paymentOrderModel.id },
            data: { ...paymentOrderModel },
        })
    }

    static async Delete({ id }: DeleteProps): Promise<void> {
        await prisma.paymentOrder.update({
            where: { id: id },
            data: { deleted: true },
        })
    }

    static async List({}: ListProps): Promise<PaymentOrder[]> {
        return await prisma.paymentOrder.findMany({
            where: { deleted: false },
        })
    }
}
