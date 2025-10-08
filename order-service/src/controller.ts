import { NextFunction, Request, Response } from "express"
import BodyChecker from "./utils"
import Service from "./service"

type ControllerType = {
    req: Request
    res: Response
    next: NextFunction
}

export default abstract class Controller {
    static async Create({ req, res, next }: ControllerType): Promise<void> {
        try {
            BodyChecker(req.body, ["clientId", "total", "products"])
            const order = await Service.Create({
                orderModel: {
                    clientId: req.body.clientId,
                    total: req.body.total,
                    products: req.body.products,
                },
            })
            res.status(201).json(order)
        }
        catch (ex) {
            next(ex)
        }
    }

    static async Get({ req, res, next }: ControllerType): Promise<void> {
        try {
            const order = await Service.Get({
                id: req.query["id"] as string,
            })
            res.json(order)
        }
        catch (ex) {
            next(ex)
        }
    }

    static async Update({ req, res, next }: ControllerType): Promise<void> {
        try {
        BodyChecker(req.body, ["clientId", "status", "total", "products", "createdAt", "deleted", "id"])
            const order = await Service.Update({
                orderModel: {
                    clientId: req.body.clientId,
                    status: req.body.status,
                    total: req.body.total,
                    products: req.body.products,
                    createdAt: new Date(req.body.createdAt),
                    deleted: req.body.deleted,
                    id: req.body.id,
                },
            })
            res.json(order)
        }
        catch (ex) {
            next(ex)
        }
    }

    static async Delete({ req, res, next }: ControllerType): Promise<void> {
        try {
            await Service.Delete({
                id: req.query["id"] as string,
            })
            res.send("Registro deletado com sucesso.")
        }
        catch (ex) {
            next(ex)
        }
    }

    static async List({ res, next }: ControllerType): Promise<void> {
        try {
            const orders = await Service.List({})
            res.json(orders)
        }
        catch (ex) {
            next(ex)
        }
    }
}
