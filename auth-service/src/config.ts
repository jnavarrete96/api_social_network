import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT
export const JWT_SECRET = process.env.JWT_SECRET
export const USER_SERVICE_URL = process.env.USER_SERVICE_URL
