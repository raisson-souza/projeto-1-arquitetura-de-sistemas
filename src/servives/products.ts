import { CreateProduct, DeleteProduct, GetProduct, ListProducts, PutProduct } from "./props/products"

export default abstract class ProductsService {
    static async Create(props: CreateProduct) {
        return "created"
    }

    static async Get(props: GetProduct) {
        return "product"
    }

    static async Put(props: PutProduct) {
        return "updated"
    }

    static async Delete(props: DeleteProduct) {
        return "deleted"
    }

    static async List(props: ListProducts) {
        return ["p", "p", "p"]
    }
}
