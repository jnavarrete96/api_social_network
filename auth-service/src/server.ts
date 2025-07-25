import app from './app'

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`✅ Auth service corriendo en http://localhost:${PORT}`)
})