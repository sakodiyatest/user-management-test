import { useMutation } from '@tanstack/react-query'

import axiosInstance from '../../lib/apiClient'
import { RESOURCES_URL_PATHS } from '../constants'

const USERS_RESOURCE_PATH = RESOURCES_URL_PATHS.USERS.PATH
const USER_SIGNUP = RESOURCES_URL_PATHS.USERS.SIGNUP

const Signup = () => (
  useMutation((userData) => axiosInstance.post(`/${USERS_RESOURCE_PATH}/${USER_SIGNUP}`, userData))
)

export default Signup