import React, { Component } from 'react';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link
// } from 'react-router-dom'
import './App.css';
import {
  storngLog,
  dangerLog,
  successLog,
  errorLog
} from './config/colorLog'

import Search from './components/Search'
import Table from './components/Table'
// import list from './list'
import {news} from './list'



// root component of webApp
class App extends Component {
  // called before component will mount
  constructor(props) {
    // component init
    console.log('%c[constructor function]', storngLog)
    super(props)
    // here we can init state or methods
    this.state = {
      searchValue: '',
      list: []
    }
    // bind function to the this(instance)
    this.remove = this.remove.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.addList = this.addList.bind(this)
  }

  // class's methods
  remove(item) {
    this.setState({
      list: this.state.list.filter(v => v !== item),
    })
  }

  onInputChange(event) {
    this.setState({searchValue: event.target.value})
  }

  addList(e) {
    const { list, searchValue } = this.state
    list.push({
      objectID: list.length,
      title: searchValue,
      author: 'Dan Abramov, Andrew Clark',
      points: list.length + 1,
      url: 'https://facebook.github.io/react/'
    })
    // this.setState({
    //   list,
    // })
  }

  /*------------------------component lifecycle-------------------------*/

    /* [component mount order]:
     * constructor()
     * componentWillMount()
     * render()
     * componentDidMount()
     */

    /* [component update order]:
     * componentWillReceiveProps()
     * shouldComponentUpdate()
     * componentWillUpdate()
     * render()
     * componentDidUpdate(
     */

     /* [component unmount]
      * componentWillUnmount()
      */

  /*---------------------------------------------------------------------*/

  // lifecycle hooks
  componentWillMount() {
    // called before rendering the component
    console.log('%c[componentWillMount hook]', dangerLog)
  }

  componentDidMount() {
    // called after the component is mounted
    console.log('%c[componentDidMount hook]', dangerLog)
    // here we can [ftech API, change state, ...]

    setTimeout(() => {
      this.setState({
        list: news
      })
    }, 500)
  }

  componentWillReceiveProps(nextProps) {
    console.log('[componentWillReceiveProps hook]')
  }

  shouldComponentUpdate(nextProps, nextState) {
    // called each time the component state or props changes
    // called before componentWillUpdate
    console.log('[shouldComponentUpdate hook]')
    // here we can [Performance optimization, ... ]

    // must return a Boolean value:
    // true - component will be rendered
    // false - component dose not rendered
    return true
  }

  componentWillUpdate(nextProps, nextState) {
    // called before the component render
    console.log('%c[componentWillUpdate hook]', successLog)
  }

  componentDidUpdate(prevProps, prevState) {
    // called after the component render
    console.log('%c[componentDidUpdate hook]', successLog)
    // here we can [handle DOM, handle async, ...]
  }

  componentWillUnmount() {
    // called before the component unmount
    console.log('%c[componentWillUnmount hook]', errorLog)
  }

  // The element returned by the component
  // called after the component will mount or
  // after the component will update(state or props have changed)
  render() {
    console.log('%c[render function]', storngLog)
    const {searchValue, list} = this.state
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchValue}
            onChange={this.onInputChange}
          >
            <button onClick={this.addList}>add</button>
          </Search>
        </div>

        <Table
          list={list}
          searchValue={searchValue}
          remove={this.remove}
        />
      </div>
    );
  }
}

export default App;
