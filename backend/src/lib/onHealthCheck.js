import Logger from '../common/logger'
import { sequelize } from '../db/models'

export default async () => {
  let healthy = true

  try {
    await sequelize.authenticate()
    Logger.info('HealthCheck', { message: 'Database Connection: has been established successfully.' })
  } catch (error) {
    healthy = false
    Logger.error('HealthCheck', { message: 'Database Connection: Failed to connect', exception: error })
    throw error
  }

  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  }

  if (healthy) {
    return healthCheck
  } else {
    throw new Error()
  }
}
