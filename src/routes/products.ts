import express from 'express'
import ProductsController from '../controllers/products'
import type { Router } from 'express'

export default function BindProductsRoute(): Router {
    const router = express.Router()

    router.get("/list", (req, res, next) => {
        ProductsController.List({ request: req, response: res, next })
    })

    router.post("/", (req, res, next) => {
        ProductsController.Create({ request: req, response: res, next })
    })

    router.get("/:id", (req, res, next) => {
        ProductsController.Get({ request: req, response: res, next })
    })

    router.put("/", (req, res, next) => {
        ProductsController.Put({ request: req, response: res, next })
    })

    router.put("/update_stock/:productId", (req, res, next) => {
        ProductsController.UpdateStock({ request: req, response: res, next })
    })

    router.delete("/:id", (req, res, next) => {
        ProductsController.Delete({ request: req, response: res, next })
    })

    return router
}
