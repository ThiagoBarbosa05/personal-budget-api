import express, { Application, NextFunction, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import { usersRouter } from './routes/users-router'
import { envelopesRouter } from './routes/envelopes-router'
import { transactionsRouter } from './routes/transactions-router'
import { InsufficientFundsToTransfer } from './use-cases/errors/insufficient-funds-to-transfer'

const app: Application = express()

app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())

app.use(usersRouter)
app.use(envelopesRouter)
app.use(transactionsRouter)

app.use((err: Error, _, res: Response, next: NextFunction) => {
  if (err instanceof InsufficientFundsToTransfer) {
    res.json({
      error: err.message,
      stack: err.stack,
    })
  }

  next()
})

export { app }
