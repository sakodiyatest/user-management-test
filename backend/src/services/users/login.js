import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import ajv from '../../lib/ajv'
import ServiceBase from '../../common/serviceBase'
import config from '../../config/app'

import { ERRORS } from '../../common/errors/errorsMapping'

const schema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string' }
  },
  required: ['email', 'password']
}

const constraints = ajv.compile(schema)

export default class Login extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { email, password } = this.args
    const { dbModels: { User } } = this.context

    const userDetails = await User.findOne({ where: { email }, raw: true })
    if (!userDetails) {
      return this.addError(ERRORS.InvalidUserCredentials)
    }

    const isPasswordMatched = await bcrypt.compare(password, userDetails.password)

    if (!isPasswordMatched) {
      return this.addError(ERRORS.InvalidUserCredentials)
    }

    const accessToken = await jwt.sign(
      {
        email,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        country: userDetails.country
      },
      config.get('jwt.loginTokenSecret'),
      { expiresIn: config.get('jwt.loginTokenExpiry') }
    )

    return { message: 'User loggedIn successfully' , accessToken }
  }
}
