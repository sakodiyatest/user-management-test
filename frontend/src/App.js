import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Routes from './routes'

import { AuthProvider } from './contexts/auth'
import { SnackBarProvider } from './contexts/snackbar'

import ErrorBoundary from './components/errorBoundary'

import './scss/common.scss'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <AuthProvider>
          <SnackBarProvider>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </SnackBarProvider>
        </AuthProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  )
}

export default App
