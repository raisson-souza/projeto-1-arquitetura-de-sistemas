import ProductsController from '../controllers/products'
import type { Express } from 'express'

export default function BindProductsRoute(app: Express) {
    const ROUTE_NAME = '/products'

    app.route(ROUTE_NAME)
        .post((req, res) => {
            ProductsController.Create({ request: req, response: res })
        })
        .get((req, res) => {
            ProductsController.Create({ request: req, response: res })
        })
        .put((req, res) => {
            ProductsController.Create({ request: req, response: res })
        })
        .delete((req, res) => {
            ProductsController.Create({ request: req, response: res })
        })

    app.get(`${ROUTE_NAME}/list`, (req, res) => {
        ProductsController.Create({ request: req, response: res })
    })
}
