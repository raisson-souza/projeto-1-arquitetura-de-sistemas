export default class CustomException extends Error {
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
