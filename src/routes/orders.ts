import OrdersController from '../controllers/orders'
import type { Express } from 'express'

export default function BindOrdersRoute(app: Express) {
    const ROUTE_NAME = '/orders'

    app.route(ROUTE_NAME)
        .post((req, res) => {
            OrdersController.Create({ request: req, response: res })
        })
        .get((req, res) => {
            OrdersController.Get({ request: req, response: res })
        })
        .put((req, res) => {
            OrdersController.Put({ request: req, response: res })
        })
        .delete((req, res) => {
            OrdersController.Delete({ request: req, response: res })
        })

    app.get(`${ROUTE_NAME}/list`, (req, res) => {
        OrdersController.List({ request: req, response: res })
    })
}
