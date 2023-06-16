import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'

import config from '../config/app'
import { errorAttributeToErrorMapping, ERRORS } from '../common/errors/errorsMapping'

const isAuthenticated = async (req, res, next) => {
  try {
    const jwtToken = req.headers.authorization?.split(' ')[1]
    if (!jwtToken) {
      throw ERRORS.InvalidTokenError
    }
    let decodedJWT = {}
    jwt.verify(
      jwtToken,
      config.get('jwt.loginTokenSecret'),
      (_err, decoded) => {
        if (_err || !decoded) {
           throw ERRORS.InvalidTokenError
        }
        decodedJWT = decoded
      }
    )
    req.body.decodedJWT = decodedJWT
    next()
  } catch (err) {
    const error = errorAttributeToErrorMapping[err]
    return next(error)
  }
}

export default isAuthenticated
