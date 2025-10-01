import { ClientException, DeletedResourceException, NotFoundException } from "./customException"
import { PaymentOrder, PaymentOrderInput } from "./types"
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

export default abstract class Service {
    static async Create({ paymentOrderModel }: CreateProps): Promise<PaymentOrder> {
        if (paymentOrderModel.statusId < 1 || paymentOrderModel.statusId > 4)
            throw new ClientException("Tipo de status inválido.")

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
}
