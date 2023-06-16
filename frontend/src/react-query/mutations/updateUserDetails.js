import { useMutation } from '@tanstack/react-query'

import axiosInstance from '../../lib/apiClient'
import { RESOURCES_URL_PATHS } from '../constants'
import { getAuthHeader } from '../../utils/helper'

const USERS_RESOURCE_PATH = RESOURCES_URL_PATHS.USERS.PATH
const USER_DETAILS= RESOURCES_URL_PATHS.USERS.UPDATE_DETAILS

const UpdateUserDetails = () => (
  useMutation((userData) => axiosInstance.put(`/${USERS_RESOURCE_PATH}/${USER_DETAILS}`, userData, getAuthHeader()))
)

export default UpdateUserDetails