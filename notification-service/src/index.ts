import BindExpress from './routes'
import dotenv from 'dotenv'
import express from 'express'
import RabbitMQ from './rabbitmq'

dotenv.config()

const app = express()
BindExpress(app)

const Queue = new RabbitMQ("microservices_queue")
export { Queue }
