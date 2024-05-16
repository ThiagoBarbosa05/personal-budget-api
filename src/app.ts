import express, { Application, NextFunction, Request, Response } from 'express'
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

const allowedOrigins: string[] = [
  'http://localhost:3000',
  'https://personal-budget-web.vercel.app',
]

const corsOptions: cors.CorsOptions = {
  origin: (origin: any, callback: any) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}

app.use(cors(corsOptions))

app.use(cookieParser())

app.use(express.urlencoded({ extended: true }))

app.use(usersRouter)
app.use(envelopesRouter)
app.use(transactionsRouter)
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
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
