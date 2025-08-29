import express from 'express'
import ProductsController from '../controllers/products'
import type { Router } from 'express'

export default function BindProductsRoute(): Router {
    const router = express.Router()

    router.post("/", (req, res) => {
        ProductsController.Create({ request: req, response: res })
    })

    router.get("/:id", (req, res) => {
        ProductsController.Create({ request: req, response: res })
    })

    router.put("/", (req, res) => {
        ProductsController.Create({ request: req, response: res })
    })

    router.delete("/:id", (req, res) => {
        ProductsController.Create({ request: req, response: res })
    })

    router.get("/list", (req, res) => {
        ProductsController.Create({ request: req, response: res })
    })

    return router
}
