import { NextFunction, Request, Response } from "express"
import Service from "./service"

type ControllerType = {
    req: Request
    res: Response
    next: NextFunction
}

export default abstract class Controller {
    static async Create({ req, res, next }: ControllerType): Promise<any> {
        try {
            const product = await Service.Create({
                productModel: {
                    name: req.body.name,
                    price: req.body.price,
                    stock: req.body.stock,
                },
            })
            res.status(201).send(product)
        }
        catch (ex) {
            next(ex)
        }
    }

    static async Get({ req, res, next }: ControllerType): Promise<any> {
        try {
            const product = await Service.Get({
                id: parseInt(req.query["id"] as string),
            })
            res.send(product)
        }
        catch (ex) {
            next(ex)
        }
    }

    static async Update({ req, res, next }: ControllerType): Promise<any> {
        try {
            const product = await Service.Update({
                productModel: {
                    name: req.body.name,
                    price: req.body.price,
                    stock: req.body.stock,
                    createdAt: new Date(req.body.createdAt),
                    deleted: req.body.deleted,
                    id: parseInt(req.body.id),
                },
            })
            res.send(product)
        }
        catch (ex) {
            next(ex)
        }
    }

    static async Delete({ req, res, next }: ControllerType): Promise<any> {
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

    static async List({ res, next }: ControllerType): Promise<any> {
        try {
            const products = await Service.List({})
            res.send(products)
        }
        catch (ex) {
            next(ex)
        }
    }
}
