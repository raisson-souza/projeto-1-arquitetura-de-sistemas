import { NotificationInput } from "./types"

type CreateProps = {
    notificationModel: NotificationInput
}

export default abstract class Service {
    static async Create({ notificationModel: { deviceId, eventType }}: CreateProps): Promise<void> {
        console.log(`[${ eventType }] ${ deviceId }`)
        return new Promise(resolve => setTimeout(resolve, 1000))
    }
}
