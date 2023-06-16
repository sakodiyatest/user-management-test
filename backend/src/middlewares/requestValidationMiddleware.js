import ajv from '../lib/ajv'
import RequestInputValidationError from '../common/errors/requestInputValidationError'

export default function requestValidationMiddleware (req, res, next) {
  const querySchema = ajv.getSchema(`REQUEST-${req.method}-QUERY-${req.baseUrl + req.path}`)
  const paramsSchema = ajv.getSchema(`REQUEST-${req.method}-PARAMS-${req.baseUrl + req.path}`)
  const bodySchema = ajv.getSchema(`REQUEST-${req.method}-BODY-${req.baseUrl + req.path}`)

  const errorPayload = {}
  let error = false

  if (querySchema) {
    if (!querySchema(req.query)) {
      error = true
      errorPayload.query = ajv.errorsText(querySchema.errors)
    }
  }

  if (paramsSchema) {
    if (!paramsSchema(req.params)) {
      error = true
      errorPayload.params = ajv.errorsText(paramsSchema.errors)
    }
  }

  if (bodySchema) {
    if (!bodySchema(req.body)) {
      error = true
      errorPayload.body = ajv.errorsText(bodySchema.errors)
    }
  }

  if (error) {
    const validationError = new RequestInputValidationError(errorPayload)
    next(validationError)
  } else {
    next()
  }
}
