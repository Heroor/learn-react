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
import Button from './components/Button'



const DEFAULT_QUERY = 'react'
const DEFAULT_HPP = '5'
const PATH_BASE = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search'
const PARAM_SEARCH = 'query='
const PARAM_PAGE = 'page='
const PARAM_HPP = 'hitsPerPage='


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
      searchKey: '',
      results: null,
      error: null
    }
    // bind function to the this(instance)
    this.remove = this.remove.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
    this.setSearchTopStories = this.setSearchTopStories.bind(this)
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this)
  }

  // class's methods
  remove(item) {
    const {searchKey, results} = this.state
    const {hits, page} = results[searchKey]

    const isNotItem = v => v !== item
    const updateHits = hits.filter(isNotItem)
    this.setState({
      results: {
        ...results,
        [searchKey]: {
          hits: updateHits,
          page
        }
      }
    })
  }

  onInputChange(event) {
    this.setState({searchValue: event.target.value})
  }

  onSearchSubmit(event) {
    const {searchValue} = this.state
    this.setState({
      searchKey: searchValue
    })
    this.needsToSearchTopStories(searchValue) && this.fetchSearchTopStories(searchValue)

    event.preventDefault()
  }

  setSearchTopStories(result) {
    const {hits, page} = result
    const {searchKey, results} = this.state

    const oldHits = results && results[searchKey] ?
      results[searchKey].hits :
      []
    const updateHits = [
      ...oldHits,
      ...hits
    ]
    this.setState({
      results: {
        ...results,
        [searchKey]: {
          hits: updateHits,
          page
        }
      }
    })
  }

  needsToSearchTopStories(searchKey) {
    return !this.state.results[searchKey]
  }

  fetchSearchTopStories(searchValue, page = 0) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchValue}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(res => res.json())
      .then(this.setSearchTopStories)
      .then(res => this.setState({
        error: null
      }))
      .catch(e => this.setState({
        error: e
      }))
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

    const {searchValue} = this.state
    this.setState({
      searchKey: searchValue
    })
    this.fetchSearchTopStories(searchValue)
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
    const {
      searchValue,
      searchKey,
      results,
      error
    } = this.state

    const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page
    ) || 0

    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
     ) || []

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchValue}
            onChange={this.onInputChange}
            onSubmit={this.onSearchSubmit}
          >
            search
          </Search>
        </div>
        {
          error ?
          <div className="interactions">
            <p>Oops! something went wrong!</p>
          </div> :
          <Table
            list={list}
            remove={this.remove}
          />
        }
        <div className="interactions">
          <Button
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
          >
            more
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
