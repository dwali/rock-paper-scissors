import { MAX_CANVAS_HEIGHT, MAX_CANVAS_WITDH } from './canvas'
import {
  ELEMENT_DIMENSION,
  ELEMENT_MOVE_DISTANCE,
  GameElement,
} from './GameElements'
import { random } from './utils'

export function fight(
  element: GameElement,
  otherElement: GameElement
): 'scissors' | 'paper' | 'rock' {
  if (element.type === 'scissors' && otherElement.type === 'paper') {
    return 'scissors'
  }
  if (element.type === 'paper' && otherElement.type === 'rock') {
    return 'paper'
  }
  if (element.type === 'rock' && otherElement.type === 'scissors') {
    return 'rock'
  }

  return fight(otherElement, element)
}

export const moveElements = (elements: GameElement[]) => {
  // move
  elements.forEach((element) => {
    const randomX = random(0, 2) - 1
    const randomY = random(0, 2) - 1

    element.x += randomX * ELEMENT_MOVE_DISTANCE
    element.y += randomY * ELEMENT_MOVE_DISTANCE

    if (element.x < 0) {
      element.x = 0
    }
    if (element.x + ELEMENT_DIMENSION > MAX_CANVAS_WITDH) {
      element.x = MAX_CANVAS_WITDH - ELEMENT_DIMENSION
    }
    if (element.y < 0) {
      element.y = 0
    }
    if (element.y + ELEMENT_DIMENSION > MAX_CANVAS_HEIGHT) {
      element.y = MAX_CANVAS_HEIGHT - ELEMENT_DIMENSION
    }
  })
}

export const resolveCollisions = (elements: GameElement[]) => {
  // collision detection
  elements.forEach((element) => {
    elements.forEach((otherElement) => {
      if (element === otherElement) {
        return
      }
      if (
        Math.abs(element.x - otherElement.x) < ELEMENT_DIMENSION / 2 &&
        Math.abs(element.y - otherElement.y) < ELEMENT_DIMENSION / 2 &&
        element.type !== otherElement.type
      ) {
        const newElementType = fight(element, otherElement)
        element.type = newElementType
        otherElement.type = newElementType
      }
    })
  })
}
