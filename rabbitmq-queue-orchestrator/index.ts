import amqp from 'amqplib'
import dotenv from 'dotenv'

dotenv.config()

const RABBITMQ_CONNECTION_URL = process.env["RABBITMQ_CONNECTION_URL"] ?? "amqp://admin:admin@localhost:5672"

const queueNames = [
    'microservices_queue',
]

async function setup() {
    let connection: amqp.ChannelModel | null = null
    try {
        connection = await amqp.connect(RABBITMQ_CONNECTION_URL)
        const channel = await connection.createChannel()

        console.log('Conectado ao RabbitMQ. Inicializando filas...')

        for (const queueName of queueNames) {
            await channel.assertQueue(queueName, { durable: true })
            console.log(`Fila '${queueName}' garantida.`)
        }

        console.log('Configuração concluída.')

        await channel.close()
        await connection.close()

    } catch (error) {
        console.error('Erro ao configurar o RabbitMQ:', error)
        process.exit(1)
    }
}

setup()
