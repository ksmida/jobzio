import 'express-async-errors'
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express()
import morgan from 'morgan'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

// Importing routers
import jobRouter from './routes/jobRouter.js'
import authRouter from './routes/authRouter.js'

// Middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js'
import { authenticateUser } from './middleware/authMiddleware.js'

// Enable logging in development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Parse cookies
app.use(cookieParser())

// Parse incoming JSON requests
app.use(express.json())

// Default route to check server status
app.get('/', (req, res) => {
  res.send('Hello greatest programmer alive')
})

// Mounting jobRouter router
app.use('/api/v1/jobs', authenticateUser, jobRouter)

// Mounting authRouter router
app.use('/api/v1/auth', authRouter)

// Catch-all for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' })
})

// Express error handling middleware
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

// Connect to MongoDB and start the server
try {
  await mongoose.connect(process.env.MONGO_URL)
  app.listen(port, () => {
    console.log(`server is running on PORT ${port}...`)
  })
} catch (error) {
  console.log(error)
  process.exit(1)
}
