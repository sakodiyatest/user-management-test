import * as React from 'react'

import Login from '../components/Login'
import Signup from '../components/Signup'
import withSuspenseFallback from '../components/Hoc/withSuspenseFallback'

import {
  HOME_PATH,
  ACCOUNT_PATH,
  LOGIN_PATH,
  SIGNUP_PATH,
  ACCOUNT_SETTINGS_SUB_PATH,
  PASSWORD_SETTINGS_SUB_PATH
} from './routesPath'

const Home = React.lazy(() => import('../components/Home'))
const UserAccountSettings = React.lazy(() => import('../components/AccountSetting'))
const AccountSettings = React.lazy(() => import('../components/AccountSetting/accountSettings'))
const ChangePassword = React.lazy(() => import('../components/AccountSetting/changePassword'))

const routesList = [
  {
    name: 'Home',
    path: HOME_PATH,
    component: <Home/>,
    auth: true
  },
  {
    name: 'Login',
    path: LOGIN_PATH,
    component: <Login />,
    auth: false
  },
  {
    name: 'Signup',
    path: SIGNUP_PATH,
    component: <Signup />,
    auth: false
  },
  {
    name: 'Account Settings',
    path: ACCOUNT_PATH,
    component: withSuspenseFallback(<UserAccountSettings/>),
    auth: true,
    childrens: [
      {
        name: 'Settings',
        path: ACCOUNT_SETTINGS_SUB_PATH,
        component: withSuspenseFallback(<AccountSettings/>),
        auth: true
      },
      {
        name: 'Change Password',
        path: PASSWORD_SETTINGS_SUB_PATH,
        component: withSuspenseFallback(<ChangePassword />),
        auth: true
      }
    ]
  }
]

export default routesList