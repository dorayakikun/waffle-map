import * as React from "react";
import { MarkerLayer } from "./MarkerLayer";
import { useGeodeticInputStore } from "../../stores/useGeodeticInputStore";
import { useMarkerInputStore } from "../../stores/useMarkerInputStore";

export const MarkerlayerContainer = () => {
  const { datum } = useGeodeticInputStore();
  const { positions } = useMarkerInputStore();
  return <MarkerLayer datum={datum} positions={positions} />;
};
