import { Request, Response, NextFunction } from 'express'

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('❌ Error:', err.message)

  const status = err.status || 400

  res.status(status).json({
    error: true,
    message: err.message || 'Ocurrió un error inesperado'
  })
}
