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
