import ServiceBase from '../../common/serviceBase'
import ajv from '../../lib/ajv'

const schema = {
  type: 'object',
  properties: {
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

export default class UserDetails extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { decodedJWT: { email } } = this.args
    const { dbModels: { User } } = this.context

    const userDetails = await User.findOne({
      where: { email },
      attributes: ['firstName', 'lastName', 'email', 'country'],
      raw: true
    })
    if (!userDetails) return

    return { message: 'User details', userDetails }
  }
}
