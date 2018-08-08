export function mod(val, base) {
  var temp = val % base
  while (temp <= 0) {
    temp += base
  }
  return temp
}

// simple range
export function range(start, stop, step) {
  const arr = []
  for (; start <= stop; start += step) {
    arr.push(start)
  }
  return arr
}

export function newAnimation() {
  let kill = false
  let render = () => {}
  const loop = () => {
    if (kill) return
    render()
    requestAnimationFrame(loop)
  }
  return {
    start(){
      kill = false
      loop()
    },
    stop() {
      kill = true
    },
    set update(fxn) {
      render = fxn
    }
  }

}

