import React from 'react'
// const Component = React.Component

// export default class Search extends Component {
//   render() {
//     const { value, onChange, children } = this.props
//     return (
//       <form>
//         {children}
//         <input
//           type="text"
//           value={value}
//           onChange={onChange}
//         />
//       </form>
//     )
//   }
// }


// reconstruction
const Search = ({value, onChange, children}) =>
  <form>
    {children}
    <input
      type="text"
      value={value}
      onChange={onChange}
    />
  </form>


export default Search
