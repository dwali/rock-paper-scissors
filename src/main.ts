import './style.css'
import { initCanvas, redraw } from './canvas'
import {
  ELEMENT_DIMENSION,
  GameElement,
  Paper,
  Rock,
  Scissors,
} from './GameElements'
import { random } from './utils'
import { fight } from './game'

const NUMBER_OF_ELEMENTS_ONE_KIND = 20

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="canvas">
  </div>
`

const canvas = document.querySelector<HTMLDivElement>('#canvas')!

initCanvas(canvas)

const elements: GameElement[] = [
  // generate 10 scrissors elements
  ...Array(NUMBER_OF_ELEMENTS_ONE_KIND)
    .fill(0)
    .map(
      (): Scissors => ({
        type: 'scissors',
        x: random(10, 100),
        y: random(10, 100),
      })
    ),
  ...Array(NUMBER_OF_ELEMENTS_ONE_KIND)
    .fill(0)
    .map(
      (): Rock => ({
        type: 'rock',
        x: random(200, 300),
        y: random(10, 100),
      })
    ),
  ...Array(NUMBER_OF_ELEMENTS_ONE_KIND)
    .fill(0)
    .map(
      (): Paper => ({
        type: 'paper',
        x: random(100, 200),
        y: random(200, 300),
      })
    ),
]

redraw(elements, canvas)

const interval = setInterval(() => {
  const end = elements.every((element) => {
    if (element.type === elements[0].type) {
      return true
    }
    return false
  })
  if (end) {
    clearInterval(interval)
    alert(`Game over! ${elements[0].type} won!`)
  }

  // move
  elements.forEach((element) => {
    const randomX = random(0, 2) - 1
    const randomY = random(0, 2) - 1

    element.x += randomX * 5
    element.y += randomY * 5

    if (element.x < 0) {
      element.x = 0
    }
    if (element.x + ELEMENT_DIMENSION > canvas.clientWidth) {
      element.x = canvas.clientWidth - ELEMENT_DIMENSION
    }
    if (element.y < 0) {
      element.y = 0
    }
    if (element.y + ELEMENT_DIMENSION > canvas.clientHeight) {
      element.y = canvas.clientHeight - ELEMENT_DIMENSION
    }
  })

  // collision detection
  elements.forEach((element) => {
    elements.forEach((otherElement) => {
      if (element === otherElement) {
        return
      }
      if (
        Math.abs(element.x - otherElement.x) < ELEMENT_DIMENSION &&
        Math.abs(element.y - otherElement.y) < ELEMENT_DIMENSION &&
        element.type !== otherElement.type
      ) {
        const newElementType = fight(element, otherElement)
        element.type = newElementType
        otherElement.type = newElementType
      }
    })
  })

  // redraw
  redraw(elements, canvas)
}, 100)
