import { NotificationInput } from "./types"

type CreateProps = {
    notificationModel: NotificationInput
}

export default abstract class Service {
    static async Create({ notificationModel: { deviceId }}: CreateProps): Promise<void> {
        console.log("deviceId", deviceId)
        return new Promise(resolve => setTimeout(resolve, 1000))
    }
}
