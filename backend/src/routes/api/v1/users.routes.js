import express from 'express'
import UsersController from '../../../controllers/users.controller'
import isAuthenticated from '../../../middlewares/authenticationMiddleware'

const usersRoutes = express.Router()

usersRoutes.route('/login').post(UsersController.login)
usersRoutes.route('/signup').post(UsersController.signup)
usersRoutes.route('/').get(isAuthenticated, UsersController.userDetails)
usersRoutes.route('/details').put(isAuthenticated, UsersController.updateDetails)

export default usersRoutes
