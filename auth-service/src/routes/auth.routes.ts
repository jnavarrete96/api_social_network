import { Router } from 'express'
import { login } from '../controllers/auth.controller'

const router = Router()

// Ruta para login
router.post('/login', login)

export default router