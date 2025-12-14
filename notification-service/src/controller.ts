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
            BodyChecker(req.body, ["deviceId", "eventType"])
            await Service.Create({
                notificationModel: {
                    deviceId: req.body.deviceId,
                    eventType: req.body.eventType,
                },
            })
            res.send("Notificação enviada com sucesso.")
        }
        catch (ex) {
            next(ex)
        }
    }
}
