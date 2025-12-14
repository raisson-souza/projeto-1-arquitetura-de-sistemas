import { Kafka, Partitioners, Producer, Consumer } from 'kafkajs'
import dotenv from 'dotenv'
import Service from './service'
import { Decimal } from '@prisma/client/runtime/library'

dotenv.config()

const KAFKA_CONNECTION_URL = process.env["KAFKA_CONNECTION_URL"] ?? "localhost:3008"

type CreateOrderMessage = {
    orderId: string
    total: number
    payments: {
        total: number
        paymentMethodId: number
    }[]
}

export default class KafkaService {
    private kafka: Kafka
    private producer: Producer
    private consumer: Consumer
    private isConnected: boolean = false

    constructor() {
        this.kafka = new Kafka({
            clientId: 'payment-service',
            brokers: [KAFKA_CONNECTION_URL],
            retry: {
                initialRetryTime: 100,
                retries: 8,
            },
        })

        this.producer = this.kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner })

        this.consumer = this.kafka.consumer({ groupId: 'order-processing-group' }) 

        this.connect()
    }

    private async connect() {
        if (!this.isConnected) {
            try {
                await this.producer.connect()
                this.isConnected = true
                console.log('✅ Kafka Producer conectado com sucesso')
                await this.startListening()
            } catch (error) {
                console.error('❌ Erro ao conectar Producer:', error)
            }
        }
    }

    // private async produce(topic: string, key: string, data: any) {
    //     if (!this.isConnected) await this.connect()

    //     try {
    //         await this.producer.send({
    //             topic: topic,
    //             messages: [
    //                 {
    //                     key: key,
    //                     value: JSON.stringify(data)
    //                 },
    //             ],
    //         })
    //     } catch (error) {
    //         console.error(`❌ Erro ao enviar mensagem para o tópico ${topic}:`, error)
    //         throw error
    //     }
    // }

    async productePaymentCreation(data: CreateOrderMessage) {
        // await this.produce("payments", data.orderId, data)
    }

    private async startListening() {
        try {
            await this.consumer.connect()
            console.log('✅ Kafka Consumer conectado')

            await this.consumer.subscribe({ topic: 'orders', fromBeginning: true })

            await this.consumer.run({
                eachMessage: async ({ message }) => {
                    if (!message.value) return

                    const orderData = JSON.parse(message.value.toString()) as CreateOrderMessage
                    console.log("mensagem recebida")

                    Service.Create({
                        paymentOrderModel: {
                            orderId: orderData.orderId,
                            payments: orderData.payments as any,
                            total: new Decimal(orderData.total),
                        }
                    })
                },
            })
        } catch (error) {
            console.error('❌ Erro no Consumer:', error)
        }
    }
}