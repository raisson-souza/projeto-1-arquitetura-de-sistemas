import { NextFunction, Request, Response } from "express"
import BodyChecker from "./utils"
import Service from "./service"

type ControllerType = {
    req: Request
    res: Response
    next: NextFunction
}

export default abstract class Controller {
    static async Create({ req, res, next }: ControllerType): Promise<any> {
        try {
            BodyChecker(req.body, ["name", "email", "typeId"])
            const user = await Service.Create({
                userModel: {
                    name: req.body.name,
                    email: req.body.email,
                    typeId: req.body.typeId,
                },
            })
            res.status(201).json(user)
        }
        catch (ex) {
            next(ex)
        }
    }

    static async Get({ req, res, next }: ControllerType): Promise<any> {
        try {
            const user = await Service.Get({
                id: parseInt(req.query["id"] as string),
            })
            res.json(user)
        }
        catch (ex) {
            next(ex)
        }
    }

    static async Update({ req, res, next }: ControllerType): Promise<any> {
        try {
            BodyChecker(req.body, ["name", "email", "typeId", "createdAt", "deleted", "id"])
            const user = await Service.Update({
                userModel: {
                    name: req.body.name,
                    email: req.body.email,
                    typeId: req.body.typeId,
                    createdAt: new Date(req.body.createdAt),
                    deleted: req.body.deleted,
                    id: parseInt(req.body.id),
                },
            })
            res.json(user)
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
            const users = await Service.List({})
            res.json(users)
        }
        catch (ex) {
            next(ex)
        }
    }
}
