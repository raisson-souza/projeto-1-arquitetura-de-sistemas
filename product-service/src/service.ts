import { ClientException, DeletedResourceException, NotFoundException } from "./customException"
import { Product, ProductInput } from "./types"
import Repository from "./repository"

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

export default abstract class Service {
    static async Create({ productModel }: CreateProps): Promise<Product> {
        if (productModel.price < 0)
            throw new ClientException("Preço inválido.")

        if (productModel.stock < 0)
            throw new ClientException("Estoque inválido.")

        return await Repository.Create({ productModel })
    }

    static async Get({ id }: GetProps): Promise<Product | null> {
        const product = await Repository.Get({ id })

        if (product === null)
            throw new NotFoundException()

        if (product.deleted)
            throw new DeletedResourceException()

        return product
    }

    static async Update({ productModel }: UpdateProps): Promise<Product> {
        const product = await Repository.Get({ id: productModel.id })

        if (product === null)
            throw new NotFoundException()

        if (product.deleted)
            throw new DeletedResourceException()

        return await Repository.Update({ productModel })
    }

    static async Delete({ id }: DeleteProps): Promise<void> {
        const product = await Repository.Get({ id })

        if (product === null)
            throw new NotFoundException()

        if (product.deleted)
            throw new DeletedResourceException()

        await Repository.Delete({ id })
    }

    static async List({}: ListProps): Promise<Product[]> {
        return await Repository.List({})
    }
}
