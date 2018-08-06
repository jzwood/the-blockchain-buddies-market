import { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { loadScene, LOAD_SCENE } from '../actions'

class Scene extends Component {
  constructor () {
    super()

    this.onNewToken = e => {
      this.props.addToken(e.detail)
    }
  }

  componentDidMount () {
    document.addEventListener(ADD_TOKEN, this.onNewToken)
  }

  componentWillUnmount () {
    document.removeEventListener(ADD_TOKEN, this.onNewToken)
  }

  render () {
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
