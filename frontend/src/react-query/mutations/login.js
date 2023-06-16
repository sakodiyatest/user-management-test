import { useMutation } from '@tanstack/react-query'

import axiosInstance from '../../lib/apiClient'
import { RESOURCES_URL_PATHS } from '../constants'

const USERS_RESOURCE_PATH = RESOURCES_URL_PATHS.USERS.PATH
const USERS_LOGIN = RESOURCES_URL_PATHS.USERS.LOGIN

const Login = () => (
  useMutation((userData) => axiosInstance.post(`/${USERS_RESOURCE_PATH}/${USERS_LOGIN}`, userData))
)

export default Login