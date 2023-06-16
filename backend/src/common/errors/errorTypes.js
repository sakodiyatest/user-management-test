import { StatusCodes } from 'http-status-codes'

export const InternalServerError = {
  name: 'InternalServerError',
  statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  isOperational: false,
  description: 'Internal Server Error',
  errorCode: 600
}

export const InvalidCredentialsError = {
  name: 'InvalidCredentials',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description: 'Credentials does not match',
  errorCode: 602
}

export const NonOperationalError = {
  name: 'NonOperationalError',
  statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  isOperational: false,
  description: 'Error occurred on server',
  errorCode: 606
}

export const InvalidTokenError = {
  name: 'InvalidToken',
  statusCode: StatusCodes.UNAUTHORIZED,
  isOperational: true,
  description: 'Either access token not passed or it is expired',
  errorCode: 603
}

export const CreateUserError = {
  name: 'CreateUserError',
  statusCode: StatusCodes.CONFLICT,
  isOperational: true,
  description: 'User already exists',
  errorCode: 2001
}

export const PasswordError = {
  name: 'PasswordError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description: 'Password cannot be empty',
  errorCode: 2002
}

export const UserNotExistError = {
  name: 'UserNotExistError',
  statusCode: StatusCodes.NOT_FOUND,
  isOperational: true,
  description: 'User does not exists',
  errorCode: 2003
}

export const InvalidUserCredentials = {
  name: 'InvalidUserCredentials',
  statusCode: StatusCodes.NOT_FOUND,
  isOperational: true,
  description: 'Email or Password is not valid!',
  errorCode: 2004
}
