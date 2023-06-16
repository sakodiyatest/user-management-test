import { useQuery } from '@tanstack/react-query'

import axiosInstance from '../../lib/apiClient'
import { getAuthHeader } from '../../utils/helper'

import { GET_USER_DETAILS_QUERY_KEY, RESOURCES_URL_PATHS } from '../constants'

const FETCH_USER_DETAILS_URL = `/${RESOURCES_URL_PATHS.USERS.PATH}`
const queryKey = [ GET_USER_DETAILS_QUERY_KEY ]

export const getFetchUserDetailsQuery = () => {
  const queryFn = async () => {
    const result = await axiosInstance.get(FETCH_USER_DETAILS_URL, getAuthHeader())
    return result.data
  }

  return {
    queryFn,
  }
}

export const useFetchUserDetailsQuery = () => {
  const { queryFn } = getFetchUserDetailsQuery()

  const query = useQuery(queryKey, {
    queryFn,
    staleTime: Infinity,
    refetchOnWindowFocus: false
  })

  return query
}
