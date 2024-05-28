import roughjs from 'https://cdn.jsdelivr.net/npm/roughjs@4.6.6/+esm'

const drawingContainer = document.querySelector('.drawing__container')
const canvas = document.querySelector('#canvas')
canvas.width = drawingContainer.offsetWidth
canvas.height = drawingContainer.offsetHeight
const drawingTools = document.querySelector('.drawing__tools')

const rc = roughjs.canvas(canvas)
const generator = roughjs.generator()
let drawing = false
let elements = []
let type = 'line'

init()

function init() {
  for (const typeEl of Array.from(drawingTools.querySelectorAll('input[type=radio][name=type]'))) {
    if (typeEl.value === type) {
      typeEl.checked = true
    }
  }

  drawingTools.addEventListener('change', e => {
    if (e.target.type === 'radio' && e.target.name === 'type') {
      type = e.target.value
    }
  })

  drawingContainer.addEventListener('mousedown', e => {
    drawing = true

    const { clientX, clientY } = e
    const element = createElement(clientX, clientY, clientX, clientY)
    elements = [...elements, element]
    draw()
  })

  drawingContainer.addEventListener('mousemove', e => {
    if (!drawing) return

    const { clientX, clientY } = e
    const index = elements.length - 1
    const { x1, y1 } = elements[index]
    const updatedElement = createElement(x1, y1, clientX, clientY)
    const elementsCopy = [...elements]
    elementsCopy[index] = updatedElement
    elements = elementsCopy
    draw()
  })

  drawingContainer.addEventListener('mouseup', e => {
    drawing = false
  })
}

function draw() {
  rc.ctx.clearRect(0, 0, canvas.width, canvas.height)
  elements.forEach(({ re }) => rc.draw(re))
}

function createElement(x1, y1, x2, y2) {
  let re
  if (type === 'line') {
    re = generator.line(x1, y1, x2, y2)
  } else if (type === 'rectangle') {
    re = generator.rectangle(x1, y1, x2 - x1, y2 - y1)
  }
  return { x1, y1, x2, y2, re }
}
