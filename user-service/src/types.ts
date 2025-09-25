type User = {
    id: number
    name: string
    email: string
    typeId: number
    deleted: boolean
    createdAt: Date
}

type UserInput = Omit<User, "id" | "deleted" | "createdAt">

type UserOutput = User

export type { User, UserInput, UserOutput }
