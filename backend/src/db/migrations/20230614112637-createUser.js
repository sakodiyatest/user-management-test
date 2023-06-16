module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'users',
      {
        firstName: {
          type: Sequelize.STRING,
          field: 'first_name',
          allowNull: false
        },
        lastName: {
          type: Sequelize.STRING,
          field: 'last_name',
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false
        },
        country: {
          type: Sequelize.STRING,
          allowNull: false
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DATE,
          field: 'created_at',
          defaultValue: Sequelize.NOW,
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: 'updated_at',
          defaultValue: Sequelize.NOW,
          allowNull: false
        }
      },
      {
        schema: 'public'
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users', { schema: 'public' })
  }
}
