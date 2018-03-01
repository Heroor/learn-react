import React from 'react'
import PropTypes from 'prop-types'

const Button = ({
  onClick,
  className,
  children,
  type
}) => (
  <button
    onClick={onClick}
    className={className}
    type={type}
  >
    {children}
  </button>
)


// 为子组件接受父组件的props限定类型
// • PropTypes.array
// • PropTypes.bool
// • PropTypes.func
// • PropTypes.number
// • PropTypes.object
// • PropTypes.string
// • PropTypes.node  // 可以为节点或字符串
// • PropTypes.element  // 元素 或 react元素

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node
}

// 设置默认props
Button.defaultProps = {
  className: '',
  children: 'button',
  type: 'button'
}

export default Button
