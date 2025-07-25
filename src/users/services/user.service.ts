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
export const userExistsByEmailOrUsername = async (
  email: string,
  user_name: string
) => {
  return await User.findOne({
    where: {
      [Op.or]: [{ email }, { user_name }]
    }
  });
};
