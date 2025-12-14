import { ClientException, CustomException, NotFoundException } from "./customException"
import { RedisCacheClient } from "."
import { User, UserInput } from "./types"
import Repository from "./repository"

type CreateProps = {
    userModel: UserInput
}

type GetProps = {
    id: number
}

type UpdateProps = {
    userModel: User
}

type DeleteProps = GetProps

type ListProps = {}

export default abstract class Service {
    static async Create({ userModel }: CreateProps): Promise<User> {
        if (userModel.typeId <= 0 || userModel.typeId > 3)
            throw new CustomException(400, "Tipo de usuário inválido.")

        if (userModel.email.trim() === "" || userModel.name.trim() === "")
            throw new ClientException("Informações do usuário inválidas.")

        return await Repository.Create({ userModel })
    }

    static async Get({ id }: GetProps): Promise<User | null> {
        const redisKey = `user:${id}`

        if (await RedisCacheClient.get(redisKey))
            return await RedisCacheClient.get<User>(redisKey)

        const user = await Repository.Get({ id })

        if (user === null)
            throw new NotFoundException()

        await RedisCacheClient.set(redisKey, user)

        return user
    }

    static async Update({ userModel }: UpdateProps): Promise<User> {
        const user = await Repository.Get({ id: userModel.id })

        if (user === null)
            throw new NotFoundException()

        if (userModel.typeId <= 0 || userModel.typeId > 3)
            throw new CustomException(400, "Tipo de usuário inválido.")

        if (userModel.email.trim() === "" || userModel.name.trim() === "")
            throw new ClientException("Informações do usuário inválidas.")

        await RedisCacheClient.del(`user:${userModel.id}`)

        return await Repository.Update({ userModel })
    }

    static async Delete({ id }: DeleteProps): Promise<void> {
        const user = await Repository.Get({ id })

        if (user === null)
            throw new NotFoundException()

        await RedisCacheClient.del(`user:${id}`)

        await Repository.Delete({ id })
    }

    static async List({}: ListProps): Promise<User[]> {
        return await Repository.List({})
    }
}
