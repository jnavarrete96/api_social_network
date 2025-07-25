import axios from 'axios'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/utils'

const USER_SERVICE_URL = process.env.USER_SERVICE_URL

export const loginUser = async (identifier: string, password: string) => {
  try {
    const response = await axios.get(`${USER_SERVICE_URL}/api/users/auth-info`, {
      params: { identifier }
    })

    const user = response.data

    const isMatch = await bcrypt.compare(password, user.password_hash)
    if (!isMatch) {
      const error = new Error('Contraseña incorrecta')
      // @ts-ignore
      error.status = 401
      throw error
    }

    return generateToken(user.id)

  } catch (error: any) {
    if (error.response?.status === 404) {
      const err = new Error('Usuario o correo no encontrado')
      // @ts-ignore
      err.status = 404
      throw err
    }

    throw error
  }
}
