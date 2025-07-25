import { Router } from 'express'
import { register } from '../controller/user.controller'

const router = Router()

// Ruta para registrar un nuevo usuario
router.post('/register', register)

export default router
