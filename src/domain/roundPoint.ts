export const round = (n: number, place: number): number => {
  if (place < 1) {
    throw new Error(`Invalid place found.
The acceptable place is greater than 0.`)
  }
  const ep = Math.pow(10, place)
  return Math.ceil(n * ep) / ep
}
