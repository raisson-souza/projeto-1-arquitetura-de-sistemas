import BindExpress from './routes'
import dotenv from 'dotenv'
import express from 'express'
import KafkaService from './kafka'

dotenv.config()

const app = express()
BindExpress(app)

const KafkaClient = new KafkaService()

export { KafkaClient }
