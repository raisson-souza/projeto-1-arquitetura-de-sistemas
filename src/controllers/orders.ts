import { ControllerProps } from "../types/controller_props"

export default abstract class OrdersController {
    static async Create({ request, response, next }: ControllerProps) {
        try {
            response.send("response")
        }
        catch (ex) {
            next(ex)
        }
    }

    static async Get({ request, response, next }: ControllerProps) {
        try {
            response.send("response")
        }
        catch (ex) {
            next(ex)
        }
    }

    static async Put({ request, response, next }: ControllerProps) {
        try {
            response.send("response")
        }
        catch (ex) {
            next(ex)
        }
    }

    static async Delete({ request, response, next }: ControllerProps) {
        try {
            response.send("response")
        }
        catch (ex) {
            next(ex)
        }
    }

    static async List({ request, response, next }: ControllerProps) {
        try {
            response.send("response")
        }
        catch (ex) {
            next(ex)
        }
    }
}
