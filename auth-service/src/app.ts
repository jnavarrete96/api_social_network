import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes'
import { errorHandler } from './middlewares/errorHandler'

const app: Application = express();

// Middlewares globales
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas base
app.get('/', (_req, res) => {
  res.send('🌐 API de Red Social Servicio Login Funcionando');
});

//Rutas
app.use('/api/auth', authRoutes)

app.use(errorHandler)

export default app;
