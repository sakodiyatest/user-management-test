import ajv from '../../lib/ajv'

const requestBodySchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    country: { type: 'string' },
    password: { type: 'string' },
    newPassword: {type: 'string'}
  },
}

const responseSchema = {
  type: 'object',
  properties: {
    message: { type: 'string' },
    userDetails: {
      type: 'object',
      properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        country: { type: 'string' },
      },
    }
  }
}

ajv.addSchema(requestBodySchema, 'REQUEST-PUT-BODY-/api/v1/users/details')
ajv.addSchema(responseSchema, 'RESPONSE-PUT-/api/v1/users/details')
