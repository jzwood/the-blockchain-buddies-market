import React from 'react'

import TokenListener from './TokenListener'
import AddressListener from './AddressListener'
import { initTokenContract, initEventEmitter } from '../blockchain/contract'

export default class Daemons extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    initTokenContract()
    initEventEmitter() //async
  }

  render() {
    return [
      <AddressListener key="address-demon" />,
      <TokenListener key="token-daemon" />
    ]
  }
}
