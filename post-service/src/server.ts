import app from './app'
import sequelize from './database'

const PORT = process.env.PORT

const startServer = async () => {
  try {
    await sequelize.authenticate()
    console.log('Conexión a la base de datos establecida correctamente.')

    app.listen(PORT, () => {
      console.log(`Post Service ejecutándose en el puerto ${PORT}`)
    })
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error)
  }
}

startServer()