type ClientType = {
    id: number
    name: string
    email: string
}

type CreateClient = {
    name: string
    email: string
}

type GetClient = {
    id: number
}

type ListClient = {}

export type {
    CreateClient,
    GetClient,
    ListClient,
    ClientType,
}
