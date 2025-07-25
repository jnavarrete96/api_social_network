import { Router } from 'express'
import { register, getUserForAuth, getProfile} from '../controllers/user.controllers'
import { authMiddleware } from '../middlewares/authMiddleware'

const router = Router()

router.post('/register', register)
router.get('/info-auth', getUserForAuth)
router.get('/profile', authMiddleware, getProfile) 
export default router
