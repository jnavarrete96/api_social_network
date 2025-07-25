import { Request, Response, NextFunction  } from 'express';
import bcrypt from 'bcrypt';
import { createUser, userExistsByEmailOrUsername } from '../services/user.service';
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