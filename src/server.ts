import { app } from './app'
import { env } from './env'

app.listen(env.PORT, () => {
  console.log('Server is listening at http://localhost:4000')
})
