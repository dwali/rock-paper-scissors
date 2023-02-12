import './style.css'
import { initCanvas, redraw } from './canvas'
import {
  ELEMENT_DIMENSION,
  ELEMENT_MOVE_DISTANCE,
  GameElement,
  Paper,
  Rock,
  Scissors,
} from './GameElements'
import { random } from './utils'
import { fight, isEnd, moveElements, resolveCollisions } from './game'

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
  const end = isEnd(elements)

  if (end) {
    clearInterval(interval)
    alert(`Game over! ${elements[0].type} won!`)
  }

  moveElements(elements)
  resolveCollisions(elements)

  // redraw
  redraw(elements, canvas)
}, 1)
