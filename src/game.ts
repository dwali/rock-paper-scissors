import { MAX_CANVAS_HEIGHT, MAX_CANVAS_WITDH } from './canvas'
import {
  Direction,
  ELEMENT_DIMENSION,
  ELEMENT_MOVE_DISTANCE,
  GameElement,
} from './GameElements'
import { random, random1 } from './utils'

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

const moveVector = (vectorValue: number): -1 | 0 | 1 => {
  const randomModificator = random1()
  let newVectorValue = vectorValue + randomModificator

  if (newVectorValue < -1) {
    newVectorValue = -1
  }
  if (newVectorValue > 1) {
    newVectorValue = 1
  }

  return newVectorValue as -1 | 0 | 1
}

export const moveElements = (elements: GameElement[]) => {
  // move
  elements.forEach((element) => {
    // const randomX = random(0, 2) - 1
    // const randomY = random(0, 2) - 1

    // const newXVector = element.vector[0] + randomX

    element.vector = [
      moveVector(element.vector[0]),
      moveVector(element.vector[1]),
    ]
    element.x += element.vector[0] * ELEMENT_MOVE_DISTANCE
    element.y += element.vector[1] * ELEMENT_MOVE_DISTANCE

    // element.y = MAX_CANVAS_HEIGHT - 3

    if (element.x < 0) {
      // element.x = 0
      element.x = MAX_CANVAS_WITDH - 3
    }
    if (element.x > MAX_CANVAS_WITDH - 3) {
      // element.x = MAX_CANVAS_WITDH - ELEMENT_DIMENSION
      element.x = 0
    }
    if (element.y < 0) {
      element.y = MAX_CANVAS_HEIGHT - 3
    }
    if (element.y > MAX_CANVAS_HEIGHT - 3) {
      element.y = 0
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

export const isEnd = (elements: GameElement[]): boolean => {
  return elements.every((element) => {
    if (element.type === elements[0].type) {
      return true
    }
    return false
  })
}
