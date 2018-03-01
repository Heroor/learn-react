import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
// import {
//   BrowserRouter as Router,
//   Route,
//   Link
// } from 'react-router-dom'
import './index.css'
import {
  storngLog,
  dangerLog,
  successLog,
  errorLog
} from '../../config/colorLog'

// components
import Search from '../Search'
import Table from '../Table'
import Button from '../Button'
import {withLoading} from '../Loading'
import logoImg from '../../logo.svg'

// const
import {
  DEFAULT_QUERY,
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP
} from '../../constants'


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
      error: null,
      isLoading: false
    }
    // bind function to the this(instance)
    this.onRemove = this.onRemove.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
    this.setSearchTopStories = this.setSearchTopStories.bind(this)
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this)
  }

  // class's methods
  onRemove(item) {
    this.setState(updateOnRemove(item))
  }

  onInputChange(event) {
    this.setState({ searchValue: event.target.value })
  }

  onSearchSubmit(event) {
    const { searchValue } = this.state
    this.setState({
      searchKey: searchValue
    })
    !this.state.isLoading && this.needsToSearchTopStories(searchValue) && this.fetchSearchTopStories(searchValue)

    event.preventDefault()
  }

  setSearchTopStories(result) {
    const { hits, page } = result
    this.setState(updateSearchTopStoriesState(hits, page))
  }

  needsToSearchTopStories(searchKey) {
    return !this.state.results[searchKey]
  }

  fetchSearchTopStories(searchValue, page = 0) {
    this.setState({
      isLoading: true
    })
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

  /*-----------------component lifecycle-------------------*/

    /* [component mountimg]:
     * constructor()
     * componentWillMount()
     * render()
     * componentDidMount()
     */

    /* [component updating]:
     * componentWillReceiveProps()
     * shouldComponentUpdate()
     * componentWillUpdate()
     * render()
     * componentDidUpdate(
     */

     /* [component unmounting]
      * componentWillUnmount()
      */

  /*---------------------------------------------------------*/

  // lifecycle hooks
  componentWillMount() {
    // called before rendering the component
    console.log('%c[componentWillMount hook]', dangerLog)
  }

  componentDidMount() {
    // called after the component is mounted
    console.log('%c[componentDidMount hook]', dangerLog)
    // here we can [ftech API, change state, ...]

    const { searchValue } = this.state
    this.setState({
      searchKey: searchValue
    })
    this.fetchSearchTopStories(searchValue)
  }

  componentWillReceiveProps(nextProps) {
    // called when the props received by the component have changed
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
      error,
      isLoading
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
            isLoading={isLoading}
            onChange={this.onInputChange}
            onSubmit={this.onSearchSubmit}
          >
            search
          </Search>
        </div>
        {/*
          error ?
          <div className="interactions">
            <p>Oops! something went wrong!</p>
          </div> :
          <Table
            list={list}
            remove={this.onRemove}
          />
        */}
        <TableWithError 
            isError={error}
            list={list}
            remove={this.onRemove}
          />
        <div className="interactions">
          <ButtonWithLoading
            isLoading={isLoading}
            loadingChildren={
              <img src={logoImg} alt="loading"/>
            }
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
          >
            More
          </ButtonWithLoading>
        </div>
      </div>
    )
  }
}


const WithError = Component => ({isError, ...rest}) => (
  isError? 
  <div className="interactions">
    <p>Oops! something went wrong!</p>
  </div> :
  <Component {...rest}/>
)

const TableWithError = WithError(Table)
const ButtonWithLoading = withLoading(Button)

export const updateSearchTopStoriesState = (hits, page) =>
  preState => {
    const { searchKey, results } = preState

    const oldHits = results && results[searchKey] ?
      results[searchKey].hits : []

    const updateHits = [
      ...oldHits,
      ...hits
    ]

    return {
      results: {
        ...results,
        [searchKey]: {
          hits: updateHits,
          page
        }
      },
      isLoading: false
    }
  }

export const updateOnRemove = item => prevState => {
  const {
    searchKey,
    results
  } = prevState
  const { hits, page } = results[searchKey]
  const isNotItem = v => v !== item
  const updateHits = hits.filter(isNotItem)
  return {
    results: {
      ...results,
      [searchKey]: {
        hits: updateHits,
        page
      }
    }
  }
}

export default App

// replaceState
// forceUpdate

/* todo :
 * flow
 */