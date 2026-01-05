/**
 * State type definitions using discriminated unions.
 *
 * These types provide type-safe state management patterns,
 * especially for async operations.
 */

import type { AppError } from "../errors/types";

/**
 * Generic async state pattern for representing loading, success, and error states.
 * Use this for any data that needs to be fetched or computed asynchronously.
 */
export type AsyncState<T> =
  | { readonly status: "idle" }
  | { readonly status: "loading" }
  | { readonly status: "success"; readonly data: T }
  | { readonly status: "error"; readonly error: AppError };

/**
 * Create an idle state.
 */
export function idle<T>(): AsyncState<T> {
  return { status: "idle" };
}

/**
 * Create a loading state.
 */
export function loading<T>(): AsyncState<T> {
  return { status: "loading" };
}

/**
 * Create a success state with data.
 */
export function success<T>(data: T): AsyncState<T> {
  return { status: "success", data };
}

/**
 * Create an error state.
 */
export function error<T>(err: AppError): AsyncState<T> {
  return { status: "error", error: err };
}

/**
 * Type guard for idle state.
 */
export function isIdle<T>(state: AsyncState<T>): state is { status: "idle" } {
  return state.status === "idle";
}

/**
 * Type guard for loading state.
 */
export function isLoading<T>(state: AsyncState<T>): state is { status: "loading" } {
  return state.status === "loading";
}

/**
 * Type guard for success state.
 */
export function isSuccess<T>(
  state: AsyncState<T>,
): state is { status: "success"; data: T } {
  return state.status === "success";
}

/**
 * Type guard for error state.
 */
export function isError<T>(
  state: AsyncState<T>,
): state is { status: "error"; error: AppError } {
  return state.status === "error";
}

/**
 * Get data from async state, or return a default value.
 */
export function getDataOrDefault<T>(state: AsyncState<T>, defaultValue: T): T {
  return isSuccess(state) ? state.data : defaultValue;
}

/**
 * Map over the data in an async state.
 */
export function mapAsyncState<T, U>(
  state: AsyncState<T>,
  fn: (data: T) => U,
): AsyncState<U> {
  if (isSuccess(state)) {
    return success(fn(state.data));
  }
  return state as AsyncState<U>;
}

/**
 * Fold an async state into a single value.
 */
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
