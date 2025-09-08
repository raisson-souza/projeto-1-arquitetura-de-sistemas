type ProductType = PutProduct

type CreateProduct = {
    name: string
    price: number
    stock: number
}

type GetProduct = {
    id: number
}

type PutProduct = CreateProduct & GetProduct

type DeleteProduct = GetProduct

type ListProducts = {}

export type {
    ProductType,
    CreateProduct,
    GetProduct,
    PutProduct,
    DeleteProduct,
    ListProducts,
}
