import React from 'react'
// const Component = React.Component
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

// class Table extends Component {
//   render() {
//     const {list, searchValue, remove} = this.props
//     return (
//       <ul>
//         {list.filter(filterList(searchValue)).map(v => (
//           <li key={v.objectID}>
//             <span>
//               <a href={v.url}>{v.title}</a>
//             </span>
//             <span>{v.author}</span>
//             <span>{v.points}</span>
//             <DelBtn remove={remove} value={v}/>
//             <Button
//               onClick={remove}
//             >
//               del2
//             </Button>
//           </li>
//         ))}
//       </ul>
//     )
//   }
// }

// reconstuction
const Table = ({list, searchValue, remove}) =>
  <ul className="table">
    {list.filter(filterList(searchValue)).map(v => (
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
const filterList = key => v =>
  v.title.toLowerCase().includes(key.toLowerCase())


export default Table
