// src/clients/user.client.ts

import axios from 'axios'
import NodeCache from 'node-cache'

const USER_SERVICE_URL = process.env.USER_SERVICE_URL

export interface UserInfo {
  id: string
  full_name: string
  user_name: string
}

// Cache en memoria para no golpear demasiado al User‑Service
const userCache = new NodeCache({ stdTTL: 30, checkperiod: 60 })

/**
 * Llama a GET /users/:id en el User‑Service y cachea el resultado.
 */
export const fetchUserInfo = async (userId: string): Promise<UserInfo> => {
  const key = `user_${userId}`
  const cached = userCache.get<UserInfo>(key)
  if (cached) return cached

  const resp = await axios.get<UserInfo>(`${USER_SERVICE_URL}/users/${userId}`)
  const user = resp.data
  userCache.set(key, user)
  return user
}
