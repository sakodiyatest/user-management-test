import express from 'express'
import requestValidationMiddleware from '../../../middlewares/requestValidationMiddleware'
import responseValidationMiddleware from '../../../middlewares/responseValidationMiddleware'
import usersRoutes from './users.routes'

const v1Router = express.Router({ mergeParams: true })

v1Router.use('/users', requestValidationMiddleware, usersRoutes, responseValidationMiddleware)

export default v1Router
