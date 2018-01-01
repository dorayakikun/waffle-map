// @flow

import test from 'ava';
import {
  createLatLng,
  convertLatLngToTokyo,
  convertBoundsToTokyo,
  convertLatLngToWGS84,
  convertBoundsToWGS84,
  convertLatLngToMillisec,
  convertBoundsToMillisec,
  convertBoundsToWGS84IfNeeded,
  convertLatLngToTokyoIfNeeded,
  convertLatLngToWGS84IfNeeded,
  convertLatLngToMillisecIfNeeded,
  convertBoundsToMillisecIfNeeded,
} from '../../src/domain/convertLatLng';

// ---
// Invalid case
// ---
test(`Should throw an error when invalidValue`, t => {
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
  ];

  testcases.forEach(testcase => {
    const error = t.throws(() => createLatLng(testcase.latLng, 'degree'));
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
  t.deepEqual(
    createLatLng(latLngStringDegree, 'degree'),
    { lat: 35, lng: 139 }
  );
});

test(`Should convert to degree LatLng`, t => {
  t.deepEqual(
    createLatLng(latLngStringMellisec, 'millisec'),
    { lat: 35, lng: 139 }
  );
});

const latLngDgree = { lat: 35, lng: 139 };
test(`Should convert to WGS84 LatLng`, t => {
  t.deepEqual(
    convertLatLngToWGS84(latLngDgree),
    { lat: 35.003285946000005, lng: 138.996885693 }
  );
});
test(`Should convert to Tokyo LatLng`, t => {
  t.deepEqual(
    convertLatLngToTokyo(latLngDgree),
    { lat: 34.996713705, lng: 139.00311441 }
  );
});

const boundsDegree = {
  leftTop: { lat: 36, lng: 139 },
  rightBottom: { lat: 35, lng: 140 },
};
test(`Should convert to WGS84 Bounds`, t => {
  t.deepEqual(
    convertBoundsToWGS84(boundsDegree), {
      leftTop: { lat: 36.003178996, lng: 138.996839655 },
      rightBottom: { lat: 35.00330341, lng: 139.99680265 },
    });
});

test(`Should convert to Tokyo Bounds`, t => {
  t.deepEqual(
    convertBoundsToTokyo(boundsDegree), {
      leftTop: { lat: 35.996820666, lng: 139.003160457 },
      rightBottom: { lat: 34.996696238, lng: 140.00319745899998 },
    });
});

test('Should convert LatLng to millisec', t => {
  t.deepEqual(
    convertLatLngToMillisec({ lat: 35, lng: 139 }),
    { lat: 126000000, lng: 500400000 }
  );
});

test('Should convert bounds to millisec', t => {
  t.deepEqual(
    convertBoundsToMillisec(boundsDegree),
    {
      leftTop: { lat: 129600000, lng: 500400000 },
      rightBottom: { lat: 126000000, lng: 504000000 },
    }
  );
});

test('Should convert bounds to WGS84 if needed', t => {
  t.deepEqual(
    convertBoundsToWGS84IfNeeded(boundsDegree, 'Tokyo'),
    convertBoundsToWGS84(boundsDegree)
  );
  t.deepEqual(
    convertBoundsToWGS84IfNeeded(boundsDegree, 'WGS84'),
    boundsDegree
  );
});

const latLng = { lat: 35, lng: 139 };

test('Should convert LatLng to Tokyo if needed', t => {
  t.deepEqual(
    convertLatLngToTokyoIfNeeded(latLng, 'Tokyo'),
    convertLatLngToTokyo(latLng)
  );

  t.deepEqual(
    convertLatLngToTokyoIfNeeded(latLng, 'WGS84'),
    latLng
  );
});

test('Should convert LatLng to WGS84 if needed', t => {
  t.deepEqual(
    convertLatLngToWGS84IfNeeded(latLng, 'Tokyo'),
    convertLatLngToWGS84(latLng)
  );

  t.deepEqual(
    convertLatLngToWGS84IfNeeded(latLng, 'WGS84'),
    latLng
  );
});

test('Should convert LatLng to millisec if needed', t => {
  t.deepEqual(
    convertLatLngToMillisecIfNeeded(latLng, 'millisec'),
    convertLatLngToMillisec(latLng)
  );

  t.deepEqual(
    convertLatLngToMillisecIfNeeded(latLng, 'degree'),
    latLng
  );
});

test('Should convert bounds to millisec if needed', t => {
  t.deepEqual(
    convertBoundsToMillisecIfNeeded(boundsDegree, 'millisec'),
    convertBoundsToMillisec(boundsDegree)
  );

  t.deepEqual(
    convertBoundsToMillisecIfNeeded(boundsDegree, 'degree'),
    boundsDegree
  );
});