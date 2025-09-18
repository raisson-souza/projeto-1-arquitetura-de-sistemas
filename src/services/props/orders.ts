type OrderType = {
    total: number
    id: number
    createdAt: Date
    clientId: number
    paymentMethodId: number
}

type CreateOrder = {
    clientId: number
    paymentMethodId: number
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

type ListOrdersByClient = {
    clientId: number
}

export type {
    CreateOrder,
    GetOrder,
    PutOrder,
    DeleteOrder,
    ListOrders,
    OrderType,
    ListOrdersByClient,
}
