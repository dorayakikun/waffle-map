// @flow

import test from 'ava'
import {
  convertToMillisecLatLng,
  convertLatLngToTokyoDatum,
  convertBoundsToTokyoDatum,
  convertLatLngToWGS84Datum,
  convertBoundsToWGS84Datum
} from '../../src/domain/convertLatLng'

test(`Should throw an error when array length isn't two`, t => {
  const error = t.throws(() => {
    convertToMillisecLatLng('1', 'degree')
  })
  t.is(
    error.message,
    `Unexpected LatLng found.
Expected: lat,lng
Actual: 1`
  )
})

test(`Should throw an error when lat is invalid`, t => {
  const error = t.throws(() => {
    convertToMillisecLatLng('a,135', 'degree')
  })
  t.is(
    error.message,
    `Unexpected lat found.
Only numbers are acceptable.
Actual: a`
  )
})

test(`Should throw an error when array length isn't two`, t => {
  const error = t.throws(() => {
    convertToMillisecLatLng('35,b', 'degree')
  })
  t.is(
    error.message,
    `Unexpected lng found.
Only numbers are acceptable.
Actual: b`
  )
})

test(`Should return degree LatLng`, t => {
  const expected = {
    lat: 35,
    lng: 139
  }

  t.deepEqual(convertToMillisecLatLng('35,139', 'degree'), expected)
})

test(`Should convert to degree LatLng`, t => {
  const expected = {
    lat: 35,
    lng: 139
  }

  t.deepEqual(
    convertToMillisecLatLng('126000000,500400000', 'millisec'),
    expected
  )
})

test(`Should convert to WGS84 LatLng`, t => {
  const expected = {
    lat: 35.003285946000005,
    lng: 138.996885693
  }

  t.deepEqual(convertLatLngToWGS84Datum({ lat: 35, lng: 139 }), expected)
})

test(`Should convert to Tokyo LatLng`, t => {
  const expected = {
    lat: 34.996713705,
    lng: 139.00311441
  }

  t.deepEqual(convertLatLngToTokyoDatum({ lat: 35, lng: 139 }), expected)
})

test(`Should convert to WGS84 Bounds`, t => {
  const expected = {
    leftTop: {
      lat: 36.003178996,
      lng: 138.996839655
    },
    rightBottom: {
      lat: 35.00330341,
      lng: 139.99680265
    }
  }

  t.deepEqual(
    convertBoundsToWGS84Datum({
      leftTop: {
        lat: 36,
        lng: 139
      },
      rightBottom: {
        lat: 35,
        lng: 140
      }
    }),
    expected
  )
})

test(`Should convert to Tokyo Bounds`, t => {
  const expected = {
    leftTop: {
      lat: 35.996820666,
      lng: 139.003160457
    },
    rightBottom: {
      lat: 34.996696238,
      lng: 140.00319745899998
    }
  }

  t.deepEqual(
    convertBoundsToTokyoDatum({
      leftTop: {
        lat: 36,
        lng: 139
      },
      rightBottom: {
        lat: 35,
        lng: 140
      }
    }),
    expected
  )
})
