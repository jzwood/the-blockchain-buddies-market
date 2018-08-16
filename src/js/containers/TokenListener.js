import { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTokens } from '../blockchain/contract'

import { updateTokenList, UPDATE_TOKEN_LIST, BLOCKCHAIN_EVENT } from '../actions'

class TokenListener extends Component {
  constructor() {
    super()

    console.log('tokenListener setup')

    this.onNewToken = async e => {
      console.log('token listener', e.detail)
      const tokens = await getTokens()
      console.log('mintedTokens:', tokens)
      this.props.updateTokenList(tokens)
    }
  }

  componentDidMount() {
    document.addEventListener(BLOCKCHAIN_EVENT, this.onNewToken)
  }

  componentWillUnmount() {
    document.removeEventListener(BLOCKCHAIN_EVENT, this.onNewToken)
  }

  render() {
    return null
  }
}

TokenListener.propTypes = {
  updateTokenList: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  updateTokenList
}

export default connect(null, mapDispatchToProps)(TokenListener)
