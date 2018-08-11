import Web3 from 'web3'

export default () => {
  // If no injected web3 instance is detected, fall back to Ganache
  return (typeof web3 !== 'undefined') ? web3.currentProvider : new Web3.providers.HttpProvider('http://localhost:8545')
}
