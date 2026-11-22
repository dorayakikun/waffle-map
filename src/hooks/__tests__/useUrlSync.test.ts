import { act, renderHook } from "@testing-library/react";
import { initializationPromise } from "../../domain/calculateMesh";
import { useMeshcodesInputStore } from "../../stores/useMeshcodesInputStore";
import { useUrlSync } from "../useUrlSync";

describe("useUrlSync", () => {
  beforeAll(async () => {
    await initializationPromise;
  });

  beforeEach(() => {
    window.history.replaceState(null, "", "/");
    useMeshcodesInputStore.setState(useMeshcodesInputStore.getInitialState());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("syncs pre-existing store meshcodes to URL on initial mount", () => {
    useMeshcodesInputStore.getState().inputMeshcodesString("5339-35-97");
    const replaceSpy = vi.spyOn(window.history, "replaceState");

    const { unmount } = renderHook(() => useUrlSync());

    expect(window.location.pathname).toBe("/5339-35-97/");
    expect(replaceSpy).toHaveBeenCalledTimes(1);
    expect(replaceSpy).toHaveBeenCalledWith(null, "", "/5339-35-97/");

    unmount();
  });

  test("syncs store changes to window URL using replaceState", () => {
    const replaceSpy = vi.spyOn(window.history, "replaceState");

    const { unmount } = renderHook(() => useUrlSync());

    expect(replaceSpy).not.toHaveBeenCalled();

    act(() => {
      useMeshcodesInputStore.getState().inputMeshcodesString("5339-35-97.5339-35-98");
    });

    expect(window.location.pathname).toBe("/5339-35-97.5339-35-98/");
    expect(replaceSpy).toHaveBeenCalledTimes(1);
    expect(replaceSpy).toHaveBeenCalledWith(null, "", "/5339-35-97.5339-35-98/");

    act(() => {
      useMeshcodesInputStore.getState().changeSeparator(",");
      useMeshcodesInputStore.getState().inputMeshcodesString("5339-35-97,5339-35-98");
    });

    expect(window.location.pathname).toBe("/5339-35-97,5339-35-98/");

    unmount();
  });

  test("syncs browser popstate changes back to store without calling replaceState", () => {
    const { unmount } = renderHook(() => useUrlSync());
    const replaceSpy = vi.spyOn(window.history, "replaceState");

    window.history.pushState(null, "", "/5339-35-97,5339-35-98");

    act(() => {
      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    expect(useMeshcodesInputStore.getState().meshcodes).toEqual(["5339-35-97", "5339-35-98"]);
    expect(useMeshcodesInputStore.getState().separator).toBe(",");
    expect(window.location.pathname).toBe("/5339-35-97,5339-35-98");
    expect(replaceSpy).not.toHaveBeenCalled();

    const setSpy = vi.spyOn(useMeshcodesInputStore.getState(), "setMeshcodesFromUrl");
    act(() => {
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
    expect(setSpy).not.toHaveBeenCalled();

    act(() => {
      useMeshcodesInputStore.getState().inputMeshcodesString("5339-35-99");
    });
    expect(window.location.pathname).toBe("/5339-35-99/");
    expect(replaceSpy).toHaveBeenCalledWith(null, "", "/5339-35-99/");

    unmount();
  });

  test("removes popstate event listener on unmount", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useUrlSync());

    unmount();

    expect(removeSpy).toHaveBeenCalledWith("popstate", expect.any(Function));

    window.history.pushState(null, "", "/5339-35-97/");
    window.dispatchEvent(new PopStateEvent("popstate"));
    expect(useMeshcodesInputStore.getState().meshcodes).toEqual([]);
  });
});
