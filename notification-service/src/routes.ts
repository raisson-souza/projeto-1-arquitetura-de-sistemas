import { Express } from 'express'
import Controller from './controller'
import express from 'express'

export default function BindExpress(app: Express) {
    const port = process.env.PORT

    app.use(express.json())

    app.get('/', (_, res) => res.send('Projeto 1 - Arquitetura de Sistemas / SERVICE NOTIFICATIONS'))

    const apiRouter = express.Router()

    apiRouter.post("/", (req, res, next) => Controller.Create({ req, res, next }))

    app.use("/api/notifications", apiRouter)

    app.listen(port, () => {
        return console.log(`Notifications escutando em http://localhost:${port}`)
    })
}
