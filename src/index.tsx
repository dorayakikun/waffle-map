import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Store, createStore } from 'redux'
import { State, reducers } from './reducers'
import { Action } from './actions/AppActions'
import App from './containers/App'

const store: Store<State> = createStore(reducers)
const root = document.getElementById('root')
if (!root) {
  throw new Error('Missing root component')
}
render(
  <Provider store={store}>
    <App activeIndex={2} />
  </Provider>,
  root
)
