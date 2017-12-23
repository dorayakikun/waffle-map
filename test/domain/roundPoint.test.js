// @flow

import test from 'ava';
import { round } from '../../src/domain/roundPoint';

test('Should throw an error when place less than 1', t => {
  const error = t.throws(() => {
    round(1.2345, 0);
  });
  t.is(
    error.message,
    `Invalid place found.
The acceptable place is greater than 0.`
  );
});
