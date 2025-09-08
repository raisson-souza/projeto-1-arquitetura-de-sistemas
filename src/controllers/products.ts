import { ControllerProps } from "../types/controller_props"
import ProductsService from "../services/products"

export default abstract class ProductsController {
    static async Create({ request, response, next }: ControllerProps) {
        try {
            response.send(await ProductsService.Create({
                name: request.body["name"],
                price: request.body["price"],
                stock: request.body["stock"],
            }))
        }
        catch (ex) {
            next(ex)
        }
    }

    static async Get({ request, response, next }: ControllerProps) {
        try {
            response.send(await ProductsService.Get({
                id: Number.parseInt(request.params["id"]),
            }))
        }
        catch (ex) {
            next(ex)
        }
    }

    static async Put({ request, response, next }: ControllerProps) {
        try {
            response.send(await ProductsService.Put({
                id: request.body["id"],
                name: request.body["name"],
                price: request.body["price"],
                stock: request.body["stock"],
            }))
        }
        catch (ex) {
            next(ex)
        }
    }

    static async Delete({ request, response, next }: ControllerProps) {
        try {
            response.send(await ProductsService.Delete({
                id: Number.parseInt(request.params["id"]),
            }))
        }
        catch (ex) {
            next(ex)
        }
    }

    static async List({ request, response, next }: ControllerProps) {
        try {
            response.send(await ProductsService.List({}))
        }
        catch (ex) {
            next(ex)
        }
    }
}
