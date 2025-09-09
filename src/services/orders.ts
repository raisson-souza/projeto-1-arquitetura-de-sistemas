import { CreateOrder, DeleteOrder, GetOrder, ListOrders, OrderType, PutOrder } from "./props/orders"
import { ProductType } from "./props/products"
import CustomException from "../classes/CustomException"
import prisma from "../prisma"

export default abstract class OrdersService {
    static async Create(props: CreateOrder) {
        const { products, total } = await this.CalculateTotalPrice(props.productsIds)

        let order: OrderType | null = null

        await prisma.$transaction(async (trx) => {
            order = await prisma.order.create({
                data: { total: total }
            })

            for (const product of products) {
                await trx.productOrder.create({
                    data: {
                        quantity: props.productsIds.filter(id => { return id === product.id }).length,
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

    static async Put(props: PutOrder) {
        const { products, total } = await this.CalculateTotalPrice(props.productsIds)

        let order: OrderType | null = null

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
                const product = products.filter(p => { return p.id === dbOrderProduct.productId })
                if (product.length > 0) {
                    const quantity = props.productsIds.filter(id => { return id === product[0].id }).length
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

            for (const product of products) {
                const orderProductRelationAlreadyExists = (await trx.productOrder.findMany({ where: { orderId: props.id, productId: product.id  } })).length > 0
                if (!orderProductRelationAlreadyExists) {
                    await trx.productOrder.create({
                        data: {
                            quantity: props.productsIds.filter(id => { return id === product.id }).length,
                            value: product.price,
                            productId: product.id,
                            orderId: order.id,
                        },
                    })
                }
            }

            order = await trx.order.update({
                where: { id: props.id },
                data: { total: total }
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

    private static async CalculateTotalPrice(productsIds: number[]): Promise<{ products: ProductType[], total: number }> {
        const products = await prisma.product.findMany({
            where: {
                id: {
                    in: productsIds,
                },
            },
        })

        let totalPrice = 0
        products.map(p => {
            const multiplier = productsIds.filter(id => { return id === p.id }).length
            totalPrice += p.price * multiplier
        })

        return {
            products: products,
            total: totalPrice,
        }
    }
}
