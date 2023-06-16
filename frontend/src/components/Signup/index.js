import * as React from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { 
  TextField, 
  Button, 
  Typography, 
  Box, 
  MenuItem 
} from '@material-ui/core'
import { LoadingButton } from '@mui/lab'

import { getSignUpFormValidationSchema } from '../../utils/schema'
import { getCountries } from '../../utils/helper'
import { USER_SIGNUP_HEADING_TEXT } from '../../utils/constants'

import Signup from '../../react-query/mutations/signup'

import './signup.scss'
import { useSnackBar } from '../../contexts/snackbar'

const SIGNUP_FORM_INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  country: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const countries = getCountries()

const SignUp = () => {
  const userSignupMutation = Signup()
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackBar()
  
  const {
    values,
    errors,    
    touched,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleReset,
    handleBlur
  } = useFormik({
    initialValues: SIGNUP_FORM_INITIAL_VALUES,
    validationSchema: getSignUpFormValidationSchema(),

    onSubmit: (values, { setSubmitting, resetForm }) => {
      const { firstName, lastName } = values
      userSignupMutation.mutate(values, {
        onError: (error) => {
          showErrorSnackbar({ message: error })
        },
        onSuccess: () => {
          resetForm({ values: '' })
          showSuccessSnackbar({ 
            message: `User '${firstName} ${lastName}' has been successfully created.`
          })
        },
        onSettled: () => {
          setSubmitting(false)
        }
      })
    },
  })

  return (
    <div className='signup-container'>
      <form onSubmit={handleSubmit} className='signup-form' noValidate>
        <Typography variant='h5' component='h2' gutterBottom className='center'>
          {USER_SIGNUP_HEADING_TEXT}
        </Typography>
        <Box mb={2} className='form-field'>
          <TextField
            id='firstName'
            name='firstName'
            disabled={isSubmitting}
            label='First Name'
            variant='outlined'
            autoComplete='off'
            fullWidth
            onBlur={handleBlur}
            value={values.firstName}
            onChange={handleChange}
            error={touched.firstName && errors.firstName}
            helperText={touched.firstName && errors.firstName}
          />
        </Box>
        <Box mb={2} className='form-field'>
          <TextField
            id='lastName'
            name='lastName'
            disabled={isSubmitting}
            autoComplete='off'
            label='Last Name'
            variant='outlined'
            fullWidth
            onBlur={handleBlur}
            value={values.lastName}
            onChange={handleChange}
            error={touched.lastName && errors.lastName}
            helperText={touched.lastName && errors.lastName}
          />
        </Box>

        <Box mb={2} className='form-field'>
          <TextField
            id='country'
            name='country'
            disabled={isSubmitting}
            label='Country'
            variant='outlined'
            autoComplete='off'
            select
            fullWidth
            onBlur={handleBlur}
            value={values.country}
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
        </Box>

        <Box mb={2} className='form-field'>
          <TextField
            id='email'
            name='email'
            disabled={isSubmitting}
            label='Email'
            autoComplete='off'
            variant='outlined'
            fullWidth
            onBlur={handleBlur}
            value={values.email}
            onChange={handleChange}
            error={touched.email && errors.email}
            helperText={touched.email && errors.email}
          />
        </Box>

        <Box mb={2} className='form-field '>
          <TextField
            id='password'
            name='password'
            disabled={isSubmitting}
            label='Password'
            type='password'
            className='password-field'
            autoComplete='off'
            variant='outlined'
            fullWidth
            onBlur={handleBlur}
            value={values.password}
            onChange={handleChange}
            error={touched.password && !!errors.password}
            helperText={touched.password && errors.password}
          />
        </Box>

        <Box mb={2} className='form-field'>
          <TextField
            id='confirmPassword'
            name='confirmPassword'
            disabled={isSubmitting}
            label='Confirm Password'
            type='password'
            autoComplete='off'
            variant='outlined'
            fullWidth
            onBlur={handleBlur}
            value={values.confirmPassword}
            onChange={handleChange}
            error={touched.confirmPassword && errors.confirmPassword}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />
        </Box>

        <LoadingButton 
          type='submit' 
          variant='contained' 
          color='primary' 
          disabled={isSubmitting}
          loading={isSubmitting}
          className='button'
        >
          Sign up
        </LoadingButton>

        <Button 
          variant='outlined' 
          color='primary' 
          onClick={handleReset}
          className='button ml-10'
        >
          Reset
        </Button>

        <div className='login-text'>
          Already have an account? Click <Link to='/login'>Here</Link> to login.
        </div>
      </form>
    </div>
  )
}

export default SignUp
