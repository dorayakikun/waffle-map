// @flow

import { meshToLatLon, latLonToMesh, meshToBounds } from '../src/meshCalculator'

// ---
// meshToLatLon
// ---
test('mesh 533 should throw error', () => {
  expect(() => {
    meshToLatLon('533')
  }).toThrow()
})

test('Should convert mesh 5339 to LatLon', () => {
  expect(meshToLatLon('5339')).toEqual({
    lat: 53 / 1.5 + 1 / 3,
    lon: 39 + 100 + 1 / 2
  })
})

test('mesh 533a should throw error', () => {
  expect(() => {
    meshToLatLon('533a')
  }).toThrow()
})

test('Should convert mesh 5339-35 to LatLon', () => {
  const lat = (53 + 3 / 8) / 1.5 + 1 / 24
  const lon = 39 + 5 / 8 + 100 + 1 / 16
  expect(meshToLatLon('5339-35')).toEqual({
    lat: lat,
    lon: lon
  })
})

test('mesh 5339-3a should throw error', () => {
  expect(() => {
    meshToLatLon('5339-3a')
  }).toThrow()
})

test('Should convert mesh 5339-35-97 to LatLon}', () => {
  const lat = (53 + (3 + 9 / 10) / 8) / 1.5 + 1 / 240
  const lon = 39 + (5 + 7 / 10) / 8 + 100 + 1 / 160
  expect(meshToLatLon('5339-35-97')).toEqual({
    lat: lat,
    lon: lon
  })
})

test('mesh 5339-35-9a should throw error', () => {
  expect(() => {
    meshToLatLon('5339-35-9a')
  }).toThrow()
})

test('mesh 5339-35-97-12 should throw error', () => {
  expect(() => {
    meshToLatLon('5339-35-97-12')
  }).toThrow()
})

// ---
// meshToBounds
// ---

// ---
// latLonToMesh
// ---
test('{ lat: 35.6638, lon: 139.71805, scale: 1 } to equal 5339', () => {
  expect(latLonToMesh(35.6638, 139.71805, 1)).toBe('5339')
})

test('{ lat: 35.6638, lon: 139.71805, scale: 2 } to equal 5339-35', () => {
  expect(latLonToMesh(35.6638, 139.71805, 2)).toBe('5339-35')
})

test('{ lat: 35.6638, lon: 139.71805, scale: 3 } to equal 5339-35-97', () => {
  expect(latLonToMesh(35.6638, 139.71805, 3)).toBe('5339-35-97')
})

test('{ lat: 35.6638, lon: 139.71805 }, scale: 4 should throw error', () => {
  expect(() => {
    latLonToMesh(35.6638, 139.71805, 4)
  }).toThrow()
})
