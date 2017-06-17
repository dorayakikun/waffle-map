// @flow

import { meshToLatLon, latLonToMesh } from '../src/meshCalculator'

test('mesh 5339 to equal { lat: 53 / 1.5 + (2 / 3), lon: 39 + 100 + (1 / 2) }', () => {
  expect(meshToLatLon('5339')).toEqual({
    lat: 53 / 1.5 + 2 / 3,
    lon: 39 + 100 + 1 / 2
  })
})

test('mesh 5339-35 to equal { lat: 53 / 1.5 + 3 / 8 + (1 / 12), lon: 39 + 100 + 5 / 8 + (1 / 8) }', () => {
  expect(meshToLatLon('5339-35')).toEqual({
    lat: 53 / 1.5 + 3 / 8 + 1 / 12,
    lon: 39 + 100 + 5 / 8 + 1 / 8
  })
})

test('{ lat: 35.6638, lon: 139.71805, scale: 1 } to equal 5339', () => {
  expect(latLonToMesh(35.6638, 139.71805, 1)).toBe('5339')
})

test('{ lat: 35.6638, lon: 139.71805, scale: 2 } to equal 5339-35', () => {
  expect(latLonToMesh(35.6638, 139.71805, 2)).toBe('5339-35')
})

test('{ lat: 35.6638, lon: 139.71805, scale: 3 } to equal 5339-35-97', () => {
  expect(latLonToMesh(35.6638, 139.71805, 3)).toBe('5339-35-97')
})
