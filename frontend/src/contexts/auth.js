import React, { 
  createContext,  
  useContext,
  useEffect,
  useReducer
} from 'react'

import { 
  getAccessToken, 
  parseJwt, 
  removeAccessToken, 
  setAccessToken, 
  setUserDetails,
  removeUserDetails,
  getUserDetails
} from '../utils/helper'
import { 
  LOGIN_ACTION_TYPE,
  LOGOUT_ACTION_TYPE,
  UPDATE_ACTION_TYPE
} from '../utils/constants'

const AuthContext = createContext()

const userReducer = (state, action) => {
  switch(action.type) {
    case LOGIN_ACTION_TYPE: {
      const token = action.paylod.token
      let userDetails = getUserDetails()
      if (!userDetails) {
        userDetails = parseJwt(token)
        setUserDetails(userDetails)
      }
      
      setAccessToken(token)
      return { token, userDetails }
    }
    case LOGOUT_ACTION_TYPE: {
      removeAccessToken()
      removeUserDetails()
      return { token: null, userDetails: null }
    }
    case UPDATE_ACTION_TYPE: {
      const userDetails = action.payload.userDetails
      setUserDetails(userDetails)
      return {
        ...state,
        userDetails
      }
    }
    default: 
      return state
  }
}

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    token: getAccessToken() || null,
    userDetails: getUserDetails() || null
  })

  useEffect(() => {
    const token = getAccessToken()
    if (token) {
      dispatch({ 
        type: LOGIN_ACTION_TYPE, 
        paylod: { 
          token
        } 
      })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider Component')
  }

  return context
}

export { AuthProvider, useAuth, AuthContext }
