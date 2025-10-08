import { connectMongoose } from './mongoose'
import BindExpress from './routes'
import dotenv from 'dotenv'
import express from 'express'

dotenv.config()
connectMongoose()

const app = express()
BindExpress(app)
