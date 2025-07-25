import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes'
import { errorHandler } from './middlewares/errorHandler'

dotenv.config()

const app = express()

app.use(express.json())

// Rutas del servicio de usuario
app.use('/api/users', userRoutes)

// Middleware de manejo de errores
app.use(errorHandler)

export default app
