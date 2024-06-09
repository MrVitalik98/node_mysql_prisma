import express from 'express'
import cookieParser from 'cookie-parser'
import { PrismaClient } from '@prisma/client'
import userRouter from './user/index.js'
import profileRouter from './profile/index.js'

const app = express()
const prisma = new PrismaClient()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// Routes
app.use('/user', userRouter)
app.use('/', profileRouter)

// Error Middleware
import errorMiddleware from "./middlewares/error.middleware.js"
app.use(errorMiddleware)

export { app, prisma }