import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { mod, range } from '../utils'

const background = document.querySelector('.game-wrapper')
const componentRoot = document.querySelector('.environment-wrapper')

function renderTrees() {
  background.style.backgroundColor = '#C1E8D7'
  const width = screen.width
  const step = 400
  window.range = range
  const alderCanvases = range(0, width + step, step).reduce((a,i,index) => a.concat([
    newAlder({key: i * 2, height: 8, rate: 500, xpos: i - 200, delay: 500 + (i + 100)}),
    newAlder({key: i * 2 + 1, height: 6, rate: 500, xpos: i, delay: 500 + (i + 250)})
  ]), [])

  const alderProps = prop => alderCanvases.map(alder => alder[prop])
  render(alderProps('canvas'), componentRoot, () => {
    const elems = [...componentRoot.children].filter(canvas => canvas.classList.contains('tree'))
    alderProps('update').forEach((e,i) => {
      e(elems[i])
    })
  })
}

function unmountTrees() {
  background.style.backgroundColor = ''
  unmountComponentAtNode(componentRoot)
}

export {renderTrees as render, unmountTrees as unmount}

function newAlder({key, height, rate, xpos, delay}){
  let canvas, context, initialized = false

  const [canWidth, canHeight] = [600, 500]
  const reactCanvas = <canvas className="canvas alder tree" key={`alder-${key}`} width={canWidth} height={canHeight}/>
  const avg = (a, b) => 0.5 * (a + b)
  const deg_to_rad = Math.PI / 180.0

  return { canvas: reactCanvas, update}

  function update(c) {
    canvas = c
    if(!initialized) {
      init()
      main()
      initialized = true
    }
  }

  function init() {
    context = canvas.getContext('2d')
    canvas.style.zIndex = Date.now() % 2
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
