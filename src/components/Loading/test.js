import React from 'react'
import ReactDOM from 'react-dom'
import Loading from './index'

import renderComponentToSnapshot from '../../config/TestConfig'

// Loading test
describe('Loading', () => {
  it('render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Loading/>, div)
  })

  test('has a calid snapshot', () => {
    renderComponentToSnapshot(<Loading>is loading</Loading>)
  })
})