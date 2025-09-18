type ProductType = PutProduct

type CreateProduct = {
    name: string
    price: number
    stock: number
}

type GetProduct = {
    id: number
}

type PutProduct = Omit<CreateProduct, "stock"> & GetProduct

type DeleteProduct = GetProduct

type ListProducts = {}

type UpdateStock = {
    productId: number
    quantity: number
}

export type {
    ProductType,
    CreateProduct,
    GetProduct,
    PutProduct,
    DeleteProduct,
    ListProducts,
    UpdateStock,
}
