type Product = {
    id: number
    name: string
    price: number
    stock: number
    deleted: boolean
    createdAt: Date
}

type ProductInput = Omit<Product, "id" | "deleted" | "createdAt">

type ProductOutput = Product

export type { Product, ProductInput, ProductOutput }
