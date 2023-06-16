import { ACCESS_TOKEN_CACHE_KEY, USER_DETAILS_CACHE_KEY } from './constants'

export const getCountries = () => {
  return [
    { label: 'INDIA', value: 'INDIA' },
    { label: 'USA', value: 'USA' },
    { label: 'Canada', value: 'Canada' },
    { label: 'UK', value: 'UK' },
  ]
}

export const getUserDetails = () => {
  const userInfo = localStorage.getItem(USER_DETAILS_CACHE_KEY)
  return userInfo ? JSON.parse(userInfo) : null
}

export const setUserDetails = (userDetails) => {
  localStorage.setItem(USER_DETAILS_CACHE_KEY, JSON.stringify(userDetails))
}

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_CACHE_KEY)
}

export const setAccessToken = (accessToken) => {
  localStorage.setItem(ACCESS_TOKEN_CACHE_KEY, accessToken)
}

export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_CACHE_KEY)
}

export const removeUserDetails = () => {
  localStorage.removeItem(USER_DETAILS_CACHE_KEY)
}

export const parseJwt = (token) => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload =  decodeURIComponent(
                        window.atob(base64).split('')
                        .map((c) => {
                          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                        }
                      ).join(''))

  const payload = JSON.parse(jsonPayload)
  delete payload.exp
  delete payload.iat
  return payload
}

export const getAuthHeader = () => {
  const accessToken = getAccessToken()
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }
}

export const getFirstChar = (str) => {
  if (!str) return
  return str[0].toUpperCase()
}
