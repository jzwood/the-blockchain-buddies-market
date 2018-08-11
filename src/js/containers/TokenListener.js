import { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { addToken, ADD_TOKEN } from '../actions'

class TokenListener extends Component {
  constructor() {
    super()

    this.onNewToken = e => {
      console.log(e.detail)
      this.props.addToken(e.detail)
    }
  }

  componentDidMount() {
    document.addEventListener(ADD_TOKEN, this.onNewToken)
  }

  componentWillUnmount() {
    document.removeEventListener(ADD_TOKEN, this.onNewToken)
  }

  render() {
    return null
  }
}

TokenListener.propTypes = {
  addToken: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  addToken
}

export default connect(null, mapDispatchToProps)(TokenListener)
