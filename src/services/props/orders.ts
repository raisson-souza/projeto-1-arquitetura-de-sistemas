type OrderType = {
    total: number
    id: number
    createdAt: Date
}

type CreateOrder = {
    products: {
        id: number
        quantity: number
    }[]
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
    OrderType,
}
