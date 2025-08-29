import type { Express } from 'express'

export default function BindProductsRoute(app: Express) {
    const ROUTE_NAME = '/products'

    app.route(ROUTE_NAME)
        .post((req, res) => {
            try {
                res.send('POST product')
            }
            catch (ex) {
                res.status(500).send(ex)
            }
        })
        .get((req, res) => {
            try {
                res.send('GET product')
            }
            catch (ex) {
                res.status(500).send(ex)
            }
        })
        .put((req, res) => {
            try {
                res.send('PUT product')
            }
            catch (ex) {
                res.status(500).send(ex)
            }
        })
        .delete((req, res) => {
            try {
                res.send('DELETE product')
            }
            catch (ex) {
                res.status(500).send(ex)
            }
        })

    app.get(`${ROUTE_NAME}/list`, (req, res) => {
        try {
            res.send('LIST products')
        }
        catch (ex) {
            res.status(500).send(ex)
        }
    })
}
