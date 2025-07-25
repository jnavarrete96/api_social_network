import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'tuclavesecreta'

interface JwtPayload {
  userId: string
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado o mal formado' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
    // @ts-ignore
    ;(req as any).userId = decoded.userId

    next()
  } catch (error) {
    console.error('Error al verificar el token:', error)
    return res.status(401).json({ message: 'Token inválido o expirado' })
  }
}