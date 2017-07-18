// @flow

import { round } from '../../src/domain/roundPoint'

test('Should throw an error when place less than 1', () => {
  expect(() => {
    round(1.2345, 0)
  }).toThrowError(`Invalid place found.
The acceptable place is greater than 0.`)
})
