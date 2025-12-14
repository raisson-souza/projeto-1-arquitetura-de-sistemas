import BindExpress from './routes'
import dotenv from 'dotenv'
import express from 'express'
import RedisCache from './redis'

dotenv.config()

const RedisCacheClient = new RedisCache()

const app = express()
BindExpress(app)

export { RedisCacheClient }
