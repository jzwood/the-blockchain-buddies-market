import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import BaseSprite from '../components/BaseSprite'

export class Sprite extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    const url = this.props.url
    if(url) {
      BaseSprite(url, this.canvas).then(sprite => {
        this.sprite = sprite
        if(!this.teardown) {
          this.sprite.setup()
        }
      })
    }
  }

  componentWillUnmount() {
    this.teardown = true
    this.sprite && this.sprite.teardown()
  }

  render() {
    return ( <canvas ref={ canvas => { this.canvas = canvas }} id="sprite" />)
  }
}

const mapStateToProps = (state, ownProps) => ({
  url: state.spriteList[state.index]
})

Sprite.propTypes = {
  url: PropTypes.string
}

export default connect(mapStateToProps, null)(Sprite)
