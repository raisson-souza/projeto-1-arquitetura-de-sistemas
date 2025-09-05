import BindOrdersRoute from './routes/orders'
import BindProductsRoute from './routes/products'
import express from 'express'
import type { Express } from 'express'

export default function BindExpress(app: Express) {
    const port = process.env.PORT

    const apiRouter = express.Router()

    apiRouter.use(express.json())

    apiRouter.get('/', (_, res) => {
        res.send('Projeto 1 - Arquitetura de Sistemas')
    })

    const productsRouter = BindProductsRoute()
    const ordersRouter = BindOrdersRoute()

    app.use('/api', apiRouter)
    app.use('/api/products', productsRouter)
    app.use('/api/orders', ordersRouter)

    app.listen(port, () => {
        return console.log(`Express listening on http://localhost:${port}`)
    })
}
