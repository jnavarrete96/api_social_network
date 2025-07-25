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
    throw new Error('Credenciales inválidas.')
  }

  const isMatch = await bcrypt.compare(password, user.password_hash)

  if (!isMatch) {
    throw new Error('Credenciales inválidas.')
  }

  return generateToken(user.id)
}
