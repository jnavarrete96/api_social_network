import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './src/users/routes/user.routes'
import authRoutes from './src/auth/routes/auth.routes'

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

export default app;
