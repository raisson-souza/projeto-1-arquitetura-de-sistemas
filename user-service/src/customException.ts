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

export class NotFoundException extends Error {
    statusCode: number

    constructor() {
        super("Registro não encontrado.")
        this.statusCode = 404
    }

    getError() {
        return {
            "statusCode": this.statusCode,
            "error": this.message,
        }
    }
}
