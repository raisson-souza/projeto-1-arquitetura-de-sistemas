type OrderType = {
    total: number
    id: number
    createdAt: Date
    clientId: number
}

type CreateOrder = {
    clientId: number
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
