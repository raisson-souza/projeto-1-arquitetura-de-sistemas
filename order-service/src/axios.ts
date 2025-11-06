import { CustomException } from "./customException"
import axios from "axios"
import dotenv from 'dotenv'

dotenv.config()

const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || "http://localhost:8000/api"
const PAYMENT_SERVICE_URL = process.env.PAYMENT_SERVICE_URL || "http://localhost:8000/api"
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || "http://localhost:8000/api"
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || "http://localhost:8000/api"

const notificationsWebhook = axios.create({
    baseURL: NOTIFICATION_SERVICE_URL,
    headers: {"Content-Type": "application/json"},
})

const paymentsWebhook = axios.create({
    baseURL: PAYMENT_SERVICE_URL,
    headers: {"Content-Type": "application/json"},
})

const productsWebhook = axios.create({
    baseURL: PRODUCT_SERVICE_URL,
    headers: {"Content-Type": "application/json"},
})

const usersWebhook = axios.create({
    baseURL: USER_SERVICE_URL,
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
