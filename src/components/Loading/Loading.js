import React from 'react'
import PropTypes from 'prop-types'
import './index.css'

const Loading = ({
  children
}) => (
  <div className="loading-wrap">
    {children}
  </div>
)

Loading.propTypes = {
  children: PropTypes.node
}

Loading.defaultProps = {
  children: 'Loading...'
}

export default Loading
