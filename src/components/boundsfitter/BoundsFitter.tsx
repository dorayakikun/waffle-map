import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

type Props = {
  bounds: [number, number][];
};

function boundsEqual(a: [number, number][], b: [number, number][]): boolean {
  if (a.length !== b.length) return false;
  return a.every((point, i) => point[0] === b[i][0] && point[1] === b[i][1]);
}

export function BoundsFitter({ bounds }: Props) {
  const map = useMap();

  const prevBoundsRef = useRef<[number, number][] | null>(null);

  useEffect(() => {
    if (prevBoundsRef.current === null || !boundsEqual(bounds, prevBoundsRef.current)) {
      prevBoundsRef.current = bounds;
      map.fitBounds(bounds);
    }
  }, [bounds, map]);

  return null;
}
