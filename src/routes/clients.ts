import ClientsController from '../controllers/clients'
import express from 'express'
import type { Router } from 'express'

export default function BindClientsRoute(): Router {
    const router = express.Router()

    router.get("/list", (req, res, next) => {
        ClientsController.List({ request: req, response: res, next })
    })

    router.post("/", (req, res, next) => {
        ClientsController.Create({ request: req, response: res, next })
    })

    router.get("/:id", (req, res, next) => {
        ClientsController.Get({ request: req, response: res, next })
    })

    return router
}
