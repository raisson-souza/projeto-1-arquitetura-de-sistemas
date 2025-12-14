import { connectMongoose } from './mongoose'
import BindExpress from './routes'
import dotenv from 'dotenv'
import express from 'express'
import KafkaJS from './kafka'
import RabbitMQ from './rabbitmq'
import RedisCache from './redis'

dotenv.config()

connectMongoose()
const RedisCacheClient = new RedisCache()
const QueueClient = new RabbitMQ("microservices_queue")
const KafkaClient = new KafkaJS()

const app = express()
BindExpress(app)

export { QueueClient, KafkaClient, RedisCacheClient }
