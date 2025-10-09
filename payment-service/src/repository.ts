import { Payment, PaymentMethod, PaymentOrder, PaymentOrderInput } from "./types"
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

type ListMethodsProps = {}

export default abstract class Repository {
    static async Create({ paymentOrderModel }: CreateProps): Promise<PaymentOrder> {
        let paymentOrder: PaymentOrder | null = null

        await prisma.$transaction(async (trx) => {
            paymentOrder = await trx.paymentOrder.create({
                data: {
                    total: paymentOrderModel.total,
                    orderId: paymentOrderModel.orderId,
                    statusId: 1,
                },
            })
                .then(result => {
                    return {
                        ...result,
                        payments: [],
                    }
                })

            await trx.payment.createMany({
                data: paymentOrderModel.payments.map(p => {
                    return {
                        ...p,
                        paymentOrderId: paymentOrder.id,
                    }
                }),
            })
        })

        paymentOrder.payments = await prisma.payment.findMany({
            where: { paymentOrderId: paymentOrder.id }
        })

        return paymentOrder
    }

    static async Get({ id }: GetProps): Promise<PaymentOrder | null> {
        return await prisma.paymentOrder.findFirst({
            where: { id: id, deleted: false },
            include: { payments: true },
        })
            .then(async (result) => {
                return result != null
                    ? result
                    : null
            })
    }

    static async Update({ paymentOrderModel }: UpdateProps): Promise<PaymentOrder> {
        let paymentOrder: PaymentOrder | null = null

        await prisma.$transaction(async (trx) => {
            paymentOrder = await prisma.paymentOrder.update({
                where: { id: paymentOrderModel.id },
                data: {
                    id: paymentOrderModel.id,
                    total: paymentOrderModel.total,
                    orderId: paymentOrderModel.orderId,
                    statusId: paymentOrderModel.statusId,
                    createdAt: paymentOrderModel.createdAt,
                    deleted: paymentOrderModel.deleted,
                },
            })
                .then(result => {
                    return {
                        ...result,
                        payments: [],
                    }
                })

            for (const payment of paymentOrderModel.payments) {
                trx.payment.update({
                    data: { ...payment },
                    where: { id: payment.id },
                })
            }
        })

        paymentOrder.payments = await prisma.payment.findMany({
            where: { paymentOrderId: paymentOrderModel.id },
        })

        return paymentOrder
    }

    static async Delete({ id }: DeleteProps): Promise<void> {
        await prisma.paymentOrder.update({
            where: { id: id },
            data: { deleted: true },
        })

        await prisma.payment.updateMany({
            data: { deleted: true },
            where: { paymentOrderId: id },
        })
    }

    static async List({}: ListProps): Promise<PaymentOrder[]> {
        return await prisma.paymentOrder.findMany({
            where: { deleted: false },
            include: { payments: true }
        })
    }

    static async ListMethods({}: ListMethodsProps): Promise<PaymentMethod[]> {
        return await prisma.paymentMethod.findMany({})
    }
}
