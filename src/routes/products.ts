import express from 'express'
import ProductsController from '../controllers/products'
import type { Router } from 'express'

export default function BindProductsRoute(): Router {
    const router = express.Router()

    router.get("/list", (req, res) => {
        ProductsController.List({ request: req, response: res })
    })

    router.post("/", (req, res) => {
        ProductsController.Create({ request: req, response: res })
    })

    router.get("/:id", (req, res) => {
        ProductsController.Get({ request: req, response: res })
    })

    router.put("/", (req, res) => {
        ProductsController.Put({ request: req, response: res })
    })

    router.delete("/:id", (req, res) => {
        ProductsController.Delete({ request: req, response: res })
    })

    return router
}
