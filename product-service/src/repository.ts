import { Product, ProductInput } from "./types"
import prisma from "./prisma"

type CreateProps = {
    productModel: ProductInput
}

type GetProps = {
    id: number
}

type UpdateProps = {
    productModel: Product
}

type DeleteProps = GetProps

type ListProps = {}

export default abstract class Repository {
    static async Create({ productModel }: CreateProps): Promise<Product> {
        return await prisma.product.create({
            data: {
                name: productModel.name,
                price: productModel.price,
                stock: productModel.stock,
            },
        })
    }

    static async Get({ id }: GetProps): Promise<Product | null> {
        return await prisma.product.findFirst({
            where: { id: id, deleted: false },
        })
            .then(result => {
                if (result === null)
                    return null
                return result
            })
    }

    static async Update({ productModel }: UpdateProps): Promise<Product> {
        return await prisma.product.update({
            where: { id: productModel.id },
            data: { ...productModel },
        })
    }

    static async Delete({ id }: DeleteProps): Promise<void> {
        await prisma.product.update({
            where: { id: id },
            data: { deleted: true },
        })
    }

    static async List({}: ListProps): Promise<Product[]> {
        return await prisma.product.findMany({
            where: { deleted: false },
        })
    }
}
