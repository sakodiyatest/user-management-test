import { StatusCodes } from 'http-status-codes'
import APIError from '../common/errors/apiError'
import ajv from '../lib/ajv'

export default function responseValidationMiddleware (req, res, next) {
  const responseSchema = ajv.getSchema(`RESPONSE-${req.method}-${req.baseUrl + req.path}`)
  if (responseSchema) {
    if (responseSchema(res.payload?.data)) {
      res.status(req.context.statusCode || StatusCodes.OK).json({ ...res.payload })
    } else {
      // For programmatic errors
      const apiError = new APIError('Internal', undefined, false)
      next(apiError)
    }
  } else {
    res.status(req.context.statusCode || StatusCodes.OK).json({ ...res.payload })
  }
}
