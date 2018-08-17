import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import App from './components/App'
import { initTokenContract, initEventEmitter } from './blockchain/contract'

const devGreeting = `
  ╔╗  ╔╗
  ╠╩╗ ╠╩╗
  ╚═╝o╚═╝o
`

function main() {
  console.info(devGreeting)

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
