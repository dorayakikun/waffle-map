// @flow

import test from 'ava';
import {
  convertToMillisecLatLng,
  convertLatLngToTokyoDatum,
  convertBoundsToTokyoDatum,
  convertLatLngToWGS84Datum,
  convertBoundsToWGS84Datum,
} from '../../src/domain/convertLatLng';

// ---
// Invalid case
// ---
test(`Should throw an error when invalidValue`, t => {
  const testcases = [
    { latLng: '1', errorValue: 'LatLng', expectedValueMessage: 'Expected: lat,lng' },
    { latLng: 'a,135', errorValue: 'lat', expectedValueMessage: 'Only numbers are acceptable.' },
    { latLng: '35,b', errorValue: 'lng', expectedValueMessage: 'Only numbers are acceptable.' },
  ];

  testcases.forEach(testcase => {
    const error = t.throws(() => convertToMillisecLatLng(testcase.latLng, 'degree'));
    t.is(error.message, `Unexpected ${testcase.errorValue} found.
${testcase.expectedValueMessage}
Actual: ${testcase.latLng}`);
  });
});

// ---
// normal case
// ---

const latLngStringDegree = '35,139';
const latLngStringMellisec = '126000000,500400000';
test(`Should return degree LatLng`, t => {
  t.deepEqual(convertToMillisecLatLng(latLngStringDegree, 'degree'), { lat: 35, lng: 139 });
});

test(`Should convert to degree LatLng`, t => {
  t.deepEqual(convertToMillisecLatLng(latLngStringMellisec, 'millisec'), { lat: 35, lng: 139 });
});

const latLngDgree = { lat: 35, lng: 139 };
test(`Should convert to WGS84 LatLng`, t => {
  t.deepEqual(convertLatLngToWGS84Datum(latLngDgree), { lat: 35.003285946000005, lng: 138.996885693 });
});
test(`Should convert to Tokyo LatLng`, t => {
  t.deepEqual(convertLatLngToTokyoDatum(latLngDgree), { lat: 34.996713705, lng: 139.00311441 });
});

const boundsDegree = {
  leftTop: { lat: 36, lng: 139 },
  rightBottom: { lat: 35, lng: 140 },
};
test(`Should convert to WGS84 Bounds`, t => {
  t.deepEqual(
    convertBoundsToWGS84Datum(boundsDegree), {
      leftTop: { lat: 36.003178996, lng: 138.996839655 },
      rightBottom: { lat: 35.00330341, lng: 139.99680265 },
    });
});

test(`Should convert to Tokyo Bounds`, t => {
  t.deepEqual(
    convertBoundsToTokyoDatum(boundsDegree), {
      leftTop: { lat: 35.996820666, lng: 139.003160457 },
      rightBottom: { lat: 34.996696238, lng: 140.00319745899998 },
    });
});
