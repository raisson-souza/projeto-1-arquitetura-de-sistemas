import { ControllerProps } from "../types/controller_props"
import ProductsService from "../servives/products"

export default abstract class ProductsController {
    static async Create({ request, response }: ControllerProps) {
        try {
            response.send(await ProductsService.Create({
                name: request.body["name"],
                price: request.body["price"],
                stock: request.body["stock"],
            }))
        }
        catch (ex) {
            response.send(`${(ex as Error).message}`).status(500)
        }
    }

    static async Get({ request, response }: ControllerProps) {
        try {
            response.send(await ProductsService.Get({
                id: Number.parseInt(request.params["id"]),
            }))
        }
        catch (ex) {
            response.send(`${(ex as Error).message}`).status(500)
        }
    }

    static async Put({ request, response }: ControllerProps) {
        try {
            response.send(await ProductsService.Put({
                id: request.body["id"],
                name: request.body["name"],
                price: request.body["price"],
                stock: request.body["stock"],
            }))
        }
        catch (ex) {
            response.send(`${(ex as Error).message}`).status(500)
        }
    }

    static async Delete({ request, response }: ControllerProps) {
        try {
            response.send(await ProductsService.Delete({
                id: Number.parseInt(request.params["id"]),
            }))
        }
        catch (ex) {
            response.send(`${(ex as Error).message}`).status(500)
        }
    }

    static async List({ request, response }: ControllerProps) {
        try {
            response.send(await ProductsService.List({}))
        }
        catch (ex) {
            response.send(`${(ex as Error).message}`).status(500)
        }
    }
}
