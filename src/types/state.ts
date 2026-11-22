import type { AppError } from "../errors/types";

export type AsyncState<T> =
  | { readonly status: "idle" }
  | { readonly status: "loading" }
  | { readonly status: "success"; readonly data: T }
  | { readonly status: "error"; readonly error: AppError };

export function idle<T>(): AsyncState<T> {
  return { status: "idle" };
}

export function loading<T>(): AsyncState<T> {
  return { status: "loading" };
}

export function success<T>(data: T): AsyncState<T> {
  return { status: "success", data };
}

export function error<T>(err: AppError): AsyncState<T> {
  return { status: "error", error: err };
}

export function isIdle<T>(state: AsyncState<T>): state is { status: "idle" } {
  return state.status === "idle";
}

export function isLoading<T>(state: AsyncState<T>): state is { status: "loading" } {
  return state.status === "loading";
}

export function isSuccess<T>(state: AsyncState<T>): state is { status: "success"; data: T } {
  return state.status === "success";
}

export function isError<T>(state: AsyncState<T>): state is { status: "error"; error: AppError } {
  return state.status === "error";
}

export function getDataOrDefault<T>(state: AsyncState<T>, defaultValue: T): T {
  return isSuccess(state) ? state.data : defaultValue;
}

export function mapAsyncState<T, U>(state: AsyncState<T>, fn: (data: T) => U): AsyncState<U> {
  if (isSuccess(state)) {
    return success(fn(state.data));
  }
  return state as AsyncState<U>;
}

export function foldAsyncState<T, R>(
  state: AsyncState<T>,
  handlers: {
    idle: () => R;
    loading: () => R;
    success: (data: T) => R;
    error: (err: AppError) => R;
  },
): R {
  switch (state.status) {
    case "idle":
      return handlers.idle();
    case "loading":
      return handlers.loading();
    case "success":
      return handlers.success(state.data);
    case "error":
      return handlers.error(state.error);
  }
}
