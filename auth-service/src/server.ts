import app from './app'
import {PORT} from './config'

app.listen(PORT, () => {
  console.log(`✅ Auth service corriendo en http://localhost:${PORT}`)
})