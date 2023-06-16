import React from 'react'

import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
} from '@material-ui/core'
import { useNavigate, Outlet } from 'react-router'

import {
  MENU_LOGIN_TEXT,
  APP_NAME,
  MENU_SIGNUP_TEXT,
  MENU_USER_ACCOUNT_SETTINGS_TEXT
} from '../../utils/constants'
import { 
  LOGIN_PATH, 
  SIGNUP_PATH, 
  ACCOUNT_SETTINGS_PATH 
} from '../../routes/routesPath'

import { useAuth } from '../../contexts/auth'
import CustomMenuItems from './customMenuItems'

import './header.scss'

const Header = () => {
  const { token } = useAuth()

  const navigate = useNavigate()

  return (
    <div className='header-container'>
      <AppBar position="relative" className='header'>
        <Toolbar className='toolbar'>
          <Typography variant="h6" style={{ flexGrow: 1 }} className='title'>
            {APP_NAME}
          </Typography>
          {
            token
            ? <>
                <Button 
                  color="inherit" 
                  id='settings'
                  className='button mr-15'
                  onClick={()=> navigate(ACCOUNT_SETTINGS_PATH)}
                >
                  {MENU_USER_ACCOUNT_SETTINGS_TEXT}
                </Button>
                <CustomMenuItems />
              </>
            : <>
                <Button 
                  color="inherit" 
                  id='login'
                  className='button'
                  onClick={()=> navigate(LOGIN_PATH)}
                >
                  {MENU_LOGIN_TEXT}
                </Button>
                <Button 
                  color="inherit"
                  id='signup' 
                  className='button'
                  onClick={()=> navigate(SIGNUP_PATH)}
                >
                  {MENU_SIGNUP_TEXT}
                </Button>
              </>
          }  
        </Toolbar>
      </AppBar>
      <div className='routes-content'>
        <Outlet/>
      </div>
    </div>
  )
}

export default React.memo(Header)
