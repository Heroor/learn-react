import React from 'react'
import ReactDOM from 'react-dom'
import Button from './index'

import renderComponentToSnapshot from '../../config/TestConfig'

// Button test
describe('Button', () => {
  const props = {
    onClick() {
      console.log('click!')
    },
    children: 'More'
  }
  it('render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Button {...props}>{props.children}</Button>, div)
  })
  test('has a valid shapshot', () => {
    renderComponentToSnapshot(
      <Button {...props}>{props.children}</Button>
    )
  })
})
