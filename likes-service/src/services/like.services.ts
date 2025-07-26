import Like from '../models/like.model'

export const toggleLike = async (userId: string, postId: string) => {
  const existingLike = await Like.findOne({
    where: { user_id: userId, post_id: postId }
  })

  if (existingLike) {
    await existingLike.destroy()
    return { liked: false }
  }

  await Like.create({ user_id: userId, post_id: postId })
  return { liked: true }
}

export const getLikesByPost = async (postId: string) => {
  const likes = await Like.findAll({ where: { post_id: postId } })
  return likes
}

export const countLikesByPost = async (postId: string) => {
  const count = await Like.count({ where: { post_id: postId } })
  return count
}
