import express from 'express'
import v1Routes from './v1'

const apiRouter = express.Router({ mergeParams: true })

apiRouter.use('/v1', v1Routes)

export default apiRouter
