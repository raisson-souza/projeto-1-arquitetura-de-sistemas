import { ClientException, DeletedResourceException, NotFoundException } from "./customException"
import { PaymentMethod, PaymentOrder, PaymentOrderInput } from "./types"
import Repository from "./repository"

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

type ApprovePaymentOrderProps = GetProps

export default abstract class Service {
    static async Create({ paymentOrderModel }: CreateProps): Promise<PaymentOrder> {
        if (paymentOrderModel.total as unknown as number < 0)
            throw new ClientException("Valor de pagamento inválido.")

        return await Repository.Create({ paymentOrderModel })
    }

    static async Get({ id }: GetProps): Promise<PaymentOrder | null> {
        const paymentOrder = await Repository.Get({ id })

        if (paymentOrder === null)
            throw new NotFoundException()

        if (paymentOrder.deleted)
            throw new DeletedResourceException()

        return paymentOrder
    }

    static async Update({ paymentOrderModel }: UpdateProps): Promise<PaymentOrder> {
        const paymentOrder = await Repository.Get({ id: paymentOrderModel.id })

        if (paymentOrder === null)
            throw new NotFoundException()

        if (paymentOrder.deleted)
            throw new DeletedResourceException()

        return await Repository.Update({ paymentOrderModel })
    }

    static async Delete({ id }: DeleteProps): Promise<void> {
        const paymentOrder = await Repository.Get({ id })

        if (paymentOrder === null)
            throw new NotFoundException()

        if (paymentOrder.deleted)
            throw new DeletedResourceException()

        await Repository.Delete({ id })
    }

    static async List({}: ListProps): Promise<PaymentOrder[]> {
        return await Repository.List({})
    }

    static async ListMethods({}: ListProps): Promise<PaymentMethod[]> {
        return await Repository.ListMethods({})
    }

    static async ApprovePaymentOrder({ id }: ApprovePaymentOrderProps): Promise<void> {
        const paymentOrder = await this.Get({ id: id })
        const now = new Date().getTime().toString()
        const approved = Number.parseInt(now[now.length - 1]) > 5
        await Repository.Update({
            paymentOrderModel: {
                ...paymentOrder,
                statusId: approved ? 2 : 3,
            }
        })
    }
}
