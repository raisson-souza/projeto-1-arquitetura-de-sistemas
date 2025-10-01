import BindExpress from './routes'
import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const app = express()
BindExpress(app)
