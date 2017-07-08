// @flow

import { meshToLatLng, latLngToMesh, meshToBounds } from '../src/MeshCalculator'

// ---
// meshToLatLng
// ---
test('Should throw error when mesh is 533', () => {
  const mesh = '533'
  expect(() => {
    meshToLatLng(mesh)
  }).toThrow(`Unexpected length. mesh is ${mesh.replace(/-/g, '')}`)
})

test('Should convert mesh 5339 to LatLng', () => {
  const mesh = '5339'
  const expected = {
    lat: 53 / 1.5 + 1 / 3,
    lng: 39 + 100 + 1 / 2
  }
  expect(meshToLatLng(mesh)).toEqual(expected)
})

test('Should throw an error when mesh is 533a', () => {
  const mesh = '533a'
  expect(() => {
    meshToLatLng(mesh)
  }).toThrowError(
    `Invalid mesh code found.
Only numbers are acceptable.
Actual mesh code is ${mesh.replace(/-/g, '')}`
  )
})

test('Should convert mesh 5339-35 to LatLng', () => {
  const mesh = '5339-35'
  const expected = {
    lat: (53 + 3 / 8) / 1.5 + 1 / 24,
    lng: 39 + 5 / 8 + 100 + 1 / 16
  }
  expect(meshToLatLng(mesh)).toEqual(expected)
})

test('Should throw an error when mesh is 5339-3a', () => {
  const mesh = '5339-3a'
  expect(() => {
    meshToLatLng(mesh)
  }).toThrow(
    `Invalid mesh code found.
Only numbers are acceptable.
Actual mesh code is ${mesh.replace(/-/g, '')}`
  )
})

test('Should throw an error when mesh is 5339-85', () => {
  const mesh = '5339-85'
  expect(() => {
    meshToLatLng(mesh)
  }).toThrow(
    `Invalid mesh code found.
Only [0-7] are acceptable in secound division.
Actual mesh code is ${mesh.replace(/-/g, '')}`
  )
})

test('Should convert mesh 5339-35-97 to LatLng', () => {
  const mesh = '5339-35-97'
  const expected = {
    lat: (53 + (3 + 9 / 10) / 8) / 1.5 + 1 / 240,
    lng: 39 + (5 + 7 / 10) / 8 + 100 + 1 / 160
  }
  expect(meshToLatLng(mesh)).toEqual(expected)
})

test('Should throw an error when mesh is 5339-38-97', () => {
  const mesh = '5339-38-97'
  expect(() => {
    meshToLatLng(mesh)
  }).toThrow(
    `Invalid mesh code found.
Only [0-7] are acceptable in secound division.
Actual mesh code is ${mesh.replace(/-/g, '')}`
  )
})

test('Should throw an error when mesh is 5339-35-9a', () => {
  const mesh = '5339-35-9a'
  expect(() => {
    meshToLatLng(mesh)
  }).toThrow(
    `Invalid mesh code found.
Only numbers are acceptable.
Actual mesh code is ${mesh.replace(/-/g, '')}`
  )
})

test('Should throw an error when mesh is 5339-35-97-12', () => {
  const mesh = '5339-35-97-12'
  expect(() => {
    meshToLatLng('5339-35-97-12')
  }).toThrow(`Unexpected length. mesh is ${mesh.replace(/-/g, '')}`)
})

// ---
// meshToBounds
// ---
test('Should throw error when mesh is 533', () => {
  const mesh = '533'
  expect(() => {
    meshToBounds(mesh)
  }).toThrow(`Unexpected length. mesh is ${mesh.replace(/-/g, '')}`)
})

test('Should convert mesh 5339 to bounds', () => {
  const mesh = '5339'
  const expected = {
    leftTop: {
      lat: 53 / 1.5 + 2 / 3,
      lng: 39 + 100
    },
    rightBottom: {
      lat: 53 / 1.5,
      lng: 39 + 100 + 1
    }
  }
  expect(meshToBounds('5339')).toEqual(expected)
})

test('Should throw error when mesh is 533a', () => {
  const mesh = '533a'
  expect(() => {
    meshToBounds(mesh)
  }).toThrow(
    `Invalid mesh code found.
Only numbers are acceptable.
Actual mesh code is ${mesh.replace(/-/g, '')}`
  )
})

test('Should convert mesh 5339-35 to bounds', () => {
  const mesh = '5339-35'
  const lat = (53 + 3 / 8) / 1.5
  const lng = 39 + 5 / 8 + 100
  const expected = {
    leftTop: {
      lat: lat + 1 / 12,
      lng: lng
    },
    rightBottom: {
      lat: lat,
      lng: lng + 1 / 8
    }
  }
  expect(meshToBounds(mesh)).toEqual(expected)
})

test('Should throw error when mesh is 5339-3a', () => {
  const mesh = '5339-3a'
  expect(() => {
    meshToBounds(mesh)
  }).toThrow(
    `Invalid mesh code found.
Only numbers are acceptable.
Actual mesh code is ${mesh.replace(/-/g, '')}`
  )
})

test('Should throw error when mesh is 5339-95', () => {
  const mesh = '5339-95'
  expect(() => {
    meshToBounds(mesh)
  }).toThrow(
    `Invalid mesh code found.
Only [0-7] are acceptable in secound division.
Actual mesh code is ${mesh.replace(/-/g, '')}`
  )
})

test('Should convert mesh 5339-35-97 to bounds', () => {
  const mesh = '5339-35-97'
  const lat = (53 + (3 + 9 / 10) / 8) / 1.5
  const lng = 39 + (5 + 7 / 10) / 8 + 100
  const expected = {
    leftTop: {
      lat: lat + 1 / 120,
      lng: lng
    },
    rightBottom: {
      lat: lat,
      lng: lng + 1 / 80
    }
  }
  expect(meshToBounds(mesh)).toEqual(expected)
})

test('Should throw error when mesh is 5339-38-97', () => {
  const mesh = '5339-38-97'
  expect(() => {
    meshToBounds(mesh)
  }).toThrow(
    `Invalid mesh code found.
Only [0-7] are acceptable in secound division.
Actual mesh code is ${mesh.replace(/-/g, '')}`
  )
})

test('Should throw error when mesh is 5339-35-9a', () => {
  const mesh = '5339-35-9a'
  expect(() => {
    meshToBounds(mesh)
  }).toThrow(
    `Invalid mesh code found.
Only numbers are acceptable.
Actual mesh code is ${mesh.replace(/-/g, '')}`
  )
})

test('Should throw error when mesh is 5339-35-97-12', () => {
  const mesh = '5339-35-97-12'
  expect(() => {
    meshToBounds(mesh)
  }).toThrow(`Unexpected length. mesh is ${mesh.replace(/-/g, '')}`)
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
