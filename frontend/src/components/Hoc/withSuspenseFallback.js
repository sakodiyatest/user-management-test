import * as React from 'react'

const withSuspenseFallback = (Component) => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {Component}
    </React.Suspense>
  )
}

export default withSuspenseFallback