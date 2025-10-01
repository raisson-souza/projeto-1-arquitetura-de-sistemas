import { CustomException, NotFoundException } from "./customException";
import { User, UserInput } from "./types";
import Repository from "./repository";

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

        return await Repository.Create({ userModel })
    }

    static async Get({ id }: GetProps): Promise<User | null> {
        const user = await Repository.Get({ id })

        if (user === null)
            throw new NotFoundException()

        return user
    }

    static async Update({ userModel }: UpdateProps): Promise<User> {
        const user = await Repository.Get({ id: userModel.id })

        if (user === null)
            throw new NotFoundException()

        return await Repository.Update({ userModel })
    }

    static async Delete({ id }: DeleteProps): Promise<void> {
        const user = await Repository.Get({ id })

        if (user === null)
            throw new NotFoundException()

        await Repository.Delete({ id })
    }

    static async List({}: ListProps): Promise<User[]> {
        return await Repository.List({})
    }
}
