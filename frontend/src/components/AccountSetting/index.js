import React, { useMemo } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'

import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Container,
} from '@material-ui/core'

import { useAuth } from '../../contexts/auth'
import { getFirstChar } from '../../utils/helper'
import { 
  ACCOUNT_SETTINGS_PATH, 
  PASSWORD_SETTINGS_PATH 
} from '../../routes/routesPath'

import './settings.scss'

const ACCOUNT_LISTING = [
  {
    id: 0,
    name: 'Account Settings',
    path: ACCOUNT_SETTINGS_PATH
  },
  {
    id: 1,
    name: 'Change Password',
    path: PASSWORD_SETTINGS_PATH
  }
]

const UserSettings = () => {
  const { userDetails } = useAuth()
  const location = useLocation()

  const navigate = useNavigate()
  const handleNavigation = (path, id) => {
    navigate(path)
  }

  const ListItems = useMemo(() => {
    return ACCOUNT_LISTING.map(({ path, id, name }) => {
      return (
        <ListItem 
          button 
          selected = {path === location.pathname}
          onClick={() => handleNavigation(path, id)}
          key={id}
        >
          <ListItemText primary={name} />
        </ListItem>
      )
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  return (
    <>
      <div className='account-settings-container'>
        <div className='left-container'>
          <Container>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt='User Avatar'>
                    {getFirstChar(userDetails?.firstName)}
                  </Avatar>  
                </ListItemAvatar>
                <ListItemText 
                  className='capitalize pt-0'
                  primary={`${userDetails?.firstName} ${userDetails?.lastName}`}
                />
              </ListItem>
            </List>
            <Divider />
            <List>
            {ListItems}
            </List>
          </Container>
        </div>
        <div className='right-container'>
          <Outlet/>
        </div>
      </div>
    </>
  )
}

export default UserSettings

