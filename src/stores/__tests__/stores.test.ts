import { initializationPromise } from "../../domain/calculateMesh";
import { useColorModeStore } from "../useColorModeStore";
import { useCoordPopupStore } from "../useCoordPopupStore";
import { useGeodeticInputStore } from "../useGeodeticInputStore";
import { useMarkerInputStore } from "../useMarkerInputStore";
import { useMeshcodesInputStore } from "../useMeshcodesInputStore";
import { useMeshToggleStore } from "../useMeshToggleStore";
import { useTileToggleStore } from "../useTileToggleStore";

describe("Zustand stores", () => {
  describe("useColorModeStore", () => {
    afterEach(() => {
      useColorModeStore.setState(useColorModeStore.getInitialState());
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "";
    });

    test("defaults to light mode and updates document on setColorMode and toggleColorMode", () => {
      expect(useColorModeStore.getInitialState().colorMode).toBe("light");

      useColorModeStore.getState().setColorMode("dark");
      expect(useColorModeStore.getState().colorMode).toBe("dark");
      expect(document.documentElement.classList.contains("dark")).toBe(true);
      expect(document.documentElement.style.colorScheme).toBe("dark");

      useColorModeStore.getState().toggleColorMode();
      expect(useColorModeStore.getState().colorMode).toBe("light");
      expect(document.documentElement.classList.contains("dark")).toBe(false);
      expect(document.documentElement.style.colorScheme).toBe("light");

      useColorModeStore.getState().toggleColorMode();
      expect(useColorModeStore.getState().colorMode).toBe("dark");
      expect(document.documentElement.classList.contains("dark")).toBe(true);
      expect(document.documentElement.style.colorScheme).toBe("dark");
    });
  });

  describe("useCoordPopupStore", () => {
    afterEach(() => {
      useCoordPopupStore.setState(useCoordPopupStore.getInitialState());
    });

    test("initializes with undefined position and updates via setPosition", () => {
      expect(useCoordPopupStore.getInitialState().position).toBeUndefined();
      useCoordPopupStore.getState().setPosition({ lat: 35.68, lng: 139.76 });
      expect(useCoordPopupStore.getState().position).toEqual({ lat: 35.68, lng: 139.76 });
    });
  });

  describe("useGeodeticInputStore", () => {
    afterEach(() => {
      useGeodeticInputStore.setState(useGeodeticInputStore.getInitialState());
    });

    test("has WGS84 and degree as defaults", () => {
      const initial = useGeodeticInputStore.getInitialState();
      expect(initial.datum).toBe("WGS84");
      expect(initial.unit).toBe("degree");
    });

    test("changes datum and unit", () => {
      useGeodeticInputStore.getState().changeDatum("Tokyo");
      useGeodeticInputStore.getState().changeUnit("millisec");
      expect(useGeodeticInputStore.getState().datum).toBe("Tokyo");
      expect(useGeodeticInputStore.getState().unit).toBe("millisec");
    });
  });

  describe("useMeshToggleStore", () => {
    afterEach(() => {
      useMeshToggleStore.setState(useMeshToggleStore.getInitialState());
    });

    test("toggles enableMeshGrid from false default", () => {
      expect(useMeshToggleStore.getInitialState().enableMeshGrid).toBe(false);
      useMeshToggleStore.getState().setEnableMeshGrid(true);
      expect(useMeshToggleStore.getState().enableMeshGrid).toBe(true);
      useMeshToggleStore.getState().setEnableMeshGrid(false);
      expect(useMeshToggleStore.getState().enableMeshGrid).toBe(false);
    });
  });

  describe("useTileToggleStore", () => {
    afterEach(() => {
      useTileToggleStore.setState(useTileToggleStore.getInitialState());
    });

    test("toggles enableTileGrid from false default", () => {
      expect(useTileToggleStore.getInitialState().enableTileGrid).toBe(false);
      useTileToggleStore.getState().setEnableTileGrid(true);
      expect(useTileToggleStore.getState().enableTileGrid).toBe(true);
      useTileToggleStore.getState().setEnableTileGrid(false);
      expect(useTileToggleStore.getState().enableTileGrid).toBe(false);
    });
  });

  describe("useMarkerInputStore", () => {
    afterEach(() => {
      useMarkerInputStore.setState(useMarkerInputStore.getInitialState());
    });

    test("initializes with empty state", () => {
      const initial = useMarkerInputStore.getInitialState();
      expect(initial.latLngString).toBe("");
      expect(initial.errorMessage).toBe("");
      expect(initial.positions).toEqual([]);
      expect(initial.lastResult).toBeNull();
    });

    test("inputLatLng updates latLngString and clears existing errorMessage", () => {
      useMarkerInputStore.setState({ errorMessage: "old error" });
      useMarkerInputStore.getState().inputLatLng("35.68,139.76");
      const state = useMarkerInputStore.getState();
      expect(state.latLngString).toBe("35.68,139.76");
      expect(state.errorMessage).toBe("");
    });

    test("putMarker sets error for empty or whitespace-only input", () => {
      useMarkerInputStore.getState().inputLatLng("   ");
      useMarkerInputStore.getState().putMarker("degree");

      const state = useMarkerInputStore.getState();
      expect(state.errorMessage).toBe("Please enter coordinates");
      expect(state.positions).toEqual([]);
      expect(state.lastResult?.isErr()).toBe(true);
      if (state.lastResult?.isErr()) {
        expect(state.lastResult.error).toEqual({
          code: "LATLNG_PARSE_FAILED",
          input: "   ",
          reason: "Empty input",
        });
      }
    });

    test("putMarker adds marker in degree unit and clears input and error", () => {
      useMarkerInputStore.setState({ errorMessage: "stale" });
      useMarkerInputStore.getState().inputLatLng("35.6762,139.6503");
      useMarkerInputStore.getState().putMarker("degree");

      const state = useMarkerInputStore.getState();
      expect(state.errorMessage).toBe("");
      expect(state.latLngString).toBe("");
      expect(state.positions).toEqual([{ lat: 35.6762, lng: 139.6503 }]);
      expect(state.lastResult?.isOk()).toBe(true);
      if (state.lastResult?.isOk()) {
        expect(state.lastResult.value).toEqual({ lat: 35.6762, lng: 139.6503 });
      }
    });

    test("putMarker appends multiple markers and supports millisec unit", () => {
      useMarkerInputStore.getState().inputLatLng("35,139");
      useMarkerInputStore.getState().putMarker("degree");
      useMarkerInputStore.getState().inputLatLng("126000000,500400000");
      useMarkerInputStore.getState().putMarker("millisec");

      expect(useMarkerInputStore.getState().positions).toEqual([
        { lat: 35, lng: 139 },
        { lat: 35, lng: 139 },
      ]);
    });

    test("putMarker sets formatted error for invalid input without modifying positions", () => {
      useMarkerInputStore.getState().inputLatLng("35,139");
      useMarkerInputStore.getState().putMarker("degree");
      useMarkerInputStore.getState().inputLatLng("abc,139");
      useMarkerInputStore.getState().putMarker("degree");

      const state = useMarkerInputStore.getState();
      expect(state.errorMessage).toBe('Invalid format for lat: expected number, got "abc"');
      expect(state.positions).toEqual([{ lat: 35, lng: 139 }]);
      expect(state.latLngString).toBe("abc,139");
      expect(state.lastResult?.isErr()).toBe(true);
    });

    test("removeAllMarkers clears positions, errorMessage, and lastResult", () => {
      useMarkerInputStore.getState().inputLatLng("35,139");
      useMarkerInputStore.getState().putMarker("degree");
      useMarkerInputStore.setState({ errorMessage: "err" });

      useMarkerInputStore.getState().removeAllMarkers();
      const state = useMarkerInputStore.getState();
      expect(state.positions).toEqual([]);
      expect(state.errorMessage).toBe("");
      expect(state.lastResult).toBeNull();
    });

    test("removeMarker removes marker at valid boundary indices and does not update on out-of-bounds", () => {
      useMarkerInputStore.setState({
        positions: [
          { lat: 1, lng: 1 },
          { lat: 2, lng: 2 },
          { lat: 3, lng: 3 },
        ],
      });

      const originalPositions = useMarkerInputStore.getState().positions;
      const listener = vi.fn();
      const unsub = useMarkerInputStore.subscribe((s) => s.positions, listener);

      // Out-of-bounds indices must not trigger state updates or change array reference
      useMarkerInputStore.getState().removeMarker(-1);
      useMarkerInputStore.getState().removeMarker(3);
      expect(listener).not.toHaveBeenCalled();
      expect(useMarkerInputStore.getState().positions).toBe(originalPositions);

      // Remove index 0 (lower boundary)
      useMarkerInputStore.getState().removeMarker(0);
      expect(listener).toHaveBeenCalledTimes(1);
      expect(useMarkerInputStore.getState().positions).toEqual([
        { lat: 2, lng: 2 },
        { lat: 3, lng: 3 },
      ]);

      // Remove last element (upper boundary)
      useMarkerInputStore.getState().removeMarker(1);
      expect(listener).toHaveBeenCalledTimes(2);
      expect(useMarkerInputStore.getState().positions).toEqual([{ lat: 2, lng: 2 }]);

      unsub();
    });

    test("clearError clears errorMessage and lastResult", () => {
      useMarkerInputStore.getState().inputLatLng("bad");
      useMarkerInputStore.getState().putMarker("degree");
      expect(useMarkerInputStore.getState().errorMessage).not.toBe("");
      expect(useMarkerInputStore.getState().lastResult).not.toBeNull();

      useMarkerInputStore.getState().clearError();
      expect(useMarkerInputStore.getState().errorMessage).toBe("");
      expect(useMarkerInputStore.getState().lastResult).toBeNull();
    });
  });

  describe("useMeshcodesInputStore", () => {
    beforeAll(async () => {
      await initializationPromise;
    });

    afterEach(() => {
      useMeshcodesInputStore.setState(useMeshcodesInputStore.getInitialState());
    });

    test("has expected initial state", () => {
      const initial = useMeshcodesInputStore.getInitialState();
      expect(initial.meshcodesString).toBe("");
      expect(initial.separator).toBe(".");
      expect(initial.meshcodes).toEqual([]);
      expect(initial.userInputMeshes).toEqual({});
      expect(initial.errorMessage).toBe("");
      expect(initial.parseResult.isOk()).toBe(true);
      if (initial.parseResult.isOk()) {
        expect(initial.parseResult.value).toEqual({ meshes: {}, meshcodes: [] });
      }
    });

    test("inputMeshcodesString parses valid dot-separated meshcodes with whitespace and empty entries", () => {
      useMeshcodesInputStore.getState().inputMeshcodesString(" 5339-35-97 .. 5339-35-98 ");
      const state = useMeshcodesInputStore.getState();
      expect(state.meshcodesString).toBe(" 5339-35-97 .. 5339-35-98 ");
      expect(state.meshcodes).toEqual(["5339-35-97", "5339-35-98"]);
      expect(state.errorMessage).toBe("");
      expect(state.parseResult.isOk()).toBe(true);
      expect(state.userInputMeshes["5339-35-97"]).toBeDefined();
      expect(state.userInputMeshes["5339-35-97"].code).toBe("5339-35-97");
      expect(state.userInputMeshes["5339-35-97"].bounds).toBeDefined();
      expect(state.userInputMeshes["5339-35-97"].center).toBeDefined();
      expect(state.userInputMeshes["5339-35-98"]).toBeDefined();
    });

    test("inputMeshcodesString handles whitespace-only input as empty ok result", () => {
      useMeshcodesInputStore.getState().inputMeshcodesString("   ");
      const state = useMeshcodesInputStore.getState();
      expect(state.meshcodes).toEqual([]);
      expect(state.userInputMeshes).toEqual({});
      expect(state.errorMessage).toBe("");
      expect(state.parseResult.isOk()).toBe(true);
    });

    test("inputMeshcodesString sets formatted error and clears meshes on invalid meshcode", () => {
      useMeshcodesInputStore.getState().inputMeshcodesString("invalid-code");
      const state = useMeshcodesInputStore.getState();
      expect(state.meshcodes).toEqual([]);
      expect(state.userInputMeshes).toEqual({});
      expect(state.errorMessage).toBe('Could not parse "invalid-code" using separator "."');
      expect(state.parseResult.isErr()).toBe(true);
      if (state.parseResult.isErr()) {
        expect(state.parseResult.error).toEqual({
          code: "MESHCODE_PARSE_FAILED",
          input: "invalid-code",
          separator: ".",
        });
      }
    });

    test("changeSeparator re-parses existing meshcodesString with new separator", () => {
      useMeshcodesInputStore.getState().inputMeshcodesString("5339-35-97,5339-35-98");
      // Initially fails because separator is "."
      expect(useMeshcodesInputStore.getState().parseResult.isErr()).toBe(true);
      expect(useMeshcodesInputStore.getState().errorMessage).toContain('separator "."');

      // Switching separator to "," succeeds
      useMeshcodesInputStore.getState().changeSeparator(",");
      let state = useMeshcodesInputStore.getState();
      expect(state.separator).toBe(",");
      expect(state.meshcodes).toEqual(["5339-35-97", "5339-35-98"]);
      expect(Object.keys(state.userInputMeshes)).toEqual(["5339-35-97", "5339-35-98"]);
      expect(state.errorMessage).toBe("");
      expect(state.parseResult.isOk()).toBe(true);

      // Switching back to "." fails again
      useMeshcodesInputStore.getState().changeSeparator(".");
      state = useMeshcodesInputStore.getState();
      expect(state.separator).toBe(".");
      expect(state.meshcodes).toEqual([]);
      expect(state.userInputMeshes).toEqual({});
      expect(state.errorMessage).toBe(
        'Could not parse "5339-35-97,5339-35-98" using separator "."',
      );
    });

    test("setMeshcodesFromUrl sets valid meshcodes and handles invalid meshcodes", () => {
      useMeshcodesInputStore.getState().setMeshcodesFromUrl(["5339-35-97", "5339-35-98"], ",");
      let state = useMeshcodesInputStore.getState();
      expect(state.meshcodesString).toBe("5339-35-97,5339-35-98");
      expect(state.separator).toBe(",");
      expect(state.meshcodes).toEqual(["5339-35-97", "5339-35-98"]);
      expect(Object.keys(state.userInputMeshes)).toEqual(["5339-35-97", "5339-35-98"]);
      expect(state.errorMessage).toBe("");

      // Invalid meshcode from URL
      useMeshcodesInputStore.getState().setMeshcodesFromUrl(["bad-mesh"], ",");
      state = useMeshcodesInputStore.getState();
      expect(state.meshcodesString).toBe("bad-mesh");
      expect(state.separator).toBe(",");
      expect(state.meshcodes).toEqual([]);
      expect(state.userInputMeshes).toEqual({});
      expect(state.errorMessage).toBe('Could not parse "bad-mesh" using separator ","');
    });
  });
});
