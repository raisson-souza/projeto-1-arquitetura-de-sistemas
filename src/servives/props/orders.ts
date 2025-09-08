import { ProductType } from "./products"

type CreateOrder = {
    products: ProductType[]
}

type GetOrder = {
    id: number
}

type PutOrder = CreateOrder & GetOrder

type DeleteOrder = GetOrder

type ListOrders = {}

export type {
    CreateOrder,
    GetOrder,
    PutOrder,
    DeleteOrder,
    ListOrders,
}
