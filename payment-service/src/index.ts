import BindExpress from './routes'
import dotenv from 'dotenv'
import express from 'express'
import KafkaService from './kafka'
import RabbitMQ from './rabbitmq'
import RedisCache from './redis'

dotenv.config()

const RedisCacheClient = new RedisCache()
const QueueClient = new RabbitMQ("microservices_queue")
const KafkaClient = new KafkaService()

const app = express()
BindExpress(app)

export { KafkaClient, RedisCacheClient, QueueClient }
