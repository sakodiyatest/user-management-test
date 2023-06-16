import * as React from 'react'
import { useFormik } from 'formik'

import {
  Box,
  Typography,
  MenuItem,
  TextField
} from '@material-ui/core'
import { LoadingButton } from '@mui/lab'

import { getCountries } from '../../utils/helper'
import { getAccountSettingSchema } from '../../utils/schema'
import { UPDATE_ACTION_TYPE } from '../../utils/constants'

import UpdateUserDetails from '../../react-query/mutations/updateUserDetails'

import { useAuth } from '../../contexts/auth'
import { useSnackBar } from '../../contexts/snackbar'

import './settings.scss'

const countries = getCountries()

const initialValues = {
  firstName: '',
  lastName: '',
  country: '',
}

const AccountSettings = ()=> {
  const { dispatch, userDetails } = useAuth()
  const updateUserDetailsMutation = UpdateUserDetails()
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackBar()

  const {
    errors,
    touched,
    values,
    isSubmitting,
    dirty,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit
  } = useFormik({
    initialValues: {
      ...initialValues,
      ...userDetails
    }, 
    validationSchema: getAccountSettingSchema(),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      updateUserDetailsMutation.mutate(values, {
        onSuccess: () => {
          dispatch({ type: UPDATE_ACTION_TYPE, payload: { userDetails: values } })  
          showSuccessSnackbar({ message: 'User details has been successfully updated' })
        },
        onError: (error) => {
          showErrorSnackbar({ message: error })
        },
        onSettled: () => {
          setSubmitting(false)
          resetForm({ values })
        }
      })
    },
  })
  
  return (
    <div className='account-setting-right-tab'>
      <main>
        <Box>
          <Typography 
            variant='h6' 
            className='account-heading'
          >
            Account Settings
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              label='First Name'
              name='firstName'
              variant='outlined'
              fullWidth
              value={values.firstName}
              className='form-field'
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete='off'
              error={errors.firstName && touched.firstName}
              helperText={errors.firstName && touched.firstName && errors.firstName}
            />

            <TextField
              label='Last Name'
              name='lastName'
              variant='outlined'
              fullWidth
              value={values.lastName}
              className='form-field'
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete='off'
              error={errors.lastName && touched.lastName}
              helperText={errors.lastName && touched.lastName && errors.lastName}
            />

            <TextField
              id='country'
              name='country'
              disabled={isSubmitting}
              label='Country'
              variant='outlined'
              autoComplete='off'
              select
              fullWidth
              value={values.country}
              className='form-field'
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.country && errors.country}
              helperText={touched.country && errors.country}
            >
              {
                countries.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                )
              )}
            </TextField>

            <LoadingButton
              type='submit'
              disabled={!dirty || !isValid || isSubmitting}
              variant='contained'
              loading={isSubmitting}
              color='primary'
              className='update-button'
            >
              Update Details
            </LoadingButton>
          </form>
        </Box>
      </main>
    </div>
  )
}

export default AccountSettings
