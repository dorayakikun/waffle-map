// @flow

import { meshToLatLng, latLngToMesh, meshToBounds } from '../src/MeshCalculator'

// ---
// meshToLatLng
// ---
test('Should throw error when mesh is 533', () => {
  expect(() => {
    meshToLatLng('533')
  }).toThrow()
})

test('Should convert mesh 5339 to LatLng', () => {
  expect(meshToLatLng('5339')).toEqual({
    lat: 53 / 1.5 + 1 / 3,
    lng: 39 + 100 + 1 / 2
  })
})

test('Should throw an error when mesh is 533a', () => {
  expect(() => {
    meshToLatLng('533a')
  }).toThrow()
})

test('Should convert mesh 5339-35 to LatLng', () => {
  const lat = (53 + 3 / 8) / 1.5 + 1 / 24
  const lng = 39 + 5 / 8 + 100 + 1 / 16
  expect(meshToLatLng('5339-35')).toEqual({
    lat: lat,
    lng: lng
  })
})

test('Should throw an error when mesh is 5339-3a', () => {
  expect(() => {
    meshToLatLng('5339-3a')
  }).toThrow()
})

test('Should convert mesh 5339-35-97 to LatLng', () => {
  const lat = (53 + (3 + 9 / 10) / 8) / 1.5 + 1 / 240
  const lng = 39 + (5 + 7 / 10) / 8 + 100 + 1 / 160
  expect(meshToLatLng('5339-35-97')).toEqual({
    lat: lat,
    lng: lng
  })
})

test('Should throw an error when mesh is 5339-35-9a', () => {
  expect(() => {
    meshToLatLng('5339-35-9a')
  }).toThrow()
})

test('Should throw an error when mesh is 5339-35-97-12', () => {
  expect(() => {
    meshToLatLng('5339-35-97-12')
  }).toThrow()
})

// ---
// meshToBounds
// ---
test('Should throw error when mesh is 533', () => {
  expect(() => {
    meshToBounds('533')
  }).toThrow()
})

test('Should convert mesh 5339 to bounds', () => {
  expect(meshToBounds('5339')).toEqual({
    leftTop: {
      lat: 53 / 1.5 + 2 / 3,
      lng: 39 + 100
    },
    rightBottom: {
      lat: 53 / 1.5,
      lng: 39 + 100 + 1
    }
  })
})

test('Should throw error when mesh is 533a', () => {
  expect(() => {
    meshToBounds('533a')
  }).toThrow()
})

test('Should convert mesh 5339-35 to bounds', () => {
  const lat = (53 + 3 / 8) / 1.5
  const lng = 39 + 5 / 8 + 100
  expect(meshToBounds('5339-35')).toEqual({
    leftTop: {
      lat: lat + 1 / 12,
      lng: lng
    },
    rightBottom: {
      lat: lat,
      lng: lng + 1 / 8
    }
  })
})

test('Should throw error when mesh is 5339-3a', () => {
  expect(() => {
    meshToBounds('5339-3a')
  }).toThrow()
})

test('Should convert mesh 5339-35-97 to bounds', () => {
  const lat = (53 + (3 + 9 / 10) / 8) / 1.5
  const lng = 39 + (5 + 7 / 10) / 8 + 100
  expect(meshToBounds('5339-35-97')).toEqual({
    leftTop: {
      lat: lat + 1 / 120,
      lng: lng
    },
    rightBottom: {
      lat: lat,
      lng: lng + 1 / 80
    }
  })
})

test('Should throw error when mesh is 5339-35-9a', () => {
  expect(() => {
    meshToBounds('5339-35-9a')
  }).toThrow()
})

test('Should throw error when mesh is 5339-35-97-12', () => {
  expect(() => {
    meshToBounds('5339-35-97-12')
  }).toThrow()
})

// ---
// latLngToMesh
// ---
test('{ lat: 35.6638, lng: 139.71805, scale: 1 } to equal 5339', () => {
  expect(latLngToMesh(35.6638, 139.71805, 1)).toBe('5339')
})

test('{ lat: 35.6638, lng: 139.71805, scale: 2 } to equal 5339-35', () => {
  expect(latLngToMesh(35.6638, 139.71805, 2)).toBe('5339-35')
})

test('{ lat: 35.6638, lng: 139.71805, scale: 3 } to equal 5339-35-97', () => {
  expect(latLngToMesh(35.6638, 139.71805, 3)).toBe('5339-35-97')
})

test('{ lat: 35.6638, lng: 139.71805 }, scale: 4 should throw error', () => {
  expect(() => {
    latLngToMesh(35.6638, 139.71805, 4)
  }).toThrow()
})
