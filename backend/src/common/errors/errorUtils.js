import BaseError from './baseError'

function isTrustedError (error) {
  if (error instanceof BaseError) {
    return error.isOperational
  }
  return false
}

const errorUtils = {
  isTrustedError
}

export default errorUtils
