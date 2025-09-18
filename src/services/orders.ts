import { ClientType } from "./props/clients"
import { CreateOrder, DeleteOrder, GetOrder, ListOrders, ListOrdersByClient, OrderType, PutOrder } from "./props/orders"
import { PrismaClient } from "@prisma/client"
import { ProductType } from "./props/products"
import CustomException from "../classes/CustomException"
import prisma from "../prisma"

export default abstract class OrdersService {
    static async Create(props: CreateOrder) {
        const { productsDb, total } = await this.CalculateTotalPrice(props.products)

        let order: OrderType | null = null

        const client = await this.GetClient(props.clientId)

        await prisma.$transaction(async (trx) => {
            order = await trx.order.create({
                data: {
                    clientId: client.id,
                    total: total,
                },
            })

            for (const product of productsDb) {
                const quantity = props.products.filter(p => { return p.id === product.id })[0].quantity
                await this.DecreaseProductStock(trx, product.id, quantity)
                await trx.productOrder.create({
                    data: {
                        quantity: quantity,
                        value: product.price,
                        productId: product.id,
                        orderId: order.id,
                    },
                })
            }
        })

        return order
    }

    static async Get(props: GetOrder) {
        const order = await prisma.order.findUnique({
            where: {
                id: props.id,
            },
        })

        if (order === null)
            throw new CustomException(404, "Pedido não encontrado.")

        return order
    }

    static async Put(props: PutOrder) { // FIXME: Problemas ao editar ordem sem real alteração (o código sempre tenta subtrair estoque)
        const { productsDb, total } = await this.CalculateTotalPrice(props.products)

        let order: OrderType | null = null

        const client = await this.GetClient(props.clientId)

        await prisma.$transaction(async (trx) => {
            order = await trx.order.findUnique({
                where: { id: props.id },
            })
                .then(result => {
                    if (result === null)
                        throw new CustomException(404, "Pedido não encontrado.")
                    return result
                })

            const allOrderProducts = await trx.productOrder.findMany({
                where: { orderId: props.id },
                select: { id: true, productId: true }
            })

            for (const dbOrderProduct of allOrderProducts) {
                const product = productsDb.filter(p => { return p.id === dbOrderProduct.productId })
                if (product.length > 0) {
                    const quantity = props.products.filter(p => { return p.id === product[0].id })[0].quantity
                    await this.DecreaseProductStock(trx, product[0].id, quantity)
                    await trx.productOrder.update({
                        where: { id: dbOrderProduct.id },
                        data: {
                            quantity: quantity,
                            value: product[0].price * quantity
                        },
                    })
                    continue
                }
                const oldDbOrderProduct = await trx.productOrder.findUnique({ where: { id: dbOrderProduct.id }})
                if (oldDbOrderProduct != null)
                    await trx.productOrder.delete({ where: { id: dbOrderProduct.id } })
            }

            for (const product of productsDb) {
                const orderProductRelationAlreadyExists = (await trx.productOrder.findMany({ where: { orderId: props.id, productId: product.id  } })).length > 0
                if (!orderProductRelationAlreadyExists) {
                    const quantity = props.products.filter(p => { return p.id === product.id })[0].quantity
                    await this.DecreaseProductStock(trx, product.id, quantity)
                    await trx.productOrder.create({
                        data: {
                            quantity: quantity,
                            value: product.price,
                            productId: product.id,
                            orderId: order.id,
                        },
                    })
                }
            }

            order = await trx.order.update({
                where: { id: props.id },
                data: {
                    total: total,
                    clientId: client.id,
                },
            })
        })

        return order
    }

    static async Delete(props: DeleteOrder) {
        const order = await prisma.order.findUnique({
            where: {
                id: props.id,
            },
        })

        if (order === null)
            throw new CustomException(404, "Pedido não encontrado.")

        return await prisma.order.delete({
            where: {
                id: props.id,
            },
        })
    }

    static async List(_: ListOrders) {
        return await prisma.order.findMany({
            orderBy: {
                id: "asc",
            },
        })
    }

    static async ListByClient(props: ListOrdersByClient) {
        return await prisma.order.findMany({
            orderBy: {
                id: "asc",
            },
            where: {
                clientId: props.clientId,
            },
        })
    }

    private static async CalculateTotalPrice(products: {id: number, quantity: number}[]): Promise<{ productsDb: ProductType[], total: number }> {
        const productsDb = await prisma.product.findMany({
            where: {
                id: {
                    in: products.map(p => p.id),
                },
            },
        })

        let total = 0
        productsDb.map(p => {
            const multiplier = products.filter(pp => { return pp.id === p.id })
            total += p.price * multiplier[0].quantity
        })

        return {
            productsDb,
            total,
        }
    }

    private static async DecreaseProductStock(trx: PrismaClient, productId: number, quantity: number): Promise<void> {
        const product = await trx.product.findUnique({
            where: { id: productId },
            select: { stock: true },
        })

        if (product.stock - quantity < 0)
            throw new CustomException(400, "Quantidade de produtos selecionados acima do estoque.")

        await trx.product.update({
            data: { stock: product.stock - quantity },
            where: { id: productId }
        })
    }

    private static async GetClient(clientId: number): Promise<ClientType | null> {
        return await prisma.client.findUnique({ where: { id: clientId }})
            .then(result => {
                if (result === null)
                    throw new CustomException(400, "Cliente não encontrado.")
                return result
            })
    }
}
