import { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTokens } from '../blockchain/contract'

import { updateTokenList, UPDATE_TOKEN_LIST, BLOCKCHAIN_EVENT } from '../actions'

class TokenListener extends Component {
  constructor() {
    super()

    this.onNewToken = async e => {
      try {
        const tokens = await getTokens()
        this.props.updateTokenList(tokens)
      } catch (err) {
        console.warn("NewToken Error", err)
      }
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
