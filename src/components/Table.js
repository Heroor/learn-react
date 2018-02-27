import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const largeColumn = {
  width: '50%'
}
const midColumn = {
  width: '20%'
}
const smallColumn = {
  width: '10%'
}

const Table = ({list, remove}) =>
  <ul className="table">
    {list.map(v => (
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
  remove: PropTypes.func.isRequired
}

export default Table
