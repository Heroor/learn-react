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


const DEFAULT_QUERY = 'redux'
const PATH_BASE = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search'
const PARAM_SEARCH = 'query='


// root component of webApp
class App extends Component {
  // called before component will mount
  constructor(props) {
    // component init
    console.log('%c[constructor function]', storngLog)
    super(props)
    // here we can init state or methods
    this.state = {
      searchValue: DEFAULT_QUERY,
      result: null,
    }
    // bind function to the this(instance)
    this.remove = this.remove.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.setSearchTopStories = this.setSearchTopStories.bind(this)
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
  }

  // class's methods
  remove(item) {
    // this.setState({
    //   list: this.state.list.filter(v => v !== item),
    // })
  }

  onInputChange(event) {
    this.setState({searchValue: event.target.value})
  }

  setSearchTopStories(result) {
    console.log(result)
    this.setState({result})
  }

  fetchSearchTopStories(searchValue) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchValue}`)
      .then(res => res.json())
      .then(this.setSearchTopStories)
      .catch(e => e)
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

    this.fetchSearchTopStories(this.state.searchValue)
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
    // here we can handle state or props before render
    // here can not use 'this.setState', it will infinite loop

    // nextState.list.splice(-5)
  }

  componentDidUpdate(prevProps, prevState) {
    // called after the component render
    console.log('%c[componentDidUpdate hook]', successLog)
    // here we can [handle DOM, handle async, ...]
    // here can not use 'this.setState', it will infinite loop

    // console.log(document.querySelector('.page ul'))
  }

  componentWillUnmount() {
    // called before the component unmount
    console.log('%c[componentWillUnmount hook]', errorLog)
  }

  componentDidCatch(error, info) {
    // Catch component error
    console.log(error, info)
  }

  // The element returned by the component
  // called after the component will mount or
  // after the component will update(state or props have changed)
  render() {
    console.log('%c[render function]', storngLog)
    const {searchValue, result} = this.state
    if (!result) return null
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchValue}
            onChange={this.onInputChange}
          >
          </Search>
        </div>

        <Table
          list={result.hits}
          searchValue={searchValue}
          remove={this.remove}
        />
      </div>
    );
  }
}

export default App;
