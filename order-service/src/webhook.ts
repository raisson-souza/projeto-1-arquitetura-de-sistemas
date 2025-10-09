import { notificationsWebhook, parseAxiosResponse, paymentsWebhook, productsWebhook, throwAxiosErrorResponse, usersWebhook } from "./axios"

const notificationService = {
    sendNotification: async () => {
        return await notificationsWebhook.post("/", { "deviceId": 1 })
            .then(res => parseAxiosResponse(res))
            .catch(ex => throwAxiosErrorResponse(ex))
    }
}

const paymentService = {
    create: async (data: {
        orderId: string
        total: number
        payments: {
            total: number
            paymentMethodId: number
        }[]
    }) => {
        return await paymentsWebhook.post("/", data)
            .then(res => parseAxiosResponse(res))
            .catch(ex => throwAxiosErrorResponse(ex))
    },
    // get: async (data: any) => {
    //     return await paymentsWebhook.get("/")
    //         .then(res => parseAxiosResponse(res))
    //         .catch(ex => throwAxiosErrorResponse(ex))
    // },
    // put: async (data: any) => {
    //     return await paymentsWebhook.put("/")
    //         .then(res => parseAxiosResponse(res))
    //         .catch(ex => throwAxiosErrorResponse(ex))
    // },
    delete: async (data: any) => {
        return await paymentsWebhook.delete("/")
            .then(res => parseAxiosResponse(res))
            .catch(ex => throwAxiosErrorResponse(ex))
    },
    // list: async (data: any) => {
    //    return await paymentsWebhook.get("/")
    //         .then(res => parseAxiosResponse(res))
    //         .catch(ex => throwAxiosErrorResponse(ex))
    // },
}

const productService = {
    // create: async (data: any) => {
    //     return await productsWebhook.post("/")
    //         .then(res => parseAxiosResponse(res))
    //         .catch(ex => throwAxiosErrorResponse(ex))
    // },
    get: async (productId: number) => {
        return await productsWebhook.get(`?id=${ productId }`)
            .then(res => parseAxiosResponse(res))
            .catch(ex => throwAxiosErrorResponse(ex))
    },
    // put: async (data: any) => {
    //     return await productsWebhook.put("/")
    //         .then(res => parseAxiosResponse(res))
    //         .catch(ex => throwAxiosErrorResponse(ex))
    // },
    // delete: async (data: any) => {
    //     return await productsWebhook.delete("/")
    //         .then(res => parseAxiosResponse(res))
    //         .catch(ex => throwAxiosErrorResponse(ex))
    // },
    // list: async (data: any) => {
    //     return await productsWebhook.get("/")
    //         .then(res => parseAxiosResponse(res))
    //         .catch(ex => throwAxiosErrorResponse(ex))
    // },
    updateStock: async (data: any) => {
        return await productsWebhook.post("/update_stock")
            .then(res => parseAxiosResponse(res))
            .catch(ex => throwAxiosErrorResponse(ex))
    },
}

const userService = {
    // create: async (data: any) => {
    //     return await usersWebhook.post("/")
    //         .then(res => parseAxiosResponse(res))
    //         .catch(ex => throwAxiosErrorResponse(ex))
    // },
    get: async (userId: number) => {
        console.log(usersWebhook.defaults.baseURL)
        return await usersWebhook.get(`?id=${ userId }`)
            .then(res => parseAxiosResponse(res))
            .catch(ex => throwAxiosErrorResponse(ex))
    },
    // put: async (data: any) => {
    //     return await usersWebhook.put("/")
    //         .then(res => parseAxiosResponse(res))
    //         .catch(ex => throwAxiosErrorResponse(ex))
    // },
    // delete: async (data: any) => {
    //     return await usersWebhook.delete("/")
    //         .then(res => parseAxiosResponse(res))
    //         .catch(ex => throwAxiosErrorResponse(ex))
    // },
    // list: async (data: any) => {
    //     return await usersWebhook.get("/")
    //         .then(res => parseAxiosResponse(res))
    //         .catch(ex => throwAxiosErrorResponse(ex))
    // },
}

export {
    notificationService,
    paymentService,
    productService,
    userService,
}
