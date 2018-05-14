import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import history from './reducers'
import HistoryDashboard from './historyDashboard'
​
const store = createStore(history);
​
render(
  <Provider store={store}>
    <HistoryDashboard />
  </Provider>,
  document.getElementById('root')
);
