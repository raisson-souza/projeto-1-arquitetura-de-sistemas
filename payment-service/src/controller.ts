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
            BodyChecker(req.body, ["orderId", "total"])
            const paymentOrder = await Service.Create({
                paymentOrderModel: {
                    orderId: req.body.orderId,
                    statusId: req.body.statusId,
                    total: req.body.total,
                },
            })
            res.status(201).json(paymentOrder)
        }
        catch (ex) {
            next(ex)
        }
    }

    static async Get({ req, res, next }: ControllerType): Promise<void> {
        try {
            const paymentOrder = await Service.Get({
                id: parseInt(req.query["id"] as string),
            })
            res.json(paymentOrder)
        }
        catch (ex) {
            next(ex)
        }
    }

    static async Update({ req, res, next }: ControllerType): Promise<void> {
        try {
        BodyChecker(req.body, ["orderId", "statusId", "total", "createdAt", "deleted", "id"])
            const paymentOrder = await Service.Update({
                paymentOrderModel: {
                    orderId: req.body.orderId,
                    statusId: req.body.statusId,
                    total: req.body.total,
                    createdAt: new Date(req.body.createdAt),
                    deleted: req.body.deleted,
                    id: parseInt(req.body.id),
                },
            })
            res.json(paymentOrder)
        }
        catch (ex) {
            next(ex)
        }
    }

    static async Delete({ req, res, next }: ControllerType): Promise<void> {
        try {
            await Service.Delete({
                id: parseInt(req.query["id"] as string),
            })
            res.send("Registro deletado com sucesso.")
        }
        catch (ex) {
            next(ex)
        }
    }

    static async List({ res, next }: ControllerType): Promise<void> {
        try {
            const paymentOrders = await Service.List({})
            res.json(paymentOrders)
        }
        catch (ex) {
            next(ex)
        }
    }
}
