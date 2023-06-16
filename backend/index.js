import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { createServer } from 'http'

import './src/json-schemas'
import config from './src/config/app'
import gracefulShutDown from './src/lib/gracefulShutDown'
import Logger from './src/common/logger'
import onHealthCheck from './src/lib/onHealthCheck'
import routes from './src/routes'
import errorHandlerMiddleware from './src/middlewares/errorHandlerMiddleware'

const app = express()

const httpServer = createServer(app)

app.use(bodyParser.json())

app.use(morgan('tiny'))

app.use('/health-check', async (_, res) => {
  try {
    const response = await onHealthCheck()
    res.json(response)
  } catch (error) {
    res.status(503)
    res.send()
  }
})

// CORS Configuration
const whitelist = config.get('webApp.whitelist')
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET, POST, PUT, PATCH, DELETE']
}

app.use(cors(corsOptions))

app.use(routes)

app.use(async (req, res) => {
  res.status(404).json({ status: 'Not Found' })
})

app.use(errorHandlerMiddleware)

httpServer.listen({ port: config.get('port') }, () => {
  Logger.info('Server Started', { message: `Listening On ${config.get('port')}` })
})

process.on('SIGTERM', gracefulShutDown)
process.on('SIGINT', gracefulShutDown)
