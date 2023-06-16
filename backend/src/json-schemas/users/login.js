import ajv from '../../lib/ajv'

const requestBodySchema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string' }
  },
  required: ['email', 'password']
}

const responseSchema = {
  type: 'object',
  properties: {
    message: { type: 'string' },
    accessToken: { type: 'string' }
  },
  required: ['message', 'accessToken']
}

ajv.addSchema(requestBodySchema, 'REQUEST-POST-BODY-/api/v1/users/login')
ajv.addSchema(responseSchema, 'RESPONSE-POST-/api/v1/users/login')
