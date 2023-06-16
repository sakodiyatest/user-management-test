import React, { useState } from 'react'
import { useNavigate } from 'react-router'

import {  
  IconButton,
  Avatar, 
  Menu, 
  MenuItem 
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import {
  USER_SETTINGS_TEXT,
  USER_LOGOUT_TEXT,
  LOGOUT_ACTION_TYPE
} from '../../utils/constants'
import { getFirstChar } from '../../utils/helper'

import { LOGIN_PATH, ACCOUNT_SETTINGS_PATH } from '../../routes/routesPath'
import { useAuth } from '../../contexts/auth'

const CustomMenuItems = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const { userDetails, dispatch } = useAuth()
  const navigate = useNavigate()
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const logout = () => {
    dispatch({ type: LOGOUT_ACTION_TYPE })
    navigate(LOGIN_PATH)
  }

  return (
    <div>
      <IconButton color="inherit" onClick={handleMenuOpen}>
        <Avatar 
          alt='profile-pic-text'
        >
          {getFirstChar(userDetails?.firstName)}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        id={'menu'}
        className='menu'
        open={!!anchorEl}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => navigate(ACCOUNT_SETTINGS_PATH)}>
          <AccountCircleIcon className='mr-8' />
          {USER_SETTINGS_TEXT}
        </MenuItem>
        <MenuItem onClick={logout}>
          <ExitToAppIcon className='mr-8' />
          {USER_LOGOUT_TEXT}
        </MenuItem>
      </Menu>
    </div>
  )
}

export default CustomMenuItems
