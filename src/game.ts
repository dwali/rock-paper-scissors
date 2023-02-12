import { GameElement } from './GameElements'

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
