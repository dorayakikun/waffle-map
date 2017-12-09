// @flow

import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import reducers from './reducers'
import { Provider } from 'react-redux'
import App from './containers/App'

import type { Store } from 'redux'
import type { Action } from './actions/AppActions'
import type { State } from './reducers'

const store: Store<State, Action> = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const root = document.getElementById('root')
if (!root) {
  throw new Error('Missing root component')
}
render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
)
