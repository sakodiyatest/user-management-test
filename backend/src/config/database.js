const config = require('./app')

module.exports = {
  development: {
    username: config.get('db.username'),
    password: config.get('db.password'),
    database: config.get('db.name'),
    host: config.get('db.host'),
    port: config.get('db.port'),
    dialect: 'postgres',
    dialectOptions: {
      application_name: 'backend'
    },
    define: {
      underscored: true,
      timestamps: true
    },
    pool: {
      max: 50,
      min: 0,
      idle: 5000,
      evict: 5000,
      acquire: 200000
    }
  },
  test: {
    username: config.get('db.username'),
    password: config.get('db.password'),
    database: config.get('db.name'),
    host: config.get('db.host'),
    port: config.get('db.port'),
    dialect: 'postgres',
    dialectOptions: {
      application_name: 'backend'
    },
    define: {
      underscored: true,
      timestamps: true
    },
    pool: {
      max: 50,
      min: 0,
      idle: 5000,
      evict: 5000,
      acquire: 200000
    }
  },
  staging: {
    username: config.get('db.username'),
    password: config.get('db.password'),
    database: config.get('db.name'),
    host: config.get('db.host'),
    port: config.get('db.port'),
    dialect: 'postgres',
    dialectOptions: {
      application_name: 'backend'
    },
    define: {
      underscored: true,
      timestamps: true
    },
    pool: {
      max: 50,
      min: 0,
      idle: 5000,
      evict: 5000,
      acquire: 200000
    }
  },
  production: {
    username: config.get('db.username'),
    password: config.get('db.password'),
    database: config.get('db.name'),
    host: config.get('db.host'),
    port: config.get('db.port'),
    dialect: 'postgres',
    dialectOptions: {
      application_name: 'backend'
    },
    define: {
      underscored: true,
      timestamps: true
    },
    pool: {
      max: 50,
      min: 0,
      idle: 5000,
      evict: 5000,
      acquire: 200000
    }
  }
}
