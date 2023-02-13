import {
  ELEMENT_DIMENSION,
  GameElement,
  getSymbol,
  getFillStyle,
} from './GameElements'
export const MAX_CANVAS_WITDH = 600
export const MAX_CANVAS_HEIGHT = 600

export type Canvas = HTMLCanvasElement

export const initCanvas = (canvas: Canvas) => {
  canvas.innerHTML = 'canvas'
  canvas
  // canvas.appendChild(document.createElement('canvas'))
}

export const redraw = (elemnts: Array<GameElement>, canvas: Canvas) => {
  // clear canvas
  // canvas.innerHTML = ''
  const context = canvas.getContext('2d')
  if (!context) {
    throw 'no context'
  }
  context?.clearRect(0, 0, MAX_CANVAS_WITDH, MAX_CANVAS_HEIGHT)
  elemnts.forEach((element) => {
    // create element

    context.beginPath()
    // context.fillStyle = getFillStyle(element.type)
    context.fillText(
      getSymbol(element.type),
      element.x,
      element.y,
      ELEMENT_DIMENSION
    )
    // context.fillRect(element.x, element.y, ELEMENT_DIMENSION, ELEMENT_DIMENSION)
    context.stroke()
  })
}
