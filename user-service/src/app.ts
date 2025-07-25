import express, { Application } from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './routes/user.routes'
import { errorHandler } from './middlewares/errorHandler'

dotenv.config()

const app: Application = express();

// Middlewares globales
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas del servicio de usuario
app.use('/api/users', userRoutes)

// Middleware de manejo de errores
app.use(errorHandler)

export default app
