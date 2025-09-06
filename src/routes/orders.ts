import express from 'express'
import OrdersController from '../controllers/orders'
import type { Router } from 'express'

export default function BindOrdersRoute(): Router {
    const router = express.Router()

    router.get("/list", (req, res, next) => {
        OrdersController.List({ request: req, response: res, next })
    })

    router.post("/", (req, res, next) => {
        OrdersController.Create({ request: req, response: res, next })
    })

    router.get("/:id", (req, res, next) => {
        OrdersController.Get({ request: req, response: res, next })
    })

    router.put("/", (req, res, next) => {
        OrdersController.Put({ request: req, response: res, next })
    })

    router.delete("/", (req, res, next) => {
        OrdersController.Delete({ request: req, response: res, next })
    })

    return router
}
