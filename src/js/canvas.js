export function newCanvas({w, h, id, classes, parent}) {
  const canvas = document.createElement('canvas')
  if(parent) {
    const wrapper = document.querySelector(parent)
    wrapper.appendChild(canvas)
  } else {
    document.body.appendChild(canvas)
  }
  if(id) {
    canvas.id = id
  }
  if(classes) {
    canvas.classList.add(...classes)
  }
  canvas.width = w
  canvas.height = h
  return canvas
}
