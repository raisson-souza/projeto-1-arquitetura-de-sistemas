import { ControllerProps } from "../types/controller_props"
import ClientsService from "../services/clients"

export default abstract class ClientsController {
    static async Create({ request, response, next }: ControllerProps) {
        try {
            response.send(await ClientsService.Create({
                email: request.body["email"],
                name: request.body["name"],
            }))
        }
        catch (ex) {
            next(ex)
        }
    }

    static async Get({ request, response, next }: ControllerProps) {
        try {
            response.send(await ClientsService.Get({
                id: Number.parseInt(request.params["id"]),
            }))
        }
        catch (ex) {
            next(ex)
        }
    }

    // static async Put({ request, response, next }: ControllerProps) {
    //     try {
    //     }
    //     catch (ex) {
    //         next(ex)
    //     }
    // }

    // static async Delete({ request, response, next }: ControllerProps) {
    //     try {
    //     }
    //     catch (ex) {
    //         next(ex)
    //     }
    // }

    static async List({ response, next }: ControllerProps) {
        try {
            response.send(await ClientsService.List({}))
        }
        catch (ex) {
            next(ex)
        }
    }
}
