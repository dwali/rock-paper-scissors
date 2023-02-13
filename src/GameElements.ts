export type Direction = [0 | 1 | -1, 0 | 1 | -1]
export interface GameElement {
  x: number
  y: number
  type: string
  vector: Direction
}

export interface Rock extends GameElement {
  type: 'rock'
}

export interface Paper extends GameElement {
  type: 'paper'
}

export interface Scissors extends GameElement {
  type: 'scissors'
}

export const getSymbol = (type: string): string => {
  switch (type) {
  case 'rock':
    return '🪨'
  case 'paper':
    return '📄'
  case 'scissors':
    return '✂️'
  default:
    return '❓'
  }
}

export const getFillStyle = (type: string): string => {
  switch (type) {
  case 'rock':
    return '#212121'
  case 'paper':
    return '#ccd821'
  case 'scissors':
    return '#aa0000'
  default:
    return '#005500'
  }
}

export const ELEMENT_DIMENSION = 25
export const ELEMENT_MOVE_DISTANCE = 1
