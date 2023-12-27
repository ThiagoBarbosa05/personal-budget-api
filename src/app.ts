import express, { Application, NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import { usersRouter } from './routes/users-router'
import { envelopesRouter } from './routes/envelopes-router'
import { transactionsRouter } from './routes/transactions-router'
import { InsufficientFundsToTransfer } from './use-cases/errors/insufficient-funds-to-transfer'
import { PrismaClient } from '@prisma/client'

const app: Application = express()

const prisma = new PrismaClient()

app.use(bodyParser.json())

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

app.use(cookieParser())

app.use(express.urlencoded({ extended: true }))

app.use(usersRouter)
app.use(envelopesRouter)
app.use(transactionsRouter)

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()

  res.send(users)
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof InsufficientFundsToTransfer) {
    res.json({
      error: err.message,
      stack: err.stack,
    })
  }

  next()
})

export { app }
