import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import App from './components/App'
import { initTokenContract, initEventEmitter } from './blockchain/contract'
import devGreeting from './daemons/devGreeting'

import emitterEngine from './daemons/tokenEmitter'

async function main() {
  console.info(devGreeting)
  initTokenContract()
  await initEventEmitter()

  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')

  )
}

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', main)
} else {
  main()
}
