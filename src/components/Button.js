import React, {Component} from 'react'

export default class Button extends Component {
  render() {
    const {
      onClick,
      className,
      children
    } = this.props
    return (
      <button
        onClick={onClick}
        className={className}
        type="button"
      >
        {children}
      </button>
    )
  }
}