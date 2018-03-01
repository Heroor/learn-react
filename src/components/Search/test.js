import React from 'react'
import ReactDOM from 'react-dom'
import Search from './index'

import renderComponentToSnapshot from '../../config/TestConfig'

// Search test
describe('Search', () => {
  const props = {
    value: 'ipt val',
    onChange() {
      console.log('onChange')
    },
    onSubmit() {
      console.log('onSubmit')
    }
  }
  it('renders withou crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Search {...props}>{props.children}</Search>, div)
  })
  test('has a valid snapshot', () => {
    renderComponentToSnapshot(
      <Search {...props}>{props.children}</Search>
    )
  })
  test('has a valid text snapshot', () => {
    let text = 'Lorem ipsum dolor sit amet quisquam.'
    expect(text).toMatchSnapshot()
  })
})