import { ControllerProps } from "../types/controller_props"
import { ProductType } from "../services/props/products"
import CustomException from "../classes/CustomException"
import OrdersService from "../services/orders"

export default abstract class OrdersController {
    static async Create({ request, response, next }: ControllerProps) {
        try {
            const products = this.GetProductsFromBody(request.body)
            response.send(await OrdersService.Create({
                products: products,
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
            const products = this.GetProductsFromBody(request.body)
            response.send(await OrdersService.Put({
                id: request.body["id"],
                products: products,
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

    private static GetProductsFromBody(body: any): ProductType[] {
        try {
            const products: ProductType[] = []

            if (body["products"] != null || body["products"] != undefined) {
                body["products"].map((product: any) => {
                    products.push({
                        id: product["id"],
                        name: product["name"],
                        price: product["price"],
                        stock: product["stock"],
                    })
                })
                return products
            }
            throw new CustomException(400, "Produtos não encontrados.")
        }
        catch (ex) {
            throw new CustomException(400, `Não foi possível encontrar os produtos. Erro: ${ (ex as Error).message }`)
        }
    }
}
