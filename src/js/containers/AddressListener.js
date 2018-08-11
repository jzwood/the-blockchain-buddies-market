import { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import web3provider from '../blockchain/web3provider'

import { setUser, SET_USER } from '../actions'

class AddressListener extends Component {
  constructor () {
    super()
    this.web3provider = web3provider()
    this.setAddress = this.setAddress.bind(this)
    console.log('address')
  }

  setAddress() {
    try {
      const address = web3.eth.accounts[0]
      this.props.setUser(address)
    } catch (err) {
      console.warn(err, 'web3 not defined!')
      return null
    }
  }

  componentDidMount () {
    this.setAddress()
    this.web3provider.publicConfigStore.on('update', this.setAddress)
  }

  render () {
    return null
  }
}

AddressListener.propTypes = {
  setUser: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  setUser
}

export default connect(null, mapDispatchToProps)(AddressListener)
