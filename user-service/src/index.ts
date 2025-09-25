import BindExpress from './routes';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express()
BindExpress(app)
