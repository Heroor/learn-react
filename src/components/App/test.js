// 组件测试
// $ npm test

import React from 'react'
import ReactDOM from 'react-dom'
import App, {
  updateSearchTopStoriesState
} from './index.js'
import renderer from 'react-test-renderer'
import { hitList } from '../../config/TestConfig'

// App test
describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render( <App/> , div)
  })

  // 创建测试快照
  // i. 快照可以保存上次测试（如模拟DOM渲染）的结果，下次的测试会与已保存的快照作对比，来找出发生变化的地方并报告错误，保证程序不被意外改变；
  // ii. 如果最新的测试结果变化了并且是预期的正确行为，可以手动保存新快照来更新旧快照
  test('has a valid snashot', () => {
    // 模拟渲染组件的DOM
    const component = renderer.create(
      <App />
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

// updateSearchTopStoriesState
describe('updateSearchTopStoriesState', () => {
  it('updateSearchTopStoriesState is running', () => {
    updateSearchTopStoriesState(hitList, 0)
  })
})
