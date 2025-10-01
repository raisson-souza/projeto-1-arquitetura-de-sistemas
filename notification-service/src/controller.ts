import { NextFunction, Request, Response } from "express"
import Service from "./service"
import BodyChecker from "./utils"

type ControllerType = {
    req: Request
    res: Response
    next: NextFunction
}

export default abstract class Controller {
    static async Create({ req, res, next }: ControllerType): Promise<void> {
        try {
            BodyChecker(req.body, ["deviceId"])
            await Service.Create({
                notificationModel: {
                    deviceId: req.body.deviceId,
                },
            })
            res.status(201).send("Notificação enviada com sucesso.")
        }
        catch (ex) {
            next(ex)
        }
    }
}
