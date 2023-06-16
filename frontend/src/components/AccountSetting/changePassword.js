import * as React from 'react'
import { useFormik } from 'formik'

import {
  Typography,
  TextField
} from '@material-ui/core'
import { LoadingButton } from '@mui/lab'

import { useSnackBar } from '../../contexts/snackbar'
import { getPasswordSettingSchema } from '../../utils/schema'

import UpdateUserDetails from '../../react-query/mutations/updateUserDetails'

const initialValues = {
  currentPassword: '',
  password: '',
  confirmPassword: '',
}

const ChangePassword = () => {
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackBar()
  const updateUserDetailsMutation = UpdateUserDetails()

  const {
    errors,
    touched,
    values,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = useFormik({
    initialValues,
    validationSchema: getPasswordSettingSchema(),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      updateUserDetailsMutation.mutate({
        password: values.currentPassword,
        newPassword: values.password
      }, {
        onSuccess: () => {
          showSuccessSnackbar({ message: 'User password has been successfully updated' })
        },
        onError: (error) => {
          showErrorSnackbar({ message: error })
        },
        onSettled: () => {
          setSubmitting(false)
          resetForm({ values: '' })
        }
      })
    },
  })

  return (
    <div className='change-password-right-tab'>
      <Typography variant='h6' className='account-heading'>
        Change Password
      </Typography>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          id='currentPassword'
          name='currentPassword'
          label='Current Password'
          disabled={isSubmitting}
          type='password'
          variant='outlined'
          fullWidth
          autoComplete='off'
          value={values.currentPassword}
          onBlur={handleBlur}
          onChange={handleChange}
          error={touched.currentPassword && errors.currentPassword}
          helperText={touched.currentPassword && errors.currentPassword}
          className='form-field'
        />

        <TextField
          id='newPassword'
          name='password'
          label='New Password'
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

        <TextField
          id='confirmNewPassword'
          name='confirmPassword'
          label='Confirm New Password'
          disabled={isSubmitting}
          type='password'
          variant='outlined'
          fullWidth
          autoComplete='off'
          value={values.confirmPassword}
          onBlur={handleBlur}
          onChange={handleChange}
          error={touched.confirmPassword && errors.confirmPassword}
          helperText={touched.confirmPassword && errors.confirmPassword}
          className='form-field'
        />

        <LoadingButton
          type='submit'
          disabled={isSubmitting}
          loading={isSubmitting}
          variant='contained'
          color='primary'
        >
          Update Password
        </LoadingButton>    
      </form>
    </div>
  )
}

export default ChangePassword
