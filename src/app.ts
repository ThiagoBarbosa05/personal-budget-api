import express, { Application } from 'express'
import { env } from './env'
import bodyParser from 'body-parser'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import { usersRouter } from './routes/users-router'

import { envelopesRouter } from './routes/envelopes-router'
import { userIdCookieExists } from './middlewares/user-id-cookie-exists'

const app: Application = express()

app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())

app.use(usersRouter)
app.use(envelopesRouter)

export { app }