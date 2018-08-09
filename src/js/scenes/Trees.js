import React from 'react'
import { mod, range } from '../utils'

function addAlder({key, height, rate, xpos, delay}){
  let canvas, context, initialized = false

  const [canWidth, canHeight] = [600, 500]
  const avg = (a, b) => 0.5 * (a + b)
  const deg_to_rad = Math.PI / 180.0

  //return <canvas ref={ update } className="canvas alder tree" key={`alder-${key}`} width={canWidth} height={canHeight}/>
  return <canvas ref={update} className="canvas alder tree" key={`alder-${key}`} width={canWidth} height={canHeight}/>

  function update(c) {
    canvas = c
    if(!initialized) {
      init(key)
      main()
      initialized = true
    }
  }

  function init(key) {
    context = canvas.getContext('2d')
    canvas.style.zIndex = key % 2
    canvas.style.left = `${xpos}px`
  }

  function main(){
    let h = 1
    function grow(){
      setTimeout(() => {
        if(h < height) {
          context.clearRect(0, 0, canWidth, canHeight)
          drawTree(7 + h * 2, canWidth/ 2, canHeight, -90, h++)
          grow()
        }
      }, rate)
    }
    setTimeout(() => {
      grow()
    }, delay)
  }

  function drawBranch(x1, y1, x2, y2) {
    const [dx, dy] = [x2 - x1, y2 - y1]
    context.fillStyle = '#90916d'
    if (dx === 0) {
      const width = dy / 4
      context.fillRect(x1 - width / 2, y1, width, dy)
    } else {
      context.fillRect(x1, y1, dx, dy)
    }
  }

  function leaf(x1, y1, side, fill) {
    context.fillRect(x1 - side / 2, y1, side, side)
    context.fillStyle = fill
  }

  function drawTree(THETA, x1, y1, angle, depth) {
    if (depth > 0) {
      const x2 = x1 + (Math.cos(angle * deg_to_rad) * depth * 10.0)
      const y2 = y1 + (Math.sin(angle * deg_to_rad) * depth * 10.0)
      drawBranch(x1, y1, avg(x1, x2), avg(y1, y2))
      drawBranch(avg(x1, x2), avg(y1, y2), x2, y2)
      drawTree(THETA, x2, y2, angle - THETA, depth - 1)
      drawTree(THETA, x2, y2, angle + THETA, depth - 1)
    }
    if (depth < 3) {
      leaf(x1, y1, 15, '#68bb68')
    }
  }
}

export default class Trees extends React.Component {
  constructor () {
    super()
    this.background = document.querySelector('.game-wrapper')
    if(this.background) this.background.style.backgroundColor = 'lightgreen'
  }

  render() {
    const width = screen.width
    const step = 400
    return range(0, width + step, step).reduce((trees,i) => {
      const t1 = addAlder({key: i * 2, height: 8, rate: 500, xpos: i - 200, delay: 500 + (i + 100)})
      const t2 = addAlder({key: i * 2 + 1, height: 6, rate: 500, xpos: i, delay: 500 + (i + 250)})
      return trees.concat(t1, t2)
    }, [])
  }
}
