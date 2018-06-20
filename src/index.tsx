import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, Store } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { AppContainer } from './containers/App'
import { reducers, State } from './reducers'
const sagaMiddleware = createSagaMiddleware()
const store: Store<State> = createStore(reducers, applyMiddleware(sagaMiddleware))
const root = document.getElementById('root')
render(
  <Provider store={store}>
    <AppContainer activeIndex={2} />
  </Provider>,
  root
)
