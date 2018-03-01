import React from 'react'
import PropTypes from 'prop-types'

const Loading = ({
  children
}) => {
  return (
    <div className="loading-wrap">
      {children}
    </div>
  )
}

Loading.propTypes = {
  children: PropTypes.node
}

Loading.defaultProps = {
  children: 'Loading...'
}


// use the "with" prefix to name the HOC
export const withLoading = (Component) =>
  ({ isLoading, loadingChildren = null, ...rest }) =>
    isLoading ?
    <Loading>{loadingChildren}</Loading> :
    <Component {...rest}/>


export default Loading