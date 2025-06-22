import { test, expect } from "vitest";
import { round } from "../roundPoint";

test("Should throw an error when place less than 1", () => {
  expect(() => round(1.2345, 0)).toThrow(`Invalid place found.
The acceptable place is greater than 0.`);
});
