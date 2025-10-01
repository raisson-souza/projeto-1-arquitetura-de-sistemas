export class CustomException extends Error {
    statusCode: number

    constructor(statusCode: number, message: string) {
        super(message)
        this.statusCode = statusCode
    }

    getError() {
        return {
            "statusCode": this.statusCode,
            "error": this.message,
        }
    }
}

export class NotFoundException extends CustomException {
    constructor() {
        super(404, "Registro não encontrado.")
    }
}

export class DeletedResourceException extends CustomException {
    constructor() {
        super(404, "Registro não encontrado.")
    }
}

export class ClientException extends CustomException {
    constructor(message: string) {
        super(400, message)
    }
}