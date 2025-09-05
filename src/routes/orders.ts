import express from 'express'
import OrdersController from '../controllers/orders'
import type { Router } from 'express'

export default function BindOrdersRoute(): Router {
    const router = express.Router()

    router.get("/list", (req, res) => {
        OrdersController.List({ request: req, response: res })
    })

    router.post("/", (req, res) => {
        OrdersController.Create({ request: req, response: res })
    })

    router.get("/:id", (req, res) => {
        OrdersController.Get({ request: req, response: res })
    })

    router.put("/", (req, res) => {
        OrdersController.Put({ request: req, response: res })
    })

    router.delete("/", (req, res) => {
        OrdersController.Delete({ request: req, response: res })
    })

    return router
}
