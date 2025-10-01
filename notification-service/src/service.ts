import { NotificationInput } from "./types"

type CreateProps = {
    notificationModel: NotificationInput
}

export default abstract class Service {
    static async Create({}: CreateProps): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, 1000))
    }
}
