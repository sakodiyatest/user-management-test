import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import BaseError from './baseError'

export default class CustomError extends BaseError {
  constructor ({ name, statusCode = StatusCodes.INTERNAL_SERVER_ERROR, isOperational = true, description = ReasonPhrases.INTERNAL_SERVER_ERROR, errorCode }) {
    super(name, statusCode, isOperational, description)
    this.errorCode = errorCode
  }
}
