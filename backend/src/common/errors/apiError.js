import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import BaseError from './baseError'

export default class APIError extends BaseError {
  constructor (name, statusCode = StatusCodes.INTERNAL_SERVER_ERROR, isOperational = false, description = ReasonPhrases.INTERNAL_SERVER_ERROR) {
    super(name, statusCode, isOperational, description)
  }
}
