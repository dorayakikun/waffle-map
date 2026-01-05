import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

type Props = {
  bounds: [number, number][];
};

/**
 * Check if two bounds arrays are equal.
 */
function boundsEqual(a: [number, number][], b: [number, number][]): boolean {
  if (a.length !== b.length) return false;
  return a.every((point, i) => point[0] === b[i][0] && point[1] === b[i][1]);
}

/**
 * Component that fits the map view to the given bounds.
 * Only triggers fitBounds when bounds actually change.
 */
export function BoundsFitter({ bounds }: Props) {
  const map = useMap();
  // Initialize to null so first render triggers fitBounds
  const prevBoundsRef = useRef<[number, number][] | null>(null);

  useEffect(() => {
    // Fit bounds on first render or when bounds actually changed
    if (prevBoundsRef.current === null || !boundsEqual(bounds, prevBoundsRef.current)) {
      prevBoundsRef.current = bounds;
      map.fitBounds(bounds);
    }
  }, [bounds, map]);

  return null;
}
