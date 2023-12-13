import express, { Application } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import { usersRouter } from './routes/users-router'
import { envelopesRouter } from './routes/envelopes-router'
import { transactionsRouter } from './routes/transactions-router'

const app: Application = express()

app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())

app.use(usersRouter)
app.use(envelopesRouter)
app.use(transactionsRouter)

export { app }
