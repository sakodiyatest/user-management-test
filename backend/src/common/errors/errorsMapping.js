import CustomError from '../errors/customError'
import {
  CreateUserError,
  InvalidCredentialsError,
  InvalidTokenError,
  PasswordError,
  UserNotExistError,
  InvalidUserCredentials
} from '../errors/errorTypes'

export const errorAttributeToErrorMapping = {
  InvalidTokenError: new CustomError({ ...InvalidTokenError }),
  InvalidCredentialsError: new CustomError({ ...InvalidCredentialsError }),
  CreateUserError: new CustomError({ ...CreateUserError }),
  PasswordError: new CustomError({ ...PasswordError }),
  UserNotExistError: new CustomError({ ...UserNotExistError }),
  InvalidUserCredentials: new CustomError({ ...InvalidUserCredentials })
}

export const ERRORS = {
  InvalidTokenError: 'InvalidTokenError',
  InvalidCredentialsError: 'InvalidCredentialsError',
  CreateUserError: 'CreateUserError',
  PasswordError: 'PasswordError',
  UserNotExistError: 'UserNotExistError',
  InvalidUserCredentials: 'InvalidUserCredentials'
}
