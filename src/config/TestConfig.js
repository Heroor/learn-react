import renderer from 'react-test-renderer'

export default function renderComponentToSnapshot (DOM) {
  var component = renderer.create(DOM)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
}

export const hitList = [
  { title: '1', author: '1', num_comments: 1, point: 1, objectID: 'y' },
  { title: '2', author: '2', num_comments: 2, point: 2, objectID: 'x' }
]