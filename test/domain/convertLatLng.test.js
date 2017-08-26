// @flow

import test from 'ava'
import { convertToMillisecLatLng } from '../../src/domain/convertLatLng'

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
