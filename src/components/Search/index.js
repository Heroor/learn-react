import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'

class Search extends Component {
  componentDidMount() {
    this.input && this.input.focus()
  }
  render() {
    const {
      value,
      onChange,
      onSubmit,
      children
    } = this.props

    return (
      <form onSubmit={onSubmit}>
        <input
          type="text"
          ref={node => {this.input = node}}
          value={value}
          onChange={onChange}
        />
        <Button type="submit">
          {children}
        </Button>
      </form>
    )
  }
}

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node
}

Search.defaultProps = {
  children: 'search...',
  value: ''
}

export default Search
