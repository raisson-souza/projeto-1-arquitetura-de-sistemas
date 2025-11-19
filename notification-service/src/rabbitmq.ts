import amqp from 'amqplib'
import dotenv from 'dotenv'
import Service from './service'

dotenv.config()

const RABBITMQ_CONNECTION_URL = process.env["RABBITMQ_CONNECTION_URL"] ?? "amqp://admin:admin@localhost:3006"

type MessageType = {
    eventName: string
    data: {
        deviceId: number
    }
}

export default class RabbitMQ {
    queueName: string
    channel: amqp.Channel

    constructor(queueName: string) {
        this.queueName = queueName
        this.connect()
    }

    private async connect() {
        try {
            const connection = await amqp.connect(RABBITMQ_CONNECTION_URL)
            const channel = await connection.createChannel()
            this.channel = channel

            await channel.assertQueue(this.queueName, { durable: true })

            console.log(`[${this.queueName}] Aguardando por mensagens..`)

            await channel.consume(this.queueName, async (msg) => {
                    if (msg !== null) {
                        const msgContent = JSON.parse(msg.content.toString()) as MessageType

                        if (msgContent.eventName === "newOrderCreated") {
                            await this.ReceiveNewOrderCreated(msgContent)
                            channel.ack(msg)
                        }
                    }
                },
                { noAck: false },
            )
        } catch (error) {
            console.error(`Erro ao conectar na fila ${this.queueName}:`, error)
        }
    }

    private async ReceiveNewOrderCreated(msg: MessageType) {
        await Service.Create({ notificationModel: { deviceId: msg.data.deviceId }})
    }
}
