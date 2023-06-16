import ajv from '../../lib/ajv'

const responseSchema = {
  type: 'object',
  properties: {
    message: { type: 'string' },
    userDetails: {
      type: 'object',
      properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string', format: 'email' },
        country: { type: 'string' },
      },
      required: ['firstName', 'lastName', 'email']
    }
  }
}

ajv.addSchema(responseSchema, 'RESPONSE-GET-/api/v1/users/')
