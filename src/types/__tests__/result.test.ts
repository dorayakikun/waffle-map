import { err, ok } from "../result";

describe("Result helpers", () => {
  test("ok returns value with isOk() = true and isErr() = false", () => {
    const res = ok(42);
    expect(res.value).toBe(42);
    expect(res.isOk()).toBe(true);
    expect(res.isErr()).toBe(false);
  });

  test("err returns error with isOk() = false and isErr() = true", () => {
    const res = err("boom");
    expect(res.error).toBe("boom");
    expect(res.isOk()).toBe(false);
    expect(res.isErr()).toBe(true);
  });
});
