import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Store, createStore } from 'redux'
import { State, reducers } from './reducers'
import { Action } from './actions/AppActions'
import { AppContainer } from './containers/App'

const store: Store<State> = createStore(reducers)
const root = document.getElementById('root')
render(
  <Provider store={store}>
    <AppContainer activeIndex={2} />
  </Provider>,
  root
)
