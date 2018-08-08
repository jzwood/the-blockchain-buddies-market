import { mod, newAnimation } from '../utils'

const animate = newAnimation()
const keyMemory = {}
const is = {
  get right() {
    return keyMemory[39]
  },
  get left() {
    return keyMemory[37]
  },
  get up() {
    return keyMemory[38]
  }
}

const keyup = event => {
  event.preventDefault()
  keyMemory[event.keyCode] = false
}

const keydown = event => {
  event.preventDefault()
  keyMemory[event.keyCode] = true
}

export default { setup, teardown }

async function setup(url, canvasElement) {
  const render = await initSprite(url, canvasElement)
  animate.start()
  animate.update = render
  document.addEventListener('keydown', keydown, false)
  document.addEventListener('keyup', keyup, false)
}

function teardown() {
  animate.stop()
  document.removeEventListener('keydown', keydown, false)
  document.removeEventListener('keyup', keyup, false)
}

function initSprite(url, canvasElement) {
  return newSprite(url, { canvas: canvasElement, width: 48, height: 48, cellsWide: 2, cellsHigh: 2 })
}

function newSprite(imgPath, { canvas, width, height, cellsWide, cellsHigh }) {
  const context = canvas.getContext('2d')
  const image = new Image()
  const TICKS_PER_FRAME = 15
  const VELOCITY = 2
  const DX = width / cellsWide
  const DY = height / cellsHigh

  let frameIndex = 0
  let tickCount = 0
  let ry = 0
  let movex = 0
  let isRestingState

  function update() {
    if (++tickCount > TICKS_PER_FRAME) {
      tickCount = 0
      frameIndex = (frameIndex < cellsWide - 1) ? frameIndex + 1 : 0
    }
  }

  function drawCell(x, y) {
    context.drawImage(image, x * DX, y * DY, DX, DY, 0, 0, DX, DY)
  }

  function render() {
    context.clearRect(0, 0, width, height)
    if (is.right || is.left) {
      ry = is.right ? Math.PI : 0
      const sign = is.right ? -1 : 1
      movex = mod(movex - sign * VELOCITY, Math.max(0, document.body.clientWidth - 128))
      canvas.style.transform = `rotateY(${ry}Rad) translateX(${sign * movex}px)`
      drawCell(frameIndex, 0)
      isRestingState = false
    } else if (is.up) {
      drawCell(1, 1)
      isRestingState = false
    } else {
      drawCell(0, 1)
      isRestingState = true
    }
  }

  return new Promise(resolve => {
    image.addEventListener('load', () => resolve(() => {
      update()
      render()
    }))
    image.src = imgPath
  })
}
