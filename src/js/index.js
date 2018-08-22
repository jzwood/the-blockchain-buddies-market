import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import App from './components/App'

const devGreeting = `
  ╔╗  ╔╗
  ╠╩╗ ╠╩╗
  ╚═╝o╚═╝o
`

function main() {
  console.info(devGreeting)

  const hasMetamask = typeof web3 !== 'undefined'
  const fallback = <div className='fallback'><a href='https://github.com/jzwood/the-blockchain-buddies-market'>Blockchain Buddies</a> cryptocollectible marketplace requires Metamask to run! <a href="https://metamask.io">https://metamask.io</a></div>

  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  render(
    hasMetamask ?
      <Provider store={store}>
        <App />
      </Provider> : fallback,
    document.getElementById('root')

  )
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main)
} else {
  main()
}
