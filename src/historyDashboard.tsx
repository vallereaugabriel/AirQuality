import { connect } from 'react-redux'
import { addSearch } from './actions'
import Dashboard from './dashboard'
​
const mapStateToProps = state => {
  return {
    searches: state
  }
}
​
const mapDispatchToProps = dispatch => {
  return {
    saveSearch: (text) => dispatch(addSearch(text))
  }
}
​
const HistoryDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
​
export default HistoryDashboard
