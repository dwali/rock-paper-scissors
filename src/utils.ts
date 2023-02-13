// random number in range
export const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const random1 = (): -1 | 0 | 1 => {
  return (random(0, 2) - 1) as -1 | 0 | 1
}
