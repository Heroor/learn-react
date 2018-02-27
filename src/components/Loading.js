import React from 'react'
import PropTypes from 'prop-types'

const Loading = ({
  children,

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

export default Loading