// TIPAGENS AUXILIARES

type OMITER<T> = Omit<T, "id" | "createdAt" | "deleted">

// TIPAGENS REAIS

export type Order = {
    id: string
    clientId: number
    status: OrderStatusTypes
    total: number
    products: Product[]
    deleted: boolean
    createdAt: Date
}

export type OrderInput = {
    payment: {
        payments: {
            total: number
            paymentMethodId: number
        }[]
    }
} & Omit<OMITER<Order>, "status">

export type Product = {
    id: number
    name: string
    quantity: number
    price: number
}

export type OrderStatusTypes = "Em Aberto" | "Aguardando Pagamento" | "Finalizado" | "Cancelado" | "Reembolsado"

export enum OrderStatusTypesEnum {
    Open = "Em Aberto",
    WaitingPayment = "Aguardando Pagamento",
    Finished = "Finalizado",
    Canceled = "Cancelado",
    Refunded = "Reembolsado"
}
