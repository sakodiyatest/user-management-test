import { Snackbar } from '@material-ui/core'
import MuiAlert from '@mui/material/Alert'

import React, { 
  createContext, 
  useCallback, 
  useContext,
  useState
} from 'react'

const SnackBarContext = createContext()

const Alert = React.forwardRef(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const SnackBarProvider = ({
  children,
}) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('info')

  const showErrorSnackbar = useCallback(({ message }) => {
    setMessage(message)
    setMessageType('error')
    setOpen(true)
  }, [])

  const showSuccessSnackbar = useCallback(({ message }) => {
    setMessage(message)
    setMessageType('success')
    setOpen(true)
  }, [])

  const handleClose = () => {
    setOpen(false)
    setMessageType('info')
  }

  return (
    <SnackBarContext.Provider value={{ showErrorSnackbar, showSuccessSnackbar }}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity={messageType}>
          {message}
        </Alert>
      </Snackbar>
      {children}
    </SnackBarContext.Provider>
  )
}

const useSnackBar = () => {
  const context = useContext(SnackBarContext)

  if (!context) {
    throw new Error('useSnackBar must be used within an SnackBarProvider Component')
  }

  return context
}

export { SnackBarProvider, useSnackBar, SnackBarContext }