import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { createUser, userExistsByEmailOrUsername } from '../services/user.service';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req: Request, res: Response) => {
  try {
    const { full_name, birth_date, user_name, email, password } = req.body;

    // Validar campos requeridos
    if (!full_name || !birth_date || !user_name || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

     // Verificar si ya existe un usuario con ese email o username
    const existingUser = await userExistsByEmailOrUsername(email, user_name);
    if (existingUser) {
      return res.status(409).json({ message: 'Ya existe un usuario con ese email o nombre de usuario.' });
    }
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
  } catch (error) {
    console.error('Error en registro:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};