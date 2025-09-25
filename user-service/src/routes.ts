import express from 'express'
import { Express } from 'express'
import Controller from './controller'

export default function BindExpress(app: Express) {
    const port = process.env.PORT

    app.use(express.json())

    app.get('/', (_, res) => {
        res.send('Projeto 1 - Arquitetura de Sistemas / SERVICE USERS')
    })

    const apiRouter = express.Router()

    apiRouter.post("/", (req, res, next) => {
        Controller.Create({ req, res, next })
    })

    apiRouter.get("/", (req, res, next) => {
        Controller.Get({ req, res, next })
    })

    apiRouter.put("/", (req, res, next) => {
        Controller.Update({ req, res, next })
    })

    apiRouter.delete("/", (req, res, next) => {
        Controller.Delete({ req, res, next })
    })

    apiRouter.get("/list", (req, res, next) => {
        Controller.List({ req, res, next })
    })

    app.use("/api/users", apiRouter)

    app.listen(port, () => {
        return console.log(`Users escutando em http://localhost:${port}`)
    })
}
