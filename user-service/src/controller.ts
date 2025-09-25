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
            return Service.Create({
                userModel: {
                    name: req.body.name,
                    email: req.body.email,
                    typeId: req.body.typeId,
                },
            })
        }
        catch (ex) {
            next(ex)
        }
    }

    static async Get({ req, res, next }: ControllerType): Promise<any> {
        try {
            return Service.Get({
                id: parseInt(req.query["id"] as string),
            })
        }
        catch (ex) {
            next(ex)
        }
    }

    static async Update({ req, res, next }: ControllerType): Promise<any> {
        try {
            return Service.Update({
                userModel: {
                    name: req.body.name,
                    email: req.body.email,
                    typeId: req.body.typeId,
                    createdAt: new Date(req.body.createdAt),
                    deleted: req.body.deleted,
                    id: parseInt(req.body.id),
                },
            })
        }
        catch (ex) {
            next(ex)
        }
    }

    static async Delete({ req, res, next }: ControllerType): Promise<any> {
        try {
            return Service.Delete({
                id: parseInt(req.query["id"] as string),
            })
        }
        catch (ex) {
            next(ex)
        }
    }

    static async List({ req, res, next }: ControllerType): Promise<any> {
        try {
            return Service.List({})
        }
        catch (ex) {
            next(ex)
        }
    }
}
