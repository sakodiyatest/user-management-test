import express from 'express'
import contextMiddleware from '../middlewares/contextMiddleware'
import apiRoutes from './api'

const args = { mergeParams: true }
const router = express.Router(args)

router.use('/api', contextMiddleware, apiRoutes)

export default router
