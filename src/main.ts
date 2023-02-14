import './style.css'
import {
  Canvas,
  initCanvas,
  MAX_CANVAS_HEIGHT,
  MAX_CANVAS_WITDH,
  redraw,
} from './canvas'
import { GameElement, Paper, Rock, Scissors } from './GameElements'
import { random, random1 } from './utils'
import { isEnd, moveElements, resolveCollisions } from './game'

const NUMBER_OF_ELEMENTS_ONE_KIND = 100

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <canvas id="canvas" width="${MAX_CANVAS_WITDH}" height="${MAX_CANVAS_HEIGHT}">
  </canvas>
`

const canvas = document.querySelector<Canvas>('#canvas')!
initCanvas(canvas)

const elements: GameElement[] = [
  // generate 10 scrissors elements
  ...Array(NUMBER_OF_ELEMENTS_ONE_KIND)
    .fill(0)
    .map(
      (): Scissors => ({
        type: 'scissors',
        x: random(10, MAX_CANVAS_WITDH - 10),
        y: random(10, MAX_CANVAS_HEIGHT - 10),
        vector: [random1(), random1()],
      })
    ),
  ...Array(NUMBER_OF_ELEMENTS_ONE_KIND)
    .fill(0)
    .map(
      (): Rock => ({
        type: 'rock',
        x: random(10, MAX_CANVAS_WITDH - 10),
        y: random(10, MAX_CANVAS_HEIGHT - 10),
        vector: [random1(), random1()],
      })
    ),
  ...Array(NUMBER_OF_ELEMENTS_ONE_KIND)
    .fill(0)
    .map(
      (): Paper => ({
        type: 'paper',
        x: random(10, MAX_CANVAS_WITDH - 10),
        y: random(10, MAX_CANVAS_HEIGHT - 10),
        vector: [random1(), random1()],
      })
    ),
]

redraw(elements, canvas)

const gameStep = () => {
  const end = isEnd(elements)

  if (end) {
    // clearInterval(interval)
    alert(`Game over! ${elements[0].type} won!`)
  }

  moveElements(elements)
  resolveCollisions(elements)

  // redraw
  redraw(elements, canvas)
  if (!end) {
    window.requestAnimationFrame(gameStep)
  }
}

window.requestAnimationFrame(() => {
  gameStep()
})
