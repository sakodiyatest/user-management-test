import bcrypt from 'bcrypt'
import ServiceBase from '../../common/serviceBase'
import ajv from '../../lib/ajv'
import config from '../../config/app'
import { ERRORS } from '../../common/errors/errorsMapping'

const schema = {
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    country: { type: 'string' },
    password: { type: 'string' },
    newPassword: { type: 'string' },
    decodedJWT: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' }
      },
      required: ['email']
    }
  },
  required: ['decodedJWT']
}

const constraints = ajv.compile(schema)

export default class UpdateDetails extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { firstName, lastName, country, password, newPassword, decodedJWT: { email } } = this.args
    const { dbModels: { User } } = this.context

    const user = await User.findOne({ where: { email } })
    if (!user) return this.addError(ERRORS.UserNotExistError)

    const updatedDetails = {}
    if (firstName) updatedDetails.firstName = firstName
    if (lastName) updatedDetails.lastName = lastName
    if (country) updatedDetails.country = country
    if (password) {
      const valid = await bcrypt.compare(password, user.password)
      if (!valid) return
      if (!newPassword) {
        return this.addError(ERRORS.PasswordError)
      }

      const HASHING_ROUNDS = config.get('bcrypt.hashingRounds')
      const hashedPassword = await bcrypt.hash(newPassword, HASHING_ROUNDS)
      updatedDetails.password = hashedPassword
    }

    await user.update(updatedDetails)
    delete updatedDetails.password

    return { message: 'User details updated', userDetails: updatedDetails }
  }
}
