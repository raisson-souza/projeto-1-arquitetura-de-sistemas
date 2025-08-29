import type { Express } from 'express'

export default function BindOrdersRoute(app: Express) {
    const ROUTE_NAME = '/orders'

    app.route(ROUTE_NAME)
        .post((req, res) => {
            try {
                res.send('POST order')
            }
            catch (ex) {
                res.status(500).send(ex)
            }
        })
        .get((req, res) => {
            try {
                res.send('GET order')
            }
            catch (ex) {
                res.status(500).send(ex)
            }
        })
        .put((req, res) => {
            try {
                res.send('PUT order')
            }
            catch (ex) {
                res.status(500).send(ex)
            }
        })
        .delete((req, res) => {
            try {
                res.send('DELETE order')
            }
            catch (ex) {
                res.status(500).send(ex)
            }
        })

    app.get(`${ROUTE_NAME}/list`, (req, res) => {
        try {
            res.send('LIST orders')
        }
        catch (ex) {
            res.status(500).send(ex)
        }
    })
}
