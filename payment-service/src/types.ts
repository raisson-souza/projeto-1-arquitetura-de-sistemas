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
    orderId: string
    statusId: number
    payments: Payment[]
    createdAt: Date
    deleted: boolean
}

export type PaymentOrderInput = {
    payments: PaymentInput[]
} & OMITER<Omit<PaymentOrder, "statusId" | "payments">>

export type PaymentOrderStatus = REFERENCE_TYPE

export type Payment = {
    id: number
    total: Decimal
    statusId: number
    transactionId: string | null
    paymentMethodId: number
    paymentOrderId: number
    createdAt: Date
    deleted: boolean
}

export type PaymentInput = OMITER<Omit<Payment, "transactionId" | "statusId" | "paymentOrderId">>

export type PaymentStatus = REFERENCE_TYPE

export type PaymentMethod = REFERENCE_TYPE
