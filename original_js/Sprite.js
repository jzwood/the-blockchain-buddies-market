import React from 'react'
import BaseSprite from './BaseSprite'

export class Sprite extends React.Component {
  constructor(url) {
    super()
    this.url = url
  }

  componentDidMount() {
    BaseSprite(url, this.canvas).then(sprite => {
      this.sprite = sprite
      if(!this.teardown) {
        this.sprite.setup()
      }
    })
  }

  componentWillUnmount() {
    this.teardown = true
    this.sprite && this.sprite.teardown()
  }

  render() {
    return ( <canvas ref={ canvas => { this.canvas = canvas }} id="sprite" width={this.width} height={this.height} />)
  }
}
