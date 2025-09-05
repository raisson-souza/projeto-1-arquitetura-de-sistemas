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
    CreateProduct,
    GetProduct,
    PutProduct,
    DeleteProduct,
    ListProducts,
}
