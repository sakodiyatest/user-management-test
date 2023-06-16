import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import BaseError from './baseError'

export default class RequestInputValidationError extends BaseError {
  constructor (fields = {}) {
    const name = 'RequestInputValidationError'
    const statusCode = StatusCodes.BAD_REQUEST
    const isOperational = true
    const description = ReasonPhrases.BAD_REQUEST

    super(name, statusCode, isOperational, description)
    this.fields = fields
    this.errorCode = 2000
  }
}
