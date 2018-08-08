import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import BaseSprite from '../components/BaseSprite'

export class Sprite extends React.Component {
  constructor() {
    super()
    this.loading = false
    this.setup = this.setup.bind(this)
    this.teardown = this.teardown.bind(this)
  }

  async setup(){
    const url = this.props.url
    await this.teardown()
    if(url) {
      this.status = BaseSprite.setup(url, this.canvas)
    }
  }

  async teardown(){
    await Promise.resolve(this.status)
    BaseSprite.teardown()
  }

  componentDidUpdate(prevProps){
    this.setup()
  }

  componentDidMount() {
    this.setup()
  }

  componentWillUnmount() {
    this.teardown()
  }

  render() {
    return ( <canvas ref={ canvas => { this.canvas = canvas }} id="sprite" width="24" height="24" />)
  }
}

const mapStateToProps = (state, ownProps) => ({
  url: state.spriteList[state.index]
})

Sprite.propTypes = {
  url: PropTypes.string
}

export default connect(mapStateToProps, null)(Sprite)
