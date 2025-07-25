import { Request, Response, NextFunction  } from 'express';
import bcrypt from 'bcrypt';
import { createUser, userExistsByEmailOrUsername, getUserByIdentifier, getUserById, getPublicUserById  } from '../services/user.services';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { full_name, birth_date, user_name, email, password } = req.body;

    // Validar campos requeridos
    if (!full_name || !birth_date || !user_name || !email || !password) {
      const error = new Error('Todos los campos son obligatorios')
      // @ts-ignore
      error.status = 400
      throw error
    }

    // Verificar existencia
    await userExistsByEmailOrUsername(email, user_name)

    // Hashear contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear usuario
    await createUser({
      full_name,
      birth_date,
      user_name,
      email,
      password_hash: hashedPassword
    });

    return res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (err) {
    next(err)
  }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const userId = req.userId

    const user = await getUserById(userId)

    return res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

export const getUserForAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { identifier } = req.query

  if (!identifier || typeof identifier !== 'string') {
    return res.status(400).json({ message: 'Se requiere un identificador válido' })
  }

  try {
    const user = await getUserByIdentifier(identifier)

    return res.json({
      id: user.id,
      email: user.email,
      user_name: user.user_name,
      password_hash: user.password_hash
    })
  } catch (error) {
    next(error)
  }
}

export const getUserPublic = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const user = await getPublicUserById(id)
    res.json(user)
  } catch (err) {
    next(err)
  }
}