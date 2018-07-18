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
  for(; start <= stop; start += step) {
    arr.push(start)
  }
  return arr
}

export function newAnimation() {
  const call = fxn => fxn()
  const update = []
  const loop = () => {
    update.forEach(call)
    requestAnimationFrame(loop)
  }
  loop()

  return {update}
}
