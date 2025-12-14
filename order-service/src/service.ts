import { ClientException, DeletedResourceException, NotFoundException } from "./customException"
import { Order, OrderInput, Product } from "./types"
import { productService, userService } from "./webhook"
import Repository from "./repository"
import { KafkaClient, QueueClient } from "."

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

export default abstract class Service {
    static async Create({ orderModel }: CreateProps): Promise<Order> {
        this.ValidateOrderProducts(orderModel.products)

        if (orderModel.total < 0)
            throw new ClientException("Total do pedido não pode ser negativo.")

        if (orderModel.products.length <= 0)
            throw new ClientException("Produtos de pedido inválidos.")

        const clientResponse = await userService.get(orderModel.clientId)

        if (clientResponse === null)
            throw new ClientException("Cliente não encontrado.")

        let total = 0

        for (const product of orderModel.products) {
            const productResponse = await productService.get(product.id)

            if (productResponse === null)
                throw new ClientException(`Produto ${ product.name } não existe.`)

            if (productResponse.stock - product.quantity < 0)
                throw new ClientException(`Produto ${ product.name } sem estoque suficiente.`)

            product.name = productResponse.name
            product.price = productResponse.price
            total += product.price * product.quantity
        }

        const order = await Repository.Create({
            orderModel: {
                ...orderModel,
                total: total,
            }
        })

        QueueClient.SendNewOrderCreation(new Date().getTime(), "orderCreation")

        KafkaClient.produceOrderCreation({
            orderId: order.id,
            total: order.total,
            payments: orderModel.payment.payments,
        })

        return order
    }

    static async Get({ id }: GetProps): Promise<Order | null> {
        const order = await Repository.Get({ id })

        if (order === null)
            throw new NotFoundException()

        if (order.deleted)
            throw new DeletedResourceException()

        return order
    }

    static async Update({ orderModel }: UpdateProps): Promise<Order> {
        this.ValidateOrderProducts(orderModel.products)

        if (orderModel.total < 0)
            throw new ClientException("Total do pedido não pode ser negativo.")

        if (orderModel.products.length <= 0)
            throw new ClientException("Produtos de pedido inválidos.")

        const order = await Repository.Get({ id: orderModel.id })

        if (order === null)
            throw new NotFoundException()

        if (order.deleted)
            throw new DeletedResourceException()

        return await Repository.Update({ orderModel })
    }

    static async Delete({ id }: DeleteProps): Promise<void> {
        const order = await Repository.Get({ id })

        if (order === null)
            throw new NotFoundException()

        if (order.deleted)
            throw new DeletedResourceException()

        await Repository.Delete({ id })
    }

    static async List({}: ListProps): Promise<Order[]> {
        return await Repository.List({})
    }

    private static ValidateOrderProducts(products: Product[]) {
        products.map(p => {
            if (p.id <= 0)
                throw new ClientException(`ID de produto "${ p.name }" inválido.`)

            if (p.price < 0)
                throw new ClientException(`Preço de produto "${ p.price }" inválido.`)

            if (p.quantity <= 0)
                throw new ClientException(`Quantidade de produto "${ p.quantity }" inválida.`)
        })
    }
}
