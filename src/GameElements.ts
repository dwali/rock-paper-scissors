export interface GameElement {
  x: number
  y: number
  type: string
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

export const ELEMENT_DIMENSION = 25
