import { ADD_SEARCH } from './actions'
​
function history(state = [], action) {
  switch (action.type) {
    case ADD_SEARCH:
      return [...state, action.text]
    default:
      return state
  }
}
​
export default history
