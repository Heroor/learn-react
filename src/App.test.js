// 组件测试
// $ npm test

import React from 'react'
import ReactDOM from 'react-dom'
import App, {
  Search,
  Table,
  Button
} from './App'
import renderer from 'react-test-renderer'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({
  adapter: new Adapter()
})

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

// Search test
describe('Search', () => {
  const props = {
    value: 'ipt val',
    onChange() {
      console.log('onChange')
    },
    onSubmit() {
      console.log('onSubmit')
    },
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

// Table test
describe('Table', () => {
  const props = {
    list: [
      { title: '1', author: '1', num_comments: 1, point: 1, objectID: 'y' },
      { title: '2', author: '2', num_comments: 2, point: 2, objectID: 'x' }
    ],
    remove() {
      console.log('remove!')
    }
  }

  it('render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Table {...props} />, div)
  })

  test('has a calid snapshot', () => {
    renderComponentToSnapshot(<Table {...props} />)
  })

  // 单元测试
  //Enzyme API 中总共有三种渲染机制。你已经知道了 shallow() ，这里还有 mount() 和
  // render() 方法。这两种方式都会初始化父组件和所有的子组件。此外 mount() 还给予
  // 你调用组件生命周期的方法。但是什时候该使用哪种渲染机制呢？这里有一些建议：
  // • 不论怎样都优先尝试使用浅渲染（ shallow() ）
  // • 如果需要测试 componentDidMount() 或 componentDidUpdate() ，使用 mount()
  // • 如果你想测试组件的生命周期和子组件的行为，使用 mount()
  // • 如果你想测试一个组件的子组件的渲染，并且不关心生命周期方法和减少些渲染的
  // 花销的话，使用 render()
  it('shows two items in list', () => {
    const element = mount(
      <Table {...props} />
    )
    expect(element.find('.table-row').length).toBe(2)
  })
})


function renderComponentToSnapshot (DOM) {
  var component = renderer.create(DOM)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
}


