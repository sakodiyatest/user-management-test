import ajv from '../../lib/ajv'

const requestBodySchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string', format: 'email' },
    country: { type: 'string' },
    password: { type: 'string' }
  },
  required: ['firstName', 'lastName', 'email', 'password']
}

const responseSchema = {
  type: 'object',
  properties: {
    message: { type: 'string' }
  }
}

ajv.addSchema(requestBodySchema, 'REQUEST-POST-BODY-/api/v1/users/signup')
ajv.addSchema(responseSchema, 'RESPONSE-POST-/api/v1/users/signup')
