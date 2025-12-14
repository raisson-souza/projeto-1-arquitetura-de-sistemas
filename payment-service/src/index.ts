import BindExpress from './routes'
import dotenv from 'dotenv'
import express from 'express'
import KafkaService from './kafka'
import RedisCache from './redis'

dotenv.config()

const RedisCacheClient = new RedisCache()
const KafkaClient = new KafkaService()

const app = express()
BindExpress(app)

export { KafkaClient, RedisCacheClient }
