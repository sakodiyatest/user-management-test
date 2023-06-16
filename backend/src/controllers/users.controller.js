import { CreateUserError, InvalidCredentialsError, UserNotExistError } from '../common/errors/errorTypes'
import { Login, Signup, UpdateDetails, UserDetails } from '../services/users'
import { sendResponse } from '../utils/responseHelper'

/**
 * Users Controller for handling all the request of /users path
 *
 * @export
 * @class UsersController
 */
export default class UsersController {
  /**
   * Controller method to handle the POST request for /signup path
   *
   * @static
   * @param {object} req - object contains all the request params sent from the client
   * @param {object} res - object contains all the response params sent to the client
   * @param {function} next - function to execute next middleware
   * @memberof UsersController
   */
  static async signup (req, res, next) {
    try {
      const { result, successful, errors } = await Signup.execute(req.body, req.context)
      sendResponse({ req, res, next }, { successful, result, serviceErrors: errors, defaultError: CreateUserError })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Controller method to handle the POST request for /login path
   *
   * @static
   * @param {object} req - object contains all the request params sent from the client
   * @param {object} res - object contains all the response params sent to the client
   * @param {function} next - function to execute next middleware
   * @memberof UsersController
   */
  static async login (req, res, next) {
    try {
      const { result, successful, errors } = await Login.execute(req.body, req.context)
      sendResponse({ req, res, next }, { successful, result, serviceErrors: errors, defaultError: InvalidCredentialsError })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Controller method to handle the GET request for / path
   *
   * @static
   * @param {object} req - object contains all the request params sent from the client
   * @param {object} res - object contains all the response params sent to the client
   * @param {function} next - function to execute next middleware
   * @memberof UsersController
   */
  static async userDetails (req, res, next) {
    try {
      const { result, successful, errors } = await UserDetails.execute(req.body, req.context)
      sendResponse({ req, res, next }, { successful, result, serviceErrors: errors, defaultError: UserNotExistError })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Controller method to handle the PUT request for /details path
   *
   * @static
   * @param {object} req - object contains all the request params sent from the client
   * @param {object} res - object contains all the response params sent to the client
   * @param {function} next - function to execute next middleware
   * @memberof UsersController
   */
  static async updateDetails (req, res, next) {
    try {
      const { result, successful, errors } = await UpdateDetails.execute(req.body, req.context)
      sendResponse({ req, res, next }, { successful, result, serviceErrors: errors, defaultError: InvalidCredentialsError })
    } catch (error) {
      next(error)
    }
  }
}
