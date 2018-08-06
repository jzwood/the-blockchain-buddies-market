import React from 'react'

function drawAqueduct(context, x,y,radius, tall) {
  const halfBlock = 5
  drawArc(context, x, y, radius, halfBlock * 2)
  context.beginPath()
  context.arc(x + halfBlock, y + halfBlock, radius, 0, Math.PI, true)
  context.rect(x - radius, y + halfBlock, 2 * (radius + halfBlock), tall)
  context.fill()
}

function drawArc(context, x,y,radius,s) {
  context.fillRect(x,y,s,s)
  const height = (x,r) => Math.sqrt(r * r - x * x)
  let h
  for(let i=0; i < radius - s; i+=s){
    h = height(i, radius)
    if(h) {
      context.fillRect(x + i, y - h, s,s)
      context.fillRect(x - i, y - h, s,s)
      context.fillRect(x + h, y - i, s,s)
      context.fillRect(x - h, y - i, s,s)
    }
  }
}

export default class Aqueduct extends React.Component {
  constructor () {
    super()
    this.width = screen.width
    this.height = 350
  }

  componentDidMount () {
    const context = this.canvas.getContext('2d')
    context.fillStyle = 'lightblue'

    const radius = 50
    const offset = radius * 2 + 30
    for(let i=0, m=this.width/offset; i<m; i++){
      drawAqueduct(context, offset * i,200,radius, 100)
      drawAqueduct(context, offset * i, 75, ~~(radius * 0.65), 50)
    }
  }

  render () {
    return (<canvas ref={canvas => {this.canvas = canvas}} className="canvas aqueducts" width={this.width} height={this.height} />)
  }
}
