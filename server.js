import 'express-async-errors'
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express()
import morgan from 'morgan'
import mongoose from 'mongoose'
import { body, validationResult } from 'express-validator'

// Importing routers
import jobRouter from './routes/jobRouter.js'

// Middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js'

// Enable logging in development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json()) // Parse incoming JSON requests

// Default route to check server status
app.get('/', (req, res) => {
  res.send('Hello greatest programmer alive')
})

// Mounting jobRouter router
app.use('/api/v1/jobs', jobRouter)

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
