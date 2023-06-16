const convict = require('convict')
const dotenv = require('dotenv')
const fs = require('fs')

if (fs.existsSync('.env')) {
  const envConfig = dotenv.parse(fs.readFileSync('.env'))

  for (const key in envConfig) {
    process.env[key] = envConfig[key]
  }
}

const config = convict({
  app: {
    name: {
      doc: 'Name of the service',
      format: String,
      default: 'backend'
    }
  },

  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },

  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 8080,
    env: 'PORT'
  },

  db: {
    name: {
      doc: 'Database Name',
      format: String,
      default: 'user-management-test',
      env: 'DB_NAME'
    },
    username: {
      doc: 'Database user',
      format: String,
      default: 'postgres',
      env: 'DB_USERNAME'
    },
    password: {
      doc: 'Database password',
      format: '*',
      default: 'postgres',
      env: 'DB_PASSWORD'
    },
    host: {
      doc: 'DB host',
      format: String,
      default: '127.0.0.1',
      env: 'DB_HOST'
    },
    port: {
      doc: 'DB PORT',
      format: 'port',
      default: '5432',
      env: 'DB_PORT'
    }
  },

  log_level: {
    doc: 'level of logs to show',
    format: String,
    default: 'debug',
    env: 'LOG_LEVEL'
  },

  jwt: {
    loginTokenSecret: {
      doc: 'JWT Secret Key',
      format: String,
      default: 'secretkey',
      env: 'JWT_LOGIN_SECRET'
    },
    loginTokenExpiry: {
      doc: 'JWT Expiry time',
      format: String,
      default: '1d',
      env: 'JWT_LOGIN_TOKEN_EXPIRY'
    }

  },

  bcrypt: {
    hashingRounds: {
      doc: 'Bcrypt Hashing rounds',
      format: Number,
      default: 10,
      env: 'HASHING_ROUNDS'
    }
  },

  webApp: {
    whitelist: {
      default: ["localhost"],
      format: Array,
      env: 'WHITELIST'
    }
  }
})

config.validate({ allowed: 'strict' })

module.exports = config
