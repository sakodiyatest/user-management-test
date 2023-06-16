export default class BaseError extends Error {
  constructor (name, statusCode, isOperational, description) {
    super(description)
    Object.setPrototypeOf(this, new.target.prototype)

    this.name = name
    this.description = description
    this.statusCode = statusCode
    this.isOperational = isOperational

    Error.captureStackTrace(this)
  }
}
