import { ClientException } from "./customException"

export default function BodyChecker(body: any, keys: string[]): void {
    keys.map(key => {
        let value = body[key]
        if (value === undefined || value === null)
            throw new ClientException(`Chave "${ key }" não encontrada na requisição.`)
    })
}