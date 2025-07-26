// File: src/controllers/like.controller.ts
import { Request, Response, NextFunction } from 'express'
import { toggleLike, countLikesByPost, getLikesByPost } from '../services/like.services'

export const handleToggleLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore: userId lo pone authMiddleware
    const userId: string = req.userId
    const { postId } = req.params

    if (!userId) {
      const error = new Error('No autorizado')
      // @ts-ignore
      error.status = 401
      throw error
    }

    const result = await toggleLike(userId, postId)
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

export const handleCountLikes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params
    const count = await countLikesByPost(postId)
    res.status(200).json({ postId, likes: count })
  } catch (error) {
    next(error)
  }
}

export const handleGetLikes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params
    const likes = await getLikesByPost(postId)
    res.status(200).json({ postId, likes })
  } catch (error) {
    next(error)
  }
}
