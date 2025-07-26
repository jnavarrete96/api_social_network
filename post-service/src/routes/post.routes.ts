// File: src/routes/post.routes.ts
import { Router } from 'express'
import {
  createPost,
  listPosts,
  listPostsByUser
} from '../controllers/post.controller'
import { authMiddleware } from '../middlewares/authMiddleware'

const router = Router()

// Crear publicación (protegido)
router.post('', authMiddleware, createPost)

// Listar todas las publicaciones (público)
router.get('', listPosts)

// Listar publicaciones de un usuario concreto (público)
router.get('/:userId', listPostsByUser)

export default router
