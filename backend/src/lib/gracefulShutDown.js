import { sequelize } from '../db/models'

export default async function gracefulShutDown (signal) {
  try {
    await sequelize.close()
    console.log(`Received ${signal}`)
  } catch (err) {
    console.log('GraceFull ShutDown Failed', err)
  }
  process.exit(0)
}
