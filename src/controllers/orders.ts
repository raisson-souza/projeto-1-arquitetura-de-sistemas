import { ControllerProps } from "../types/controller_props"
import CustomException from "../classes/CustomException"
import OrdersService from "../services/orders"

export default abstract class OrdersController {
    static async Create({ request, response, next }: ControllerProps) {
        try {
            response.send(await OrdersService.Create({
                productsIds: this.GetProductsFromBody(request.body),
            }))
        }
        catch (ex) {
            next(ex)
        }
    }

    static async Get({ request, response, next }: ControllerProps) {
        try {
            response.send(await OrdersService.Get({
                id: Number.parseInt(request.params["id"]),
            }))
        }
        catch (ex) {
            next(ex)
        }
    }

    static async Put({ request, response, next }: ControllerProps) {
        try {
            response.send(await OrdersService.Put({
                id: request.body["id"],
                productsIds: this.GetProductsFromBody(request.body),
            }))
        }
        catch (ex) {
            next(ex)
        }
    }

    static async Delete({ request, response, next }: ControllerProps) {
        try {
            response.send(await OrdersService.Delete({
                id: Number.parseInt(request.params["id"]),
            }))
        }
        catch (ex) {
            next(ex)
        }
    }

    static async List({ response, next }: ControllerProps) {
        try {
            response.send(await OrdersService.List({}))
        }
        catch (ex) {
            next(ex)
        }
    }

    private static GetProductsFromBody(body: any): number[] {
        try {
            const productsIds: number[] = []

            if (body["productsIds"] != null || body["productsIds"] != undefined) {
                body["productsIds"].map((productId: any) => {
                    productsIds.push(productId)
                })
                return productsIds
            }
            throw new CustomException(400, "Produtos não encontrados.")
        }
        catch (ex) {
            throw new CustomException(400, `Não foi possível encontrar os produtos. Erro: ${ (ex as Error).message }`)
        }
    }
}
