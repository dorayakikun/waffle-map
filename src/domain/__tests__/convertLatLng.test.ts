import {
  createLatLng,
  convertLatLngToTokyo,
  convertBoundsToTokyo,
  convertLatLngToWGS84,
  convertBoundsToWGS84,
  convertLatLngToMillisec,
  convertBoundsToMillisec,
  convertBoundsToWGS84IfNeeded,
  convertBoundsToTokyoIfNeeded,
  convertLatLngToTokyoIfNeeded,
  convertLatLngToWGS84IfNeeded,
  convertLatLngToMillisecIfNeeded,
  convertBoundsToMillisecIfNeeded,
} from '../convertLatLng'

// ---
// Invalid case
// ---
test(`Should throw an error when invalidValue`, () => {
  const testcases = [
    {
      latLng: '1',
      errorValue: 'LatLng',
      expectedValueMessage: 'Expected: lat,lng',
    },
    {
      latLng: 'a,135',
      errorValue: 'lat',
      expectedValueMessage: 'Only numbers are acceptable.',
    },
    {
      latLng: '35,b',
      errorValue: 'lng',
      expectedValueMessage: 'Only numbers are acceptable.',
    },
  ]

  testcases.forEach(testcase => {
    expect(() => createLatLng(testcase.latLng, 'degree')).toThrow(`Unexpected ${
      testcase.errorValue
    } found.
${testcase.expectedValueMessage}
Actual: ${testcase.latLng}`)
  })
})
// ---
// normal case
// ---

const latLngStringDegree = '35,139'
const latLngStringMellisec = '126000000,500400000'
test(`Should return degree LatLng`, () => {
  expect(createLatLng(latLngStringDegree, 'degree')).toEqual({
    lat: 35,
    lng: 139,
  })
})

test(`Should convert to degree LatLng`, () => {
  expect(createLatLng(latLngStringMellisec, 'millisec')).toEqual({
    lat: 35,
    lng: 139,
  })
})

const latLngDgree = { lat: 35, lng: 139 }
test(`Should convert to WGS84 LatLng`, () => {
  expect(convertLatLngToWGS84(latLngDgree)).toEqual({
    lat: 35.003285946000005,
    lng: 138.996885693,
  })
})
test(`Should convert to Tokyo LatLng`, () => {
  expect(convertLatLngToTokyo(latLngDgree)).toEqual({
    lat: 34.996713705,
    lng: 139.00311441,
  })
})

const boundsDegree = {
  leftTop: { lat: 36, lng: 139 },
  rightBottom: { lat: 35, lng: 140 },
}
test(`Should convert to WGS84 Bounds`, () => {
  expect(convertBoundsToWGS84(boundsDegree)).toEqual({
    leftTop: { lat: 36.003178996, lng: 138.996839655 },
    rightBottom: { lat: 35.00330341, lng: 139.99680265 },
  })
})

test(`Should convert to Tokyo Bounds`, () => {
  expect(convertBoundsToTokyo(boundsDegree)).toEqual({
    leftTop: { lat: 35.996820666, lng: 139.003160457 },
    rightBottom: { lat: 34.996696238, lng: 140.00319745899998 },
  })
})

test('Should convert LatLng to millisec', () => {
  expect(convertLatLngToMillisec({ lat: 35, lng: 139 })).toEqual({
    lat: 126000000,
    lng: 500400000,
  })
})

test('Should convert bounds to millisec', () => {
  expect(convertBoundsToMillisec(boundsDegree)).toEqual({
    leftTop: { lat: 129600000, lng: 500400000 },
    rightBottom: { lat: 126000000, lng: 504000000 },
  })
})

test('Should convert bounds to WGS84 if needed', () => {
  expect(convertBoundsToWGS84IfNeeded(boundsDegree, 'Tokyo')).toEqual(
    convertBoundsToWGS84(boundsDegree)
  )
  expect(convertBoundsToWGS84IfNeeded(boundsDegree, 'WGS84')).toEqual(
    boundsDegree
  )
})

test('Should convert bounds to Tokyo if needed', () => {
  expect(convertBoundsToTokyoIfNeeded(boundsDegree, 'Tokyo')).toEqual(
    convertBoundsToTokyo(boundsDegree)
  )
  expect(convertBoundsToTokyoIfNeeded(boundsDegree, 'WGS84')).toEqual(
    boundsDegree
  )
})

const latLng = { lat: 35, lng: 139 }

test('Should convert LatLng to Tokyo if needed', () => {
  expect(convertLatLngToTokyoIfNeeded(latLng, 'Tokyo')).toEqual(
    convertLatLngToTokyo(latLng)
  )

  expect(convertLatLngToTokyoIfNeeded(latLng, 'WGS84')).toEqual(latLng)
})

test('Should convert LatLng to WGS84 if needed', () => {
  expect(convertLatLngToWGS84IfNeeded(latLng, 'Tokyo')).toEqual(
    convertLatLngToWGS84(latLng)
  )

  expect(convertLatLngToWGS84IfNeeded(latLng, 'WGS84')).toEqual(latLng)
})

test('Should convert LatLng to millisec if needed', () => {
  expect(convertLatLngToMillisecIfNeeded(latLng, 'millisec')).toEqual(
    convertLatLngToMillisec(latLng)
  )

  expect(convertLatLngToMillisecIfNeeded(latLng, 'degree')).toEqual(latLng)
})

test('Should convert bounds to millisec if needed', () => {
  expect(convertBoundsToMillisecIfNeeded(boundsDegree, 'millisec')).toEqual(
    convertBoundsToMillisec(boundsDegree)
  )

  expect(convertBoundsToMillisecIfNeeded(boundsDegree, 'degree')).toEqual(
    boundsDegree
  )
})
