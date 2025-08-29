import { ControllerProps } from "../types/controller_props"

export default abstract class ProductsController {
    static async Create({ request, response }: ControllerProps) {
        try {
            response.send("response")
        }
        catch (ex) {
            response.send(`${(ex as Error).message}`).status(500)
        }
    }

    static async Get({ request, response }: ControllerProps) {
        try {
            response.send("response")
        }
        catch (ex) {
            response.send(`${(ex as Error).message}`).status(500)
        }
    }

    static async Put({ request, response }: ControllerProps) {
        try {
            response.send("response")
        }
        catch (ex) {
            response.send(`${(ex as Error).message}`).status(500)
        }
    }

    static async Delete({ request, response }: ControllerProps) {
        try {
            response.send("response")
        }
        catch (ex) {
            response.send(`${(ex as Error).message}`).status(500)
        }
    }

    static async List({ request, response }: ControllerProps) {
        try {
            response.send("response")
        }
        catch (ex) {
            response.send(`${(ex as Error).message}`).status(500)
        }
    }
}
