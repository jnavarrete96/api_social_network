import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';

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

// Aquí irán los routers de cada módulo (auth, users, posts, likes)
// Ejemplo:
// import authRouter from './routes/auth.routes';
// app.use('/api/auth', authRouter);

export default app;
