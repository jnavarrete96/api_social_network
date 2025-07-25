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
