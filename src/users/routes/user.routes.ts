import { Router } from 'express'
import { register,getProfile } from '../controller/user.controller'
import { authMiddleware } from '../../auth/middlewares/authMiddleware'

const router = Router()

// Ruta para registrar un nuevo usuario
router.post('/register', register)
router.get('/profile', authMiddleware, getProfile)

export default router
