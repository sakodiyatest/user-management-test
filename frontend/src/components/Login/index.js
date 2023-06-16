import * as React from 'react'
import { useNavigate } from 'react-router'
import { useFormik } from 'formik'

import { LoadingButton } from '@mui/lab'
import { TextField, Typography, Box, Button } from '@material-ui/core'

import { getLoginFormValidationSchema } from '../../utils/schema'
import { LOGIN_ACTION_TYPE } from '../../utils/constants'
import { HOME_PATH } from '../../routes/routesPath'

import LoginMutation from '../../react-query/mutations/login'

import { useAuth } from '../../contexts/auth'
import { useSnackBar } from '../../contexts/snackbar'

import './login.scss'

const LOGIN_FORM_INITIAL_VALUES = {
  email: '',
  password: ''
}

const Login = () => {
  const navigate = useNavigate()

  const login = LoginMutation()
  const { dispatch } = useAuth()
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackBar()

  const {
    errors,
    touched,
    values,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = useFormik({
    initialValues: LOGIN_FORM_INITIAL_VALUES,
    validationSchema: getLoginFormValidationSchema(),
    onSubmit: (values, { setSubmitting }) => {
      login.mutate(values, {
        onSuccess: (response) => {
          showSuccessSnackbar({ message: 'Welcome User!' })
          dispatch({ type: LOGIN_ACTION_TYPE, paylod: { token: response.accessToken } })
          navigate(HOME_PATH)
        },
        onError: (error) => {
          showErrorSnackbar({ message: error })
        },
        onSettled: () => {
          setSubmitting(false)
        }
      })
    },
  })

  return (
    <div className='login-container'>
      <form onSubmit={handleSubmit} className='login-form'>
        <Typography variant='h5' component='h2' gutterBottom className='center'>
          Login
        </Typography>
        <Box mb={2}>
          <TextField
            id='email'
            name='email'
            label='Email'
            disabled={isSubmitting}
            variant='outlined'
            fullWidth
            autoComplete='off'
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.email && errors.email}
            helperText={touched.email && errors.email}
            className='form-field'
          />
        </Box>
        <Box mb={2}>
          <TextField
            id='password'
            name='password'
            label='Password'
            disabled={isSubmitting}
            type='password'
            variant='outlined'
            fullWidth
            autoComplete='off'
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.password && errors.password}
            helperText={touched.password && errors.password}
            className='form-field'
          />
        </Box>
        <div className='button-container'>
          <LoadingButton 
            type='submit' 
            disabled={isSubmitting}
            loading={isSubmitting}
            variant='contained' 
            color='primary'
          >
            Login
          </LoadingButton>

          <Button 
            variant='outlined' 
            color='primary' 
          >
            Create an account
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Login