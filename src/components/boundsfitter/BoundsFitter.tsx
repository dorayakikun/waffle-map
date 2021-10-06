import { useEffect } from "react";
import { useMap } from "react-leaflet";

type Props = {
  bounds: [number, number][];
};

export function BoundsFitter(props: Props) {
  const { bounds } = props;

  const map = useMap();
  useEffect(() => {
    map.fitBounds(bounds);
  });

  return null;
}
