import bcrypt from 'bcrypt'
import { Op } from 'sequelize'
import { User } from '../../users/models/user.model'
import { generateToken } from '../utils/utils'

export const loginUser = async (identifier: string, password: string) => {
  const user = await User.findOne({
    where: {
      [Op.or]: [{ email: identifier }, { user_name: identifier }]
    }
  })

  if (!user) {
    const error = new Error('Usuario o correo no encontrado')
    // @ts-ignore
    error.status = 404
    throw error
  }

  const isMatch = await bcrypt.compare(password, user.password_hash)

  if (!isMatch) {
    const error = new Error('Contraseña incorrecta')
    // @ts-ignore
    error.status = 401
    throw error
  }

  return generateToken(user.id)
}
