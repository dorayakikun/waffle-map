import * as React from "react";
import { MarkerLayer } from "./MarkerLayer";
import { useGeodeticInputDatum } from "../../stores/geodeticInputStore";
import { useMarkerInputStateContext } from "../markerinput/MarkerInputStateContext";

export const MarkerlayerContainer = () => {
  const datum = useGeodeticInputDatum();
  const { positions } = useMarkerInputStateContext();
  return <MarkerLayer datum={datum} positions={positions} />;
};
