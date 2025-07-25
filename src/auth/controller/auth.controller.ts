import { Request, Response } from 'express'
import { loginUser } from '../services/auth.services'

export const login = async (req: Request, res: Response) => {
  const { identifier, password } = req.body // identifier email o user_name

  try {
    const token = await loginUser(identifier, password)
    return res.status(200).json({ token })
  } catch (error: any) {
    return res.status(401).json({ message: error.message })
  }
}
