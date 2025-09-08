import { CreateProduct, DeleteProduct, GetProduct, ListProducts, PutProduct } from "./props/products"
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
