import { Post } from '../models/post.model'

/**
 * Crea una nueva publicación
 * @param userId UUID del autor (viene del JWT)
 * @param content Texto de la publicación
 * @returns instancia de Post recién creada
 */
export const createPost = async (userId: string, content: string): Promise<Post> => {
  return await Post.create({ user_id: userId, content })
}

/**
 * Lista todas las publicaciones, ordenadas por fecha (descendente),
 * opcionalmente paginadas.
 * @param limit máximo de registros a devolver
 * @param offset cantidad de registros a saltar
 * @returns array de Posts
 */
export const getAllPosts = async (
  limit?: number,
  offset?: number
): Promise<Post[]> => {
  return await Post.findAll({
    order: [['created_at', 'DESC']],
    ...(limit  !== undefined ? { limit }  : {}),
    ...(offset !== undefined ? { offset } : {})
  })
}

/**
 * Lista las publicaciones de un usuario concreto
 * @param userId UUID del usuario
 * @returns array de Posts
 */
export const getPostsByUser = async (userId: string): Promise<Post[]> => {
  return await Post.findAll({
    where: { user_id: userId },
    order: [['created_at', 'DESC']]
  })
}
