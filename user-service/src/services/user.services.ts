import { User } from '../models/user.model';
import { Op } from 'sequelize';

interface CreateUserInput {
  full_name: string;
  birth_date: Date;
  user_name: string;
  email: string;
  password_hash: string;
}

// Crea un nuevo usuario
export const createUser = async (data: CreateUserInput) => {
  return await User.create(data);
};

// Verifica si ya existe un usuario por email o nombre de usuario
export const userExistsByEmailOrUsername = async (email: string, user_name: string) => {
  const user = await User.findOne({
    where: {
      [Op.or]: [{ email }, { user_name }]
    }
  })

  if (user) {
    const error = new Error('Ya existe un usuario con ese email o nombre de usuario.')
    // @ts-ignore
    error.status = 409
    throw error
  }

  return false
}

export const getUserById = async (id: string): Promise<Record<string, any>> => {
  try {
    const user = await User.findByPk(id)

    if (!user) {
      const error = new Error('Usuario no encontrado')
      // @ts-ignore
      error.status = 404
      throw error
    }

    // Convertimos a objeto plano y extraemos la contraseña
    const { password_hash, ...safeUser } = (user.toJSON() as Record<string, any>)

    return safeUser
  } catch (err) {
    console.error('Error al obtener usuario por ID:', err)
    throw err
  }
}

export const getUserByIdentifier = async (identifier: string) => {
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: identifier },
          { user_name: identifier }
        ]
      }
    })

    if (!user) {
      const error = new Error('Usuario no encontrado')
      // @ts-ignore
      error.status = 404
      throw error
    }

    return user
  } catch (err) {
    console.error('Error al buscar usuario por identificador:', err)
    throw err
  }
}