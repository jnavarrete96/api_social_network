import { Router } from 'express'
import { authMiddleware } from '../middlewares/authMiddleware'
import { handleToggleLike, handleCountLikes, handleGetLikes } from '../controller/like.controller'

const router = Router()

// Endpoint para dar o quitar like a un post
router.post('/:postId', authMiddleware, handleToggleLike)

router.get('/:postId', handleCountLikes)
router.get('/detail/:postId', handleGetLikes)

export default router
