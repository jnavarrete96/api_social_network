import dotenv from 'dotenv'
dotenv.config()

import express, { Application } from 'express'
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler'
import likeRouter from './routes/like.routes'

const app: Application = express();

// Middlewares globales
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas del servicio de Post
app.use('/api/like', likeRouter)

// Middleware de manejo de errores
app.use(errorHandler)

export default app