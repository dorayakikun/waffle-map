import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { AppContainer } from './containers/App'
import { reducers } from './reducers'
import { rootSaga } from './sagas'

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers =
  typeof window === 'object' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware))
const store = createStore(reducers, enhancer)
sagaMiddleware.run(rootSaga)

const root = document.getElementById('root')
render(
  <Provider store={store}>
    <AppContainer activeIndex={2} />
  </Provider>,
  root
)
