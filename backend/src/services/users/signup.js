import bcrypt from 'bcrypt'

import ajv from '../../lib/ajv'
import ServiceBase from '../../common/serviceBase'
import config from '../../config/app'
import { ERRORS } from '../../common/errors/errorsMapping'

const schema = {
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string', format: 'email' },
    country: { type: 'string' },
    password: { type: 'string' }
  },
  required: ['firstName', 'lastName', 'email', 'country', 'password']
}

const constraints = ajv.compile(schema)

export default class Signup extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { firstName, lastName, email, password, country } = this.args
    const { dbModels: { User } } = this.context

    const userDetails = await User.findOne({ where: { email } })
    if (userDetails) return

    if (!password) {
      return this.addError(ERRORS.PasswordError)
    }

    const HASHING_ROUNDS = config.get('bcrypt.hashingRounds')
    const hashedPassword = await bcrypt.hash(password, HASHING_ROUNDS)
    await User.create({ firstName, lastName, email, password: hashedPassword, country })

    return { message: 'User created successfully' }
  }
}
