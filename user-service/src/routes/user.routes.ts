import { Router } from 'express'
import { register, getUserForAuth} from '../controllers/user.controllers'

const router = Router()

router.post('/register', register)
router.get('/info-auth', getUserForAuth) 
export default router
