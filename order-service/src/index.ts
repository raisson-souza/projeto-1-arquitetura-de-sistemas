import { connectMongoose } from './mongoose'
import BindExpress from './routes'
import dotenv from 'dotenv'
import express from 'express'
import RabbitMQ from './rabbitmq'
import KafkaJS from './kafka'

dotenv.config()
connectMongoose()

const app = express()
BindExpress(app)

const QueueClient = new RabbitMQ("microservices_queue")
const KafkaClient = new KafkaJS()

export { QueueClient, KafkaClient }
