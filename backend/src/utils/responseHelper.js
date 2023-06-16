import _ from 'lodash'

import CustomError from '../common/errors/customError'
import { errorAttributeToErrorMapping } from '../common/errors/errorsMapping'
import { InternalServerError } from '../common/errors/errorTypes'

export const extractErrorAttributes = (errors) => {
  const errorAttributes = []
  for (const serviceName in errors) {
    if (Object.hasOwnProperty.call(errors, serviceName)) {
      const serviceErrors = errors[serviceName]
      for (const errAttr in serviceErrors) {
        if (Object.hasOwnProperty.call(serviceErrors, errAttr)) {
          errorAttributes.push(errAttr)
        }
      }
    }
  }
  return errorAttributes
}

export const sendResponse = ({ req, res, next }, { successful, result, serviceErrors, defaultError = InternalServerError }) => {
  if (successful && !_.isEmpty(result)) {
    res.payload = { data: result, errors: [] }
    next()
  } else {
    if (!_.isEmpty(serviceErrors)) {
      // executed in case error was added using addError from a service
      const responseErrors = extractErrorAttributes(serviceErrors).map(errorAttr => errorAttributeToErrorMapping[errorAttr] || errorAttr)
      return next(responseErrors)
    }
    const responseError = new CustomError({ ...defaultError })
    next(responseError)
  }
}
