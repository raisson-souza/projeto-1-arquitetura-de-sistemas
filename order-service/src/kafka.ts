import { Consumer, Kafka, Partitioners, Producer } from 'kafkajs'
import dotenv from 'dotenv'
import Service from './service'

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
    private isConnected: boolean = false
    private consumer: Consumer

    constructor() {
        this.kafka = new Kafka({
            clientId: 'order-service',
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
                console.error('❌ Erro ao conectar no Kafka:', error)
            }
        }
    }

    private async produce(topic: string, key: string, data: any) {
        if (!this.isConnected)
            await this.connect()

        try {
            await this.producer.send({
                topic: topic,
                messages: [
                    {
                        key: key,
                        value: JSON.stringify(data)
                    },
                ],
            })
            console.log("mensagem enviada para o tópico", topic)
        } catch (error) {
            console.error(`❌ Erro ao enviar mensagem para o tópico ${topic}:`, error)
            throw error
        }
    }

    async produceOrderCreation(data: CreateOrderMessage) {
        await this.produce("orders", data.orderId, data)
    }

    
    private async startListening() {
        try {
            await this.consumer.connect()
            console.log('✅ Kafka Consumer conectado')

            await this.consumer.subscribe({ topic: 'payments', fromBeginning: true })

            await this.consumer.run({
                eachMessage: async ({ message }) => {
                    if (!message.value) return

                    const data = JSON.parse(message.value.toString()) as CreateOrderMessage
                    console.log("mensagem recebida")

                    await Service.UpdateStock({ orderId: data.orderId })
                },
            })
        } catch (error) {
            console.error('❌ Erro no Consumer:', error)
        }
    }
}
