import amqp from 'amqplib'
import dotenv from 'dotenv'

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
            console.log("rabbitmq", RABBITMQ_CONNECTION_URL)
            const connection = await amqp.connect(RABBITMQ_CONNECTION_URL)
            const channel = await connection.createChannel()
            this.channel = channel

            await channel.assertQueue(this.queueName, { durable: true })

            console.log(`[${this.queueName}] Aguardando por mensagens..`)

            await channel.consume(this.queueName, async (msg) => {
                    if (msg !== null) {
                        // const msgContent = JSON.parse(msg.content.toString()) as MessageType
                        // channel.ack(msg)
                    }
                },
                { noAck: false },
            )
        } catch (error) {
            console.error(`Erro ao conectar na fila ${this.queueName}:`, error)
        }
    }

    async SendNewOrderCreation(deviceId: number) {
        const data: MessageType = {
            eventName: "newOrderCreated",
            data: {
                deviceId,
            },
        }
        this.channel.sendToQueue(this.queueName, Buffer.from(JSON.stringify(data)))
    }
}
