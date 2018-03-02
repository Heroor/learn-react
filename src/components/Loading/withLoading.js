import React from 'react'
import Loading from './Loading'

// use the "with" prefix to name the HOC
const withLoading = (Component) =>
  ({ isLoading, loadingChildren = null, ...rest }) =>
    isLoading ?
    <Loading>{loadingChildren}</Loading> :
    <Component {...rest}/>

export default withLoading