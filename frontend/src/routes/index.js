import * as React from 'react'
import { 
  Navigate,
  Route, 
  Routes,
  useLocation
} from 'react-router-dom'

import { useAuth } from '../contexts/auth'

import { HOME_PATH, LOGIN_PATH, SIGNUP_PATH } from './routesPath'
import routesList from './routesList'
import Header from '../components/Header'
import PageNotFound from '../components/pageNotFound'

const AppRoutes = () => {
  const { token } = useAuth()
  const location = useLocation()

  const getComponent = ({ path, auth, component }) => {
    if (token && [SIGNUP_PATH, LOGIN_PATH].includes(path)) {
      return <Navigate to={HOME_PATH} replace state={{ from: location }} />
    }

    return (
      auth 
        ? (
            token 
            ? component 
            : <Navigate to={LOGIN_PATH} replace state={{ from: location }} />
          )
        : component
    )
  }

  const renderRoutes = (routesList) => {
    return routesList.map(({ path, component, auth, childrens }) => {
      const validComponent = getComponent({ path, auth, component })

      if (childrens?.length) {
        return (
          <Route 
            path={path} 
            element={validComponent} 
            key={path}
          >
            {renderRoutes(childrens)}
          </Route>
        )
      }

      else {
        return (
          <Route 
            path={path} 
            element={validComponent} 
            key={path}
          />
        )
      }
    })
  }

  return (
    <Routes>
      <Route path={'/'} element={<Header/>}>
        { renderRoutes(routesList) }
        <Route path='/' element={<Navigate to={ token ? HOME_PATH : LOGIN_PATH} />}/>
        <Route path='*' element={<PageNotFound/>} />
      </Route>  
    </Routes> 
  )
}

export default AppRoutes
