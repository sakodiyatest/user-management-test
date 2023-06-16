import * as Yup from 'yup'

import { ERRORS } from './messages'

const passwordSchema = {
  password: Yup.string().trim().required(ERRORS.PASSWORD_REQUIRED)
            .min(8, ERRORS.PASSWORD_VALIDATION)
            .matches(/[0-9]/, ERRORS.PASSWORD_NUMBER_REQUIRED)
            .matches(/[a-z]/, ERRORS.PASSWORD_LOWERCASE_REQUIRED)
            .matches(/[A-Z]/, ERRORS.PASSWORD_UPPERCASE_REQUIRED)
            .matches(/[^\w]/, ERRORS.PASSWORD_SYMBOL_REQUIRED),
  confirmPassword: Yup.string().trim().oneOf([Yup.ref('password'), null], ERRORS.PASSWORD_MATCH).required(ERRORS.CONFIRM_PASSWORD_REQUIRED)
}

export const getAccountSettingSchema = () => {
  return Yup.object().shape({
    firstName: Yup.string().trim().required(ERRORS.FIRST_NAME_REQUIRED),
    lastName: Yup.string().trim().required(ERRORS.LAST_NAME_REQUIRED),
    email: Yup.string().trim().email(ERRORS.EMAIL_INVALID).required(ERRORS.EMAIL_REQUIRED),
    country: Yup.string().trim().required(ERRORS.COUNTRY_REQUIRED),
  })
}

export const getSignUpFormValidationSchema = () => {
  return Yup.object().shape({
    firstName: Yup.string().trim().required(ERRORS.FIRST_NAME_REQUIRED),
    lastName: Yup.string().trim().required(ERRORS.LAST_NAME_REQUIRED),
    country: Yup.string().trim().required(ERRORS.COUNTRY_REQUIRED),
    email: Yup.string().trim().email(ERRORS.EMAIL_INVALID).required(ERRORS.EMAIL_REQUIRED),
    ...passwordSchema
  })
}

export const getLoginFormValidationSchema = () => {
  return Yup.object().shape({
    email: Yup.string().trim().email(ERRORS.EMAIL_INVALID).required(ERRORS.EMAIL_REQUIRED),
    password: Yup.string().trim().required(ERRORS.PASSWORD_REQUIRED),
  })
}

export const getPasswordSettingSchema = () => {
  return Yup.object().shape({
    currentPassword: Yup.string().trim().required(ERRORS.CURRENT_PASSWORD_REQUIRED),
    ...passwordSchema
  });
}