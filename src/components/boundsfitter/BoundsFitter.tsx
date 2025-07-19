import { useEffect } from "react";
import { useMap } from "react-leaflet";

type Props = {
  bounds: [number, number][];
};

/**
 * Adjusts the Leaflet map view to fit the specified bounds if they are valid.
 *
 * Expects `bounds` to be an array of two coordinate pairs, each containing two finite numbers. If the bounds are invalid or malformed, the map view is not changed.
 */
export function BoundsFitter(props: Props) {
  const { bounds } = props;

  const map = useMap();
  useEffect(() => {
    // Check if bounds are valid before applying
    if (bounds && bounds.length === 2 && bounds.every(bound => 
      bound.length === 2 && 
      bound.every(coord => typeof coord === 'number' && !isNaN(coord) && isFinite(coord))
    )) {
      map.fitBounds(bounds);
    }
  });

  return null;
}
