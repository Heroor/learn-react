import React from 'react'
import ReactDOM from 'react-dom'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderComponentToSnapshot, { hitList } from '../../config/TestConfig'
import Table from './index'

Enzyme.configure({
  adapter: new Adapter()
})

// Table test
describe('Table', () => {
  const props = {
    list: hitList,
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
    const element = shallow(
      <Table {...props} />
    )
    expect(element.find('.table-row').length).toBe(2)
  })
})