import _ from 'lodash'
import { StatusCodes } from 'http-status-codes'
import errorUtils from '../common/errors/errorUtils'
import { InternalServerError, NonOperationalError } from '../common/errors/errorTypes'

export default function errorHandlerMiddleware (err, req, res, next) {
  if (!(err instanceof Array)) {
    err = [err]
  }

  if (err instanceof Array && !_.isEmpty(err)) {
    let errorsAreTrusted = true
    let responseStatusCode
    const responseErrors = []

    err.forEach(error => {
      if (!errorUtils.isTrustedError(error)) {
        req.context.logger.error(
          error.name || NonOperationalError.name,
          {
            message: error.message,
            context: { traceId: req.context.traceId },
            fault: {
              query: req.query,
              params: req.params,
              body: req.body
            }
          })
        errorsAreTrusted = false
      }
      responseStatusCode = error.statusCode
      responseErrors.push(_.pick(error, ['name', 'description', 'errorCode', 'fields']))
    })

    if (!errorsAreTrusted) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({
          data: {},
          errors: [{
            traceId: req.context.traceId,
            ..._.pick(InternalServerError, ['name', 'description', 'errorCode'])
          }]
        })
    } else if (errorsAreTrusted) {
      res.status(responseStatusCode || StatusCodes.BAD_REQUEST).send({ data: {}, errors: responseErrors })
    }
  } else {
    req.context.logger.error(
      err.name || NonOperationalError.name,
      {
        message: 'Empty errors array passed',
        context: { traceId: req.context.traceId },
        fault: {
          query: req.query,
          params: req.params,
          body: req.body
        }
      })
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({
        data: {},
        errors: [{
          traceId: req.context.traceId,
          ..._.pick(InternalServerError, ['name', 'description', 'errorCode'])
        }]
      })
  }
}
