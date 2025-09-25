import prisma from "./prisma"
import { User, UserInput } from "./types"

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

export default abstract class Repository {
    static async Create({ userModel }: CreateProps): Promise<User> {
        return await prisma.user.create({
            data: {
                name: userModel.name,
                email: userModel.email,
                typeId: userModel.typeId,
            },
        })
    }

    static async Get({ id }: GetProps): Promise<User | null> {
        return await prisma.user.findFirst({
            where: { id: id },
        })
            .then(result => {
                if (result === null)
                    return null
                return result
            })
    }

    static async Update({ userModel }: UpdateProps): Promise<User> {
        return await prisma.user.update({
            where: { id: userModel.id },
            data: { ...userModel },
        })
    }

    static async Delete({ id }: DeleteProps): Promise<void> {
        await prisma.user.update({
            where: { id: id },
            data: { deleted: true },
        })
    }

    static async List({}: ListProps): Promise<User[]> {
        return await prisma.user.findMany()
    }
}
