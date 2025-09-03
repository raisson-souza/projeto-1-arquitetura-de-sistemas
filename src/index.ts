import BindExpress from './express';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
BindExpress(app);
