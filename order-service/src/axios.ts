import axios from "axios"
import { CustomException } from "./customException"

const notificationServicePort = process.env.NOTIFICATION_SERVICE_PORT || 8000
const paymentServicePort = process.env.PAYMENT_SERVICE_PORT || 8002
const productServicePort = process.env.PRODUCT_SERVICE_PORT || 8003
const userServicePort = process.env.USER_SERVICE_PORT || 8004

const notificationsWebhook = axios.create({
    baseURL: `http://localhost:${ notificationServicePort }/api/notifications`,
    headers: {"Content-Type": "application/json"},
})

const paymentsWebhook = axios.create({
    baseURL: `http://localhost:${ paymentServicePort }/api/payments`,
    headers: {"Content-Type": "application/json"},
})

const productsWebhook = axios.create({
    baseURL: `http://localhost:${ productServicePort }/api/products`,
    headers: {"Content-Type": "application/json"},
})

const usersWebhook = axios.create({
    baseURL: `http://localhost:${ userServicePort }/api/users`,
    headers: {"Content-Type": "application/json"},
})

const throwAxiosErrorResponse = (ex: Error): void => {
    throw new CustomException((ex as any).status, (ex as any).response.data)
}

const parseAxiosResponse = (response: any): any => {
    return response.data
}

export {
    notificationsWebhook,
    paymentsWebhook,
    productsWebhook,
    usersWebhook,
    throwAxiosErrorResponse,
    parseAxiosResponse,
}
