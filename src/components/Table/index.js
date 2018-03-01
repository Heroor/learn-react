import React, {Component} from 'react'
import {sortBy} from 'lodash'
import classnames from 'classnames'

import PropTypes from 'prop-types'
import Button from '../Button'

const largeColumn = {
  width: '50%'
}
const midColumn = {
  width: '20%'
}
const smallColumn = {
  width: '10%'
}

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'point')
}


const Sort = ({
  sortKey,
  activeSortKey,
  onSort,
  children
}) => {
  const sortClass = classnames(
    'button-inline',
    {'button-active': sortKey === activeSortKey}
  )

  return (
    <Button
      onClick={() => onSort(sortKey)}
      className={sortClass}
    >
      {children}
    </Button>
  )
}

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sortKey: 'NONE',
      isSortReverse: false
    }
    this.onSort = this.onSort.bind(this)
  }

  onSort(sortKey) {
    this.setState(prevState => {
      const isSortReverse = prevState.sortKey === sortKey && !prevState.isSortReverse
      return {
        sortKey,
        isSortReverse
      }
    })
  }

  render() {
    const {
      list,
      remove
    } = this.props
    const {
      sortKey,
      isSortReverse
    } = this.state
    const onSort = this.onSort
    const sortedList = SORTS[sortKey](list)
    const reverseSortedList = isSortReverse ?
      sortedList.reverse() :
      sortedList
    return (
      <div className="table">
        <div className="table-header">
          <span style={smallColumn}>
            <Sort
              sortKey={'POINTS'}
              onSort={onSort}
              activeSortKey={sortKey}
            >
              Points
            </Sort>
          </span>
          <span style={largeColumn}>
            <Sort
              sortKey={'TITLE'}
              onSort={onSort}
              activeSortKey={sortKey}
            >
              Title
            </Sort>
          </span>
          <span style={midColumn}>
            <Sort
              sortKey={'AUTHOR'}
              onSort={onSort}
              activeSortKey={sortKey}
            >
              Author
            </Sort>
          </span>
          <span style={smallColumn}>
            <Sort
              sortKey={'COMMENTS'}
              onSort={onSort}
              activeSortKey={sortKey}
            >
              Comments
            </Sort>
          </span>
          <span style={smallColumn}>
            <Sort>
              Archive
            </Sort>
          </span>
        </div>

        <ul>
          {reverseSortedList.map(v => (
            <li key={v.objectID} className="table-row">
              <span style={smallColumn}>
                {v.points}
              </span>
              <span style={largeColumn}>
                <a
                  target="blank"
                  href={v.url}
                >
                  {v.title}
                </a>
              </span>
              <span style={midColumn}>
                {v.author}
              </span>
              <span style={smallColumn}>
                {v.num_comments}
              </span>
              <span style={smallColumn}>
                <Button
                  className="button-inline"
                  onClick={() => remove(v)}
                >
                  [DEL]
                </Button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}


// filter callback
// const filterList = key => v =>
//   v.title.toLowerCase().includes(key.toLowerCase())

Table.propTypes = {
  list: PropTypes.arrayOf(
    // 每一项元素的内容：
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number,
    })
  ).isRequired,
  activeSortKey: PropTypes.string,
  remove: PropTypes.func.isRequired
}

Sort.proptypes = {
  sortKey: PropTypes.string,
  onSort: PropTypes.func,
  children: PropTypes.node
}

Sort.defaultProps = {
  onSort: () => {}
}

export default Table
