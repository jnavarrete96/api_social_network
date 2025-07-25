import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './src/users/routes/user.routes'
import authRoutes from './src/auth/routes/auth.routes'
import { errorHandler } from './src/middlewares/errorHandler'

const app: Application = express();

// Middlewares globales
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas base
app.get('/', (_req, res) => {
  res.send('🌐 API de Red Social funcionando');
});

//Rutas
app.use('/users', userRoutes)
app.use('/auth', authRoutes)

app.use(errorHandler)

export default app;
