import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, Store } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { AppContainer } from './containers/App'
import { reducers } from './reducers'
import { rootSaga } from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducers, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

const root = document.getElementById('root')
render(
  <Provider store={store}>
    <AppContainer activeIndex={2} />
  </Provider>,
  root
)
