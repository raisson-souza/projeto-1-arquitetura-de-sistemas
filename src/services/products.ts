import { CreateProduct, DeleteProduct, GetProduct, ListProducts, PutProduct, UpdateStock } from "./props/products"
import CustomException from "../classes/CustomException"
import prisma from "../prisma"

export default abstract class ProductsService {
    static async Create(props: CreateProduct) {
        return await prisma.product.create({
            data: {
                ...props,
            },
        })
    }

    static async Get(props: GetProduct) {
        return await prisma.product.findUnique({
            where: {
                id: props.id,
            },
        })
    }

    static async Put(props: PutProduct) {
        return await prisma.product.update({
            data: {
                ...props,
            },
            where: {
                id: props.id,
            },
        })
    }

    static async UpdateStock(props: UpdateStock) {
        if (props.quantity <= 0)
            throw new CustomException(400, "Quantidade de estoque novo inválida.")

        return await prisma.product.update({
            data: {
                stock: props.quantity,
            },
            where: {
                id: props.productId,
            },
        })
    }

    static async Delete(props: DeleteProduct) {
        return await prisma.product.delete({
            where: {
                id: props.id,
            },
        })
    }

    static async List(_: ListProducts) {
        return await prisma.product.findMany({
            orderBy: {
                id: "asc",
            },
        })
    }
}
