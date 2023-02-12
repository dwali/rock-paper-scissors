import { ELEMENT_DIMENSION, GameElement, getSymbol } from './GameElements'

export const initCanvas = (canvas: HTMLDivElement) => {
  canvas.innerHTML = 'canvas'
  // canvas.appendChild(document.createElement('canvas'))
}

export const redraw = (elemnts: Array<GameElement>, canvas: HTMLDivElement) => {
  // clear canvas
  canvas.innerHTML = ''
  elemnts.forEach((element) => {
    // create element
    const divElement = document.createElement('div')
    divElement.style.width = `${ELEMENT_DIMENSION}px`
    divElement.style.height = `${ELEMENT_DIMENSION}px`
    divElement.innerHTML = getSymbol(element.type)
    divElement.style.position = 'absolute'
    divElement.style.left = `${element.x}px`
    divElement.style.top = `${element.y}px`
    // draw element
    canvas.appendChild(divElement)
  })
}
