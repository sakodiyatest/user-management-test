import Logger from '../common/logger'
import models, { sequelize } from '../db/models'

export default function contextMiddleware (req, res, next) {
  req.context = {}
  req.context.sequelize = sequelize
  req.context.dbModels = models

  req.context.logger = Logger
  next()
}
