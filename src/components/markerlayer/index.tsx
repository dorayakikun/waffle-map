import * as React from "react";
import { useGeodeticInputStore } from "../../stores/useGeodeticInputStore";
import { useMarkerInputStore } from "../../stores/useMarkerInputStore";
import { MarkerLayer } from "./MarkerLayer";

export const MarkerlayerContainer = () => {
  const datum = useGeodeticInputStore((state) => state.datum);
  const positions = useMarkerInputStore((state) => state.positions);
  return <MarkerLayer datum={datum} positions={positions} />;
};
