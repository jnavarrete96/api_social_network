import { Request, Response, NextFunction } from 'express'
import {
  createPost as svcCreatePost,
  getAllPosts as svcGetAllPosts,
  getPostsByUser as svcGetPostsByUser
} from '../services/post.services'
import { fetchUserInfo } from '../clients/user.client'

/**
 * POST /posts
 * Crea una nueva publicación para el usuario autenticado.
 */
export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // @ts-ignore: userId lo pone authMiddleware
    const userId: string = req.userId
    const { content } = req.body

    const post = await svcCreatePost(userId, content)
    return res.status(201).json(post)
  } catch (err) {
    next(err)
  }
}

/**
 * GET /posts
 * Lista todas las publicaciones, enriquecidas con nombre y alias de autor.
 */
export const listPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit  = req.query.limit  ? Number(req.query.limit)  : undefined
    const offset = req.query.offset ? Number(req.query.offset) : undefined

    // 1. Obtener posts “puros”
    const posts = await svcGetAllPosts(limit, offset)

    // 2. Enriquecer cada post con datos del autor
    const feed = await Promise.all(
      posts.map(async p => {
        const user = await fetchUserInfo(p.user_id)
        return {
          id:         p.id,
          author:     { id:user.id, full_name: user.full_name, user_name: user.user_name },
          content:    p.content,
          created_at: p.created_at
        }
      })
    )

    return res.json(feed)
  } catch (err) {
    next(err)
  }
}

/**
 * GET /users/:userId/posts
 * Lista únicamente las publicaciones de un usuario concreto.
 */
export const listPostsByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params

    // 1. Obtener posts de ese usuario
    const posts = await svcGetPostsByUser(userId)

    // 2. Enriquecer con nombre y alias (aunque todos tendrán el mismo autor)
    const user = await fetchUserInfo(userId)
    const feed = posts.map(p => ({
      id:         p.id,
      author:     { id:user.id,full_name: user.full_name, user_name: user.user_name },
      content:    p.content,
      created_at: p.created_at
    }))

    return res.json(feed)
  } catch (err) {
    next(err)
  }
}
