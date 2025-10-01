import { Decimal } from "@prisma/client/runtime/library"

// TIPAGENS AUXILIARES

type REFERENCE_TYPE = {
    id: number
    description: string
}

type OMITER<T> = Omit<T, "id" | "createdAt" | "deleted">

// TIPAGENS REAIS

export type PaymentOrder = {
    id: number
    total: Decimal
    orderId: number
    statusId?: number
    createdAt: Date
    deleted: boolean
}

export type PaymentOrderInput = OMITER<PaymentOrder>

export type PaymentOrderStatus = REFERENCE_TYPE

export type Payment = {
    id: number
    total: number
    statusId: number
    transactionId: string | null
    paymentMethodId: number
    paymentOrderId: number
    createdAt: Date
    deleted: boolean
}

export type PaymentInput = OMITER<Omit<Payment, "transactionId">>

export type PaymentStatus = REFERENCE_TYPE

export type PaymentMethod = REFERENCE_TYPE
